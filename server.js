var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var cookieParser  = require('cookie-parser');
var session       = require('express-session');
app.use(session({ secret: process.env.PASSPORT_SECRET }));
app.use(cookieParser())

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);;
