const express=require('express');
const https=require('https');

const app=express();

app.listen(3000,()=> console.log('server running on port 3000'));
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
    console.log('Response Status Code: '+res.statusCode)
})