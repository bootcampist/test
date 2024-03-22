require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/UserModel.js');
const TaskModel = require('./models/Tasks.js');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/tasks');
const projectRoutes = require('./routes/project');


const requireAuth = require('./middleware/requireAuth');

//set  up express
const app = express(); 

//prepare cross origin for deployment
app.use(cors(
    {
        origin: ["https://nucleus-plum-zeta.vercel.app"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

// parse data and require authentication for each endpoint
app.use(express.json());


// route for the user
app.use('/api/user', userRoutes);

//route 
app.use('', taskRoutes);

//route for project
app.use('', projectRoutes);

// connect to the database using an environment variable
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// set up the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})
