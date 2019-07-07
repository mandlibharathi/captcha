const express=require('express')
const app=express();
const bodyParser=require('body-parser');
const request=require('request')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html')
})
app.post('/subscribe',(req,res)=>{
    if(
        req.body.captcha===undefined ||
        req.body.captcha===''||
        req.body.captcha===null
    ){
return res.json({"sucess":false,"msg":"please select captcha"})
    }
    //secrect key
const secretkey="your secrect key"
//verify url

const verifyUrl=`
https://google.com/recaptcha/api/siteverify?secret=
${secretkey}&responce=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`

request(verifyUrl,(err,response,body)=>{
  body=JSON.parse(body)
  console.log(body)
  if(body.success !== undefined && !body.success){
 return res.json({"sucess":false,"msg":"failed to captcha verified"})
  }
  return res.json({"sucess":true,"msg":"capta verified"})
})
})   

app.listen(5000,()=>console.log('server is running ....'))