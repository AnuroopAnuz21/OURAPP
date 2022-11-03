var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/jutella',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


app.post("/sign_up",(req,res)=>{
    var username = req.body.username;
    var room = req.body.room;
    var password = req.body.password;

    var data = {
        "username": username,
        "room": room,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_sucess.html')

})


app.post("/newadmin",(req,res)=>{
    var adminname = req.body.adminname;
    var adminpassword = req.body.adminpassword;

    var data = {
        "adminname": adminname,
        "adminpassword" : adminpassword
    }

    db.collection('admin').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('admin.html')

})

app.post("/viewsignup",(req,res)=>{
   
    var username = req.body.username;
    var room = req.body.room;
    var password = req.body.password;

  
    db.collection('users').findOne({username:username},
        (error,data)=>{
            if(error){
                res.send(error)

            }
            if(data){
                console.log(data)
                this.data=data
                if(room==data.room){
                    if(password == data.password){

                       
const botName = 'JUTELLA';

io.on('connection', (socket) => {
    socket.on('joinRoom',({username,room}) =>{

        const user= userJoin(socket.id, username,room);
        socket.join(user.room);
  
        socket.emit('message', formatMessage(botName, `Welcome to the ${user.room}!`));
        

        socket.broadcast.to(user.room).emit('message', formatMessage(botName,  `${user.username} has joined the chat`));

        io.to(user.room).emit('roomUsers',{

            room:user.room,
            users:getRoomUsers(user.room)
        });
    
    });


  
  

    socket.on('chatMessage', (msg) => {
        const user=getCurrentUser(socket.id);

       io.to(user.room).emit('message',formatMessage(user.username, msg));
    });

    socket.on('disconnect', () => {
        const user=userLeave(socket.id);

        if(user) {

        io.to(user.room).emit('message',formatMessage(botName, `${user.username} has left the chat` ));

        io.to(user.room).emit('roomUsers',{

            room:user.room,
            users:getRoomUsers(user.room)
        });
    
    
    }
  });
  


});

                        return res.redirect('chat.html')
                    }else{
                        
                        res.send("password doesnot match")
                    }
                }else{
                    res.send("room doesnot match")
                }
            }else{
                res.send("username doesnot exists")
            }
        })
    })

  
     

    app.post("/easylogin",(req,res)=>{
        var adminname = req.body.adminname;
        var adminpassword = req.body.adminpassword;
        console.log(req.body)

        console.log(req.body.adminname)
        console.log(req.body.adminpassword)
    
        
      
        db.collection('admin').findOne({adminname:adminname},
            (error,data)=>{
                if(error){
                    res.send(error)
    
                }
                if(data){
                    console.log(data)
                    this.data=data
                    
                    if(adminpassword==data.adminpassword){
                        
                            return res.redirect('adminlogin.html')
                        }else{
                            res.send("password doesnot match")
                        }
                    }else{
                        res.send("admin doesnot exist")
                    }
                
               
            })
        })
        

        //feedback database
     

        app.post("/feedback",(req,res)=>{
            var msg = req.body.msg;
        
            var data = {
                "msg": msg
            }
        
            db.collection('feedback').insertOne(data,(err,collection)=>{
                if(err){
                    throw err;
                }
                console.log("Record Inserted Successfully");
            });
        
            return res.redirect('feedbacknotice.html')
        
        })
        
        




//starting socket
const path = require('path');
const http = require('http');

const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
     userJoin,
     getCurrentUser,
     userLeave,
     getRoomUsers 
    }= require('./utils/users');

const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));




const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));