import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	ip:string = "http://127.0.0.1:3000"
	token:string

  constructor(public http:Http) { 
  	this.token = getCookie("counterToken")
  }

  submit(username, password){
  	var url = this.ip + '/login'
  	return this.http.post(url,{username:username, password:password}).pipe(map((res) => {
  		if (res.status === 200){
  			let token = res.json().token
  			this.token = token
  			setCookie(token)
  		}
  		return res
  	}))
  }

  increment(){
  	var url = this.ip + '/increment'

  	return this.http.post(url,{token:this.token}).pipe(map((res) => {
  		return res
  	}))
  }
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function setCookie(token){
  document.cookie = "counterToken="+token;
}
