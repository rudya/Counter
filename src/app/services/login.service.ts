import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	ip:string = "http://127.0.0.1:3000"

  constructor(public http:Http) { }

  submit(username, password){
  	var url = this.ip + '/login'
  	return this.http.post(url,{username:username, password:password}).pipe(map((res) => {
  		return res.status
  	}))
  }
}
