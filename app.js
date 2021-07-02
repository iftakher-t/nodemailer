const express = require('express');
const nodemailer = require("nodemailer");

const app = express();
require('dotenv').config()

const middleware =[
    express.json(),
    express.urlencoded({extended:true})
]

app.use(middleware)

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.post('/send',(req,res)=>{

    const output =`
    <p> You have a new contact request</p>
    <h3> contact details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Compani:${req.body.compani}</li>
        <li>Emil: ${req.body.emil}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3> Message</h3>
    <p> ${req.body.message}</p>
    `

        //nodemailer part 
        const transporter  = nodemailer.createTransport({
            service : "gmail",
            auth:{
                user:'hmdiftakher@gmail.com',
                pass:process.env.PASSWORD
            }
        }) //transporter part

    // send mail with defined transport object
   var receiverEmail="iftrokh@gmail.com"
    let mailOption = {
        from: '"Nodemailer contact" <hmdiftakher@gmail.com>', // sender address
        to:receiverEmail, // list of receivers
        subject: "Node contact request", // Subject line
        text: "Hello", // plain text body
        html:output, // html body
    }

        //send the mail
        transporter.sendMail(mailOption, (err, data) => {
            if(err){
                console.log(err);
                res.json({
                    message: "problem to delivered the mail to the sender",
                    err
                }) //if there have some error during the email send
            }
            res.status(200).json({
                message: `message has been successfully send to ${receiverEmail}`
            })
        }) //send the mail here

    })

app.listen(3000, ()=>{
    console.log('server started on port 3000')
})
