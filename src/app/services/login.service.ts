import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	ip:string = "/api"
	token:string

  constructor(public http:Http) { 
  }

  submit(username, password){
  	var url = this.ip + '/login'
  	return this.http.post(url,{username:username, password:password}).pipe(map((res) => {
  		if (res.status === 200){
  			let token = res.json().token
  			this.token = token
  		}
  		return res
  	}))
  }

  getCount(){
  	var url = this.ip + '/getCount'

  	return this.http.get(url).pipe(map((res) => {
  		return res
  	}))
  }

  getIncrement(){
  	var url = this.ip + '/increment'
  	return this.http.get(url).pipe(map((res) => {
  		return res.json()
  	}))
  }

  setIncrement(){
  	var url = this.ip + '/increment'
  	return this.http.post(url,{}).pipe(map((res) => {
  		return res.json()
  	}))

  }
}
