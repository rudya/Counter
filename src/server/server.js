var express = require('express')
var app = express() 
const bodyParser = require('body-parser')

const port = 3000

app.listen(port)
app.use(bodyParser.json())
app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});
console.log('Server started, listening on port', port)

const user = {
	username:"a",
	password:"a",
	id:12
}
 
var counter = {
	count:0,
	next:1,
	increment:function(){
		this.count = next
		this.next = this.next*2
	},
	getValues:function(){
		return [count,next]
	}
}

app.post('/login', function (req, res) {
	if(req.body.username === user.username && req.body.password === user.password){
		res.status(200).send()
	}
	else{
		res.status(401).send()
	}
})
 