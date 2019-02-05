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
  next:number
  showPopup:boolean

  constructor(private loginService:LoginService, private router:Router) { 

  }

  ngOnInit(){
  	this.getCount();
  }

  getCount(){
  	this.loginService.getCount().subscribe( 

  		(res) => {
  			if (res.status === 200){
	  			//update count
	  			this.count = res.json().count
  			}
  		},

  		(error) => {
  			this.router.navigate(['/login'])
			}
  	)
  }

  increment(type){

  	if(type === "get"){
  		this.loginService.getIncrement().subscribe(
  			(res) => {
  				//set count and next value
  				//open pop up
  				this.count = res.count
  				this.next = res.next
  				this.showPopup = true
  			}
  		)
  	}
  	else{
  		this.loginService.setIncrement().subscribe(
  			(res) => {
  				//close popup
  				//update count
  				this.showPopup = false
  				this.count = res.count
  			}
  		)
  	}
  }

  cancel(){
  	//close popup
  	this.showPopup = false
  }

}

