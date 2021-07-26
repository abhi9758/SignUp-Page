const express = require("express");
const bodyParser = require("body-parser");
const reuest = require("request");
const https = require("https"); 

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req,res)
{
    res.sendFile(__dirname+"/home.html");
});

app.post("/" ,function(req,res)
{
    const firstName = req.body.fName;
    const secondName = req.body.sName;
    const emailN =  req.body.email;
    console.log(firstName,secondName,emailN);

    var data = {
        members:
        [
            {
                email_address:emailN,
                status: "subscribed",
                merge_fields:
                {
                    FNAME : firstName,
                    LNAME : secondName

                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/bedaee3cf0";

    const options = 
    {
        method: "POST",
        auth : "Abhishek1:ef625e9a2da2f21f015896912415f104-us6"
    }

   const request =  https.request(url , options , function(response)
    {
        if(response.statusCode == 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
  request.write(jsonData);
   request.end();
    
});

app.post("/failure" , function(req,res)
{
    res.redirect("/");
})


app.listen( process.env.PORT  || 3000 , function()
{
    console.log("Server is at http://localhost:3000");
});

//ef625e9a2da2f21f015896912415f104-us6
//bedaee3cf0