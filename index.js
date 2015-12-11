var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support endcoded bodies

// Posts temp and humidity
app.post('/post', function(req,res){
	var temp = req.body.temperature;
	var humidity = req.body.humidity;
	var title = req.headers.title;
	var date = new Date;
	var send;
	var information = '\r\n' + title + '\r\n' + temp + ' ' + humidity + ' ' + date.toString();
	
	fs.readFile(__dirname + '/information.txt', function (err, data){
		if (err){
			fs.writeFile('information.txt', information, function (err){
				if (err) throw err;
				send = 'Created a new file and saved sucessfully!';
				res.send(information + ' ' + send);
			});	
		}
		
		if (data){
			fs.appendFile('information.txt', information, function (err){
				if (err) throw err;
				send = 'The file was updated';
				res.send(information + ' ' + send);
			});
		}
	});	
})

//gets the last updated temp and humidity
app.get('/current', function (req,res){
		
	fs.readFile(__dirname + '/information.txt', 'utf8', function(err, data) {
    if (err) throw err;

    var lines = data.trim().split('\n');
    var lastLine = lines.slice(-1)[0];	
	
	res.send(lastLine);	
	});
});

app.listen(8000);