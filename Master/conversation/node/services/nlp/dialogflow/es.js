const logger = require('../../../utils/logger')
const format = require('../../lib/format')
const uuid = require('uuid')
const utils = require('../../../utils')

// Require dialogflow module - explicit v2beta1 API
const dialogflow = require('@google-cloud/dialogflow').v2beta1

/**
 * Calls the Dialogflow v2beta API using the detectIntent method, then parses the response to
 * extract dialog and instructions, and returns a JSON that complies with the UneeQ response
 * specification
 *
 * @param {object} body The request JSON from UneeQ
 * @return {string} Stringified JSON containing response
 */
let query = async (body) => {
    const fmQuestion = body['fm-question'] //question asked by user
    const fmConversation = body['fm-conversation'] //string passed in previous response 'converationPayload'
    const fmAvatar = JSON.parse(body['fm-avatar']) //contextual information, 'type' is 'WELCOME' or 'QUESTION'
    const fmType = fmAvatar.type

    /* Prepare the query */
    let queryInput = {}
    let conversationPayload = {}
    let platformSessionId = ''
    /* The v2beta API allows an array of knowledge base IDs to be passed with the query parameters,
     * which directs the agent to use a specific set of knowledge bases (if enabled) to answer the query
     * in the case no intent match is found - if the DIALOGFLOW_CONFIG_USEKNOWLEDGEBASE environment variable
     * is true, the corresponding DIALOGFLOW_CONFIG_PROJECTKNOWLEDGEBASE string is passed with the query */
    let useKnowledgeBase = utils.parseBoolean(process.env.DIALOGFLOW_CONFIG_USEKNOWLEDGEBASE)

    switch (fmType) {
        /* The 'type' field in 'fm-avatar' specifies if this is the beginning of a new conversation
         * with a persona ('WELCOME'), or the next request in a continuing conversation ('QUESTION') */
        case 'WELCOME':
            logger.debug('Type is WELCOME')
            /* Create a session ID for the Dialogflow conversation and add to the conversationPayload
             * object - this is passed back with subsequent 'QUESTION' payloads in the fm-conversation field
             * so that session context can be maintained */
            platformSessionId = uuid.v4()
            conversationPayload = { platformSessionId: platformSessionId }
            queryInput.event = {
                name: 'WELCOME',
                languageCode: process.env.DIALOGFLOW_CONFIG_PROJECTLANGUAGE,
            }
            break
        case 'QUESTION':
            logger.debug('Type is QUESTION')
            conversationPayload = JSON.parse(fmConversation)
            platformSessionId = conversationPayload.platformSessionId
            /* Dialogflow returns an error if an empty string is passed as the input text - replacing
             * the empty string with a single space triggers the fallback intent, so the end user hears a
             * fallback/clarification response */
            if (fmQuestion == '') {
                queryInput.text = { text: ' ' }
            } else {
                queryInput.text = { text: fmQuestion }
            }
            queryInput.text.languageCode = process.env.DIALOGFLOW_CONFIG_PROJECTLANGUAGE
    }

    let credentialsJSON = JSON.parse(process.env.DIALOGFLOW_CONFIG_CREDENTIALS)
    const sessionClient = new dialogflow.SessionsClient({
        credentials: credentialsJSON,
    })
    const sessionPath = sessionClient.projectAgentSessionPath(
        process.env.DIALOGFLOW_CONFIG_PROJECTID,
        platformSessionId
    )
    let request = { session: sessionPath, queryInput: queryInput }
    if (useKnowledgeBase) {
        request.queryParams = {
            knowledgeBaseNames: [process.env.DIALOGFLOW_CONFIG_PROJECTKNOWLEDGEBASE],
        }
    }

    /* Execute the query */
    const detectIntentResponses = await sessionClient.detectIntent(request)
    let response = detectIntentResponses[0].queryResult
    logger.info('Got Dialogflow detectIntent response')
    logger.debug(`Raw detectIntent response: ${JSON.stringify(response)}`)

    /* Parse the result and return */
    let { answer, instructions } = await parseResponse(response)
    return format.responseJSON(answer, instructions, conversationPayload)
}

/**
 * Parses the queryResult field from the response to the detectIntent method, to extract the dialog
 * that will be spoken by the digital human, and any instruction payloads that have been defined as
 * parameters in the matched intent, and returns an answer string and instructions JSON for the response payload.
 *
 * @param {object} response The response JSON from Dialogflow
 * @return {string} answer and instructions (stringified JSON)
 */
let parseResponse = async (response) => {
    let answer = ''
    let dialog = ''
    let instructions = {}

    /* The queryResult field contains the responses to the query in an array of fulfillmentMessages.
     * An array length greater than 1 occurs when multiple responses are defined for the intent, such
     * as additional text responses, or custom payloads. This API recognises parameters with the name
     * 'instructions' as containing instruction payloads, so custom payloads are ignored. If the intent
     * contains multiple text responses, they are concatenated  */
    if (response.fulfillmentMessages.length > 1) {
        for (var i = 0; i < response.fulfillmentMessages.length; i++) {
            dialog += await getMessageText(response.fulfillmentMessages[i])
        }
    } else {
        dialog = await getMessageText(response.fulfillmentMessages[0])
    }

    /* This API implements intent parameters as the method for Dialogflow authors to associate platform instructions
     * (such as displayHtml, etc) with intents - if present the contents are parsed to check for validity */
    if (response.parameters.fields.hasOwnProperty('instructions')) {
        instructions = format.parseInstructions(response.parameters.fields.instructions.stringValue)
    }
    answer = await format.parseAnswer(dialog)

    return { answer, instructions }
}

let getMessageText = async (fulfillmentMessage) => {
    switch (fulfillmentMessage.message) {
        case 'text':
            return fulfillmentMessage.text.text[0]
            break
        case 'simpleResponses':
            return fulfillmentMessage.simpleResponses.simpleResponses[0].textToSpeech
            break
        case 'payload':
            //disregarding
            break
    }
}

module.exports = {
    query,
}
