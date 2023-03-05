//Requiring the modules
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
//in order for the server to serve on static files such as css we need to use a special function called static


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const fn=req.body.firstName;
  const ln=req.body.lastName;
  const em=req.body.email;

  //Now we need out data object which would be a list with key-value pairs:
    const data={
        members:[
          {
          email_address:em,
          status:"subscribed",
          merge_fields:{
            FNAME:fn,
            LNAME:ln,
          }
        }
        ]
    };
    var jsonData=JSON.stringify(data);//this is the finsl data that we are going to send to mailchimp
    const url="https://us21.api.mailchimp.com/3.0/lists/bbc0fcdb90";
    //here we add the list id because in mailchimp
    //we have multiple list and we neeed to specify in which list we want to add our subscribers into
    const options={//its going to be an javaScript object
      method:"POST",
      auth:"DreamyMedhi:3d173461484e3c71873d12f7c53dde8d-us21",
    }
    const request=https.request(url,options,function(response){
      response.on("data",function(data){
        console.log(JSON.parse(data));
        var statusCode=response.statusCode;
          if(statusCode==200){

              // app.get("/",function(req,res){
               res.sendFile(__dirname+"/success.html");
          // });
          }else{
              //   app.get("/",function(req,res){
                res.sendFile(__dirname+"/failure.html")
              // });

          }



      });

    });
    request.write(jsonData);//we are passing the mailchimp our jsonData
    request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(3000,function(req,res){
  console.log("Server Started");
});


//API KEY
// 3d173461484e3c71873d12f7c53dde8d-us21
// Audience id or list id
// bbc0fcdb90

//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
