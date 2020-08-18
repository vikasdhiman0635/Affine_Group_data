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
    const url = "http://localhost:3000/insertto";
    return this.http.post<{}>(url, doc)
  }

  getalldatabycloudent():Observable<any>
  {
    const url = "http://localhost:3000/api/resource";
    return this.http.get(url);
  }
  
  deletedata(data: any):Observable<any>
  {
    const url = "http://localhost:3000/api/resource/"+data;
    return this.http.delete(url);
  }

  updatedata(value: any):Observable<any>
  {
    const url = "http://localhost:3000/api/resource/";
    return this.http.put(url,value);
  }
  
}
