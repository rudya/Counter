import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	showError:boolean = false
	loginForm: FormGroup
	get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private fb:FormBuilder, private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  	this.loginForm = this.fb.group({
  		username:['', [Validators.required]],
  		password:['', [Validators.required]]
  	})
  }

  submit(){
  	this.loginService.submit(this.loginForm.value.username,this.loginForm.value.password).subscribe(

  		(res)=>{
  			if (res.status === 200){
	  			let token = res.json().token
	  			this.router.navigate(['/counter'])
  			}
  		},

  		(error) => {
  			this.showError = true
			}
  	)
  }



}


