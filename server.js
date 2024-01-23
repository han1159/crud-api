const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user_details_model')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//routes

app.get('/user', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
  
      const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.put('/user/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id,req.body);
        if(!user){
            return res.status(404).json({message : 'Cannot find any user with id : ${id}'})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

app.delete('/user/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message : 'cannot find any prodct with id : ${id}'})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

app.post('/user',async(req,res) => {
    try {
      const user = await User.create(req.body)
      res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})
mongoose.connect("mongodb+srv://admin:han1590@api1.mwvb9cl.mongodb.net/api?retryWrites=true&w=majority").then(() =>{
    console.log("Connected")
    app.listen(3000,() =>{
    console.log("Hey")
})

}).catch((error) => {
    console.log(error)
})

//Dummy data

const dummyData = [];

for (let i = 1; i <= 98; i++) {
    dummyData.push({
      name: `User ${i}`,
      age: Math.floor(Math.random() * 50) + 20, // Random age between 20 and 70
      sex: i % 2 === 0 ? 'Male' : 'Female',
      contact_no: Math.floor(Math.random() * 10000000000), // Random 10-digit number
    });
  }

//insert

User.insertMany(dummyData)
  .then(() => {
    console.log('Dummy data inserted successfully');
  })
  .catch((error) => {
    console.error('Error inserting dummy data:', error);
  });