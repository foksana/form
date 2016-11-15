var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var fs=require("fs");

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

// app.get("/", function(req,res) {
// 	res.send("Test!")
// });

app.get("/", function(req,res) {
	res.sendFile(__dirname+"/index.html")
});

app.get("/list", function(req,res) {
	res.sendFile(__dirname+"/data.json")
});

app.get("/form", function(req,res) {
	res.sendFile(__dirname+"/form.html")
});


app.get("/delete", function(req,res) {
	console.log(req.query);
	res.send("delete!");
})

app.get("/formget", function(req,res) {
	console.log(req.query);
    var file=require("./data.json");
    console.log(file);
    file.push(req.query);
    var str=JSON.stringify(file);
    fs.writeFileSync("data.json", str)//перезаписує файл повністю
    res.send("Дані збережено на сервері") 
});


app.post("/formsendpost", function(req,res) {
    var file=require("./data.json");
    file.splice(req.body.id, 1);
    var str=JSON.stringify(file);
    fs.writeFileSync("data.json", str)//перезаписує файл повністю
    res.send(file) 
});

app.post("/postsend", function(req,res) {
	console.log(req.body);
	res.send(req.body.myinput);
});


app.get("/myget", function(req,res) {//GET=запит але без ajax
	console.log(req.query);
	res.send("success");
});

// app.get("/mypost", function(req,res) {//POST=запит але без ajax
//     console.log(req.body);
//     res.send("success");
// });


app.listen(process.env.PORT||8080);
console.log("server is running");