var express = require('express')
var app = express() 
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const port = 3000

app.listen(port)
app.use(bodyParser.json())
app.use(cookieParser())
app.all("/*", function(req, res, next){
  next();
});
console.log('Server started, listening on port', port)

const user = {
	username:"a",
	password:"a",
	id:12,
	admin:true
}
 
var counter = {
	count:0,
	next:'',
	increment:function(){
		if (this.count === 0){
			this.next = 1
			return {count:0, next:1}
		}

		let next = count * 2
		this.count = count
		this.next = next
		return {count:0, next:1}
	},
	setCount:function(){
		this.count = next
	},
	getCount:function(){
		return this.count
	}

}

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
				console.log('authorized', decoded)
				next();
			}
		})
	}
	else{
		res.status(401).send()
	}

}

app.post('/api/increment', authorize, function(req,res){
	let values = counter.increment();
	res.status(200).send(values)
})



 