var express=require('express');
var app=express();
var cors=require('cors');
app.use(cors());
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartbooklocator.firebaseio.com"
});
app.get('/insert/:rack/:id',function(req,res){
	var db = admin.database();
	var p1=req.params.id;
	var rack=req.params.rack;
	var ref1=db.ref('shelf/'+rack+"/");
	ref1.update({bookid:p1});
	res.send("success");
});
 app.listen(process.env.PORT || 3000,function(){
	 console.log("Server running in port 3000"+ new Date() );
 });