const express = require('express');
const dbConnect=require('./dbConnect')
const app=express();
app.use(express.json());
const path=require('path')
const userRoute=require('./Routes/usersRoute');
const transactionsRoute=require('./Routes/transactionsRoute')
app.use('/api/users/',userRoute)
app.use('/api/transactions/',transactionsRoute)

const port= process.env.PORT||5000;

if(process.env.NODE_ENV==='production')
{
    app.use('/',express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client/build/index.html'))
    })
}

app.listen(port,()=>console.log('example app listening at port !!'))