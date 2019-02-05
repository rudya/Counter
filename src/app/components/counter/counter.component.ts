import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  token:string 
  count:number

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  	this.increment();
  }

  increment(){
  	this.loginService.increment().subscribe(  		

  		(res) => {
  			if (res.status === 200){
	  			//show values
  			}
  		},

  		(error) => {
  			this.router.navigate(['/login'])
			}
  	)
  }

}

