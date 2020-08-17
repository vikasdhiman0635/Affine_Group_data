import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContectServiceService {

  constructor(private httc:HttpClient) { }

  storedata(data: any):Observable<any> 
  {
    console.log(data);
    let url;
    return this.httc.post(url,data);
  }

}
