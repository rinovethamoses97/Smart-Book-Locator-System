var express=require('express');
var bodyparser=require('body-parser');
var app=express();
var cors=require('cors');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use(express.static(__dirname+'/public'));
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var loginstatus=false;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartbooklocator.firebaseio.com"
});
app.get('/',function(req,res){
	res.sendFile('/index.html');
});
app.get('/search',function(req,res){
	res.sendFile(__dirname+'/public/search.html');
});
app.post('/setloginstatus',function(req,res){
	loginstatus=req.body.status;
	res.send("done");
})
app.post('/getloginstatus',function(req,res){
	res.send({status:loginstatus});
});
app.get('/insert/:rack/:id',function(req,res){
	var db = admin.database();
	var p1=req.params.id;
	var rack=req.params.rack;
	var ref1=db.ref('shelf/'+rack+"/");
	ref1.update({bookid:p1,rack:rack});
	res.send("success");
});
 app.listen(process.env.PORT || 3000,function(){
	 console.log("Server running in port 3000"+ new Date() );
 });