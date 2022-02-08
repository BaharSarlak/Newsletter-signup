const express=require('express');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const mailchimpCredentials=require('./mailchimpCredentials');
// ********************************

mailchimp.setConfig({
  apiKey: mailchimpCredentials.apiKey,
  server: mailchimpCredentials.serverPrefix
});

// ******************************8

const app=express();

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
    console.log('Response Status Code for get request to signup page: '+res.statusCode);
})

app.post('/', (req,res)=>{
    const userInfo=req.body
    console.log('User submitted these info: '+ JSON.stringify(userInfo))

    // adding contact to our Mailchimp list:

    // mailchimp list id:
    const listId = mailchimpCredentials.listId;

    // user info object:
    const subscribingUser = {
    firstName: userInfo.firstname,
    lastName: userInfo.lastname,
    email: userInfo.email
    };

    // function to add user to the list
    async function addContact() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
            }
        });

        if(response.statusCode===200) {
            console.log(
                `Successfully added contact as an audience member. The contact's id is ${response.id}.`
            );
            res.sendFile(__dirname+'/success.html');
        } else{
            console.log(JSON.stringify(response))
            console.log(
                `Failded to add contact. response status code:${response.statusCode}`
            );
            res.sendFile(__dirname+'/fail.html');
        }
    }

    addContact();

})

app.post('/Fail.html',(req,res)=>{
    res.redirect('/')
})

app.listen(3000,()=> console.log('server running on port 3000'));
