var express = require('express')
var app = express() 
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const port = 3000

app.listen(port)
app.use(bodyParser.json())
app.use(cookieParser())

console.log('Server started, listening on port', port)

//dummy user
const user = {
	username:"tbrady12",
	password:"thegoat12",
	id:12,
	admin:true
}

//counter object
var counter = {
	count:0,
	next:'',
	getCount:function(){
		return {count:this.count}
	},
	increment:function(){
		if (this.count === 0){
			this.next = 1
			return {count:0, next:1}
		}

		let next = this.count * 2
		this.next = next
		return {count:this.count, next:this.next}
	},
	setCount:function(){
		this.count = this.next
		return {count:this.count}
	}

}

//jwt authorization middleware
const authorize = function(req,res,next){

	let token = req.cookies.token

	if (token){
		jwt.verify(token , '!marooN5', function(err, decoded){

			if (err) {
				res.status(401).send();
			}
			else if (decoded.admin === false) {
				res.status(403).send()
			}
			else{
				next();
			}
		})
	}
	else{
		res.status(401).send()
	}
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////      ROUTES                 ///////////////////////////
////////////////////////////////////////////////////////////////////////////////////

app.post('/api/login', function (req, res) {
	if(req.body.username === user.username && req.body.password === user.password){

		var token = jwt.sign({admin:user.admin, id:user.id}, '!marooN5')
		
		res.cookie('token', token, { httpOnly:true, expires:0, secure:false })
		res.status(200).send({token:token})

	}
	else{
		res.status(401).send()
	}
})

app.get('/api/getCount', authorize, function(req,res){
	let count = counter.getCount();
	res.status(200).send(count)
})

app.get('/api/increment', authorize, function(req,res){
	let values = counter.increment();
	res.status(200).send(values)
})

app.post('/api/increment', authorize, function(req,res){
	let count = counter.setCount();
	res.status(200).send(count)
})


 