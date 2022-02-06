const express=require('express');
const https=require('https');

const app=express();

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
    console.log('Response Status Code: '+res.statusCode);
})

app.post('/', (req,res)=>{
    const userInfo=req.body
    const firstName=userInfo.firstname;
    const lastName=userInfo.lastname;
    const email=userInfo.email;
    console.log(userInfo);

})

app.listen(3000,()=> console.log('server running on port 3000'));
