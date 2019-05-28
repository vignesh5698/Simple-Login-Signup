var express= require("express");
var mysql=require("mysql")
var bodyParser=require("body-parser")
var connection=mysql.createConnection({
    host :'localhost',
    user :'root',
    password :"vignesh",
    database :"firstDb"
});
var app=express();
var path=require('path');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
connection.connect(function(err){
    if(!err){
        console.log("Database is Connected");
    }
    else{
        console.log("Error" + JSON.stringify(err,undefined,2));
    }
}
)
app.listen(3000,()=>console.log("Express Server is running"))
app.use(express.static(path.join(__dirname,'public')))

app.post("/userlogin",(req,res)=>{
    res.sendFile(path.join(__dirname,'/public','login.html'))
});

app.post("/userRegister",(req,res)=>{
    res.sendFile(path.join(__dirname,'/public','signup.html'))
});

app.post("/login",(req,res)=>{
    // res.send("HELLO")
    mail= req.body.Lemail;
    pass=req.body.Lpwd;
    connection.query('SELECT * from users WHERE mail=?',[req.body.Lemail],(err,rows,fields)=>{
        if(!err){
            if((rows[0].pwd)==pass){
                // res.send(rows)
                // res.send("<h1>Hello "+rows[0].name+"</h1>")
                name=rows[0].name;
                // res.send(path.join(__dirname,'/public','/users/'+name))
                res.send("<h1>Hello </h1>")
            }else{
                
                res.append('Warning','Invalid');
                 res.send("Invalid credentials : Actual password : "+rows[0].pwd)
            }
            //res.send(rows)
        }else{
            res.send("ERROR OCCURED : "+err)
            console.log(err)
        }
    })
    console.log("REQUEST : "+mail+" "+pass)
});

app.get("/users/:name?",(req,res)=>{
    name=req.params.name
    console.log(name)
    res.send(name)
})
app.post("/signup",(req,res)=>{
    name= req.body.Sname;
    mail=req.body.Semail;
    pass=req.body.Spwd;
    queryStr="insert into users(name,mail,pwd) values('"+name+"','"+mail+"','"+pass+"')"
    connection.query(queryStr,(err,rows,fields)=>{
        if(!err){

            res.sendFile(path.join(__dirname,'/public','home.html'))
            //res.redirect('back');

            // app.use(express.static(path.join(__dirname,'public')))
             res.send("<h1>Hello </h1>")
        }else{
            res.send("ERROR OCCURED : "+err+" "+queryStr)

            console.log(err)
        }
    })
    console.log("REQUEST : "+name+" "+pass)
});