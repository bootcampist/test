const mongoose = require('mongoose');

// Define the project schema
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  tDate: {
    type: Date,
    default: Date.now, 
    required: true
  },
  targetDate: {
    type: String,
    required: false
  },
  tDesc: {
    type: String,
    required: false
  },
  toDoList: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: true
}
});  

// Create a model from the schema
const ProjectModel = mongoose.model('projects', ProjectSchema);

// Export the model
module.exports = ProjectModel;
