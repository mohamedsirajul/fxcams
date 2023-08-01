import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatapassService {

  constructor(private httpClient: HttpClient) {}

  store_user_data(users: any): Observable<any> {
	// let userdata = JSON.stringify(users)
	console.log(users);

    return this.httpClient.post<any>('http://localhost:3001/user/register', users);
  }
  


}
