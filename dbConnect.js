const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://deepanshu:mongo1234@cluster0.n6nkv.mongodb.net/ExpenseTracker',{useNewUrlParser : true,useUnifiedTopology:true});

const connection=mongoose.connection;

connection.on('error',err=> console.log('error'));

connection.on('connected',err1=>console.log('mongo db connection successfull'));
