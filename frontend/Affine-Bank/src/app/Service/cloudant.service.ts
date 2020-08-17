import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudantService {
  

  constructor(private http: HttpClient){}

  createDoc(doc): Observable<{}> 
  {
    console.log(doc);
    const url = "http://localhost:3000/insertto";
    return this.http.post<{}>(url, doc)
  }

    
}
