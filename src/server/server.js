var express = require('express')
var app = express() 
const port = 3000
app.listen(port)

console.log('Server started, listening on port', port)
 
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

app.get('/', function (req, res) {
  res.send('Hello World')
})
 