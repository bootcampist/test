const express = require('express');
const ProjectModel = require('../models/Projects.js');

const requireAuth = require('../middleware/requireAuth'); 

const router = express.Router()
router.use(requireAuth); 
 
// Get all projects
router.get('/projects', async (req, res) => {
    const user_id = req.user._id;
    try {
      const projects = await ProjectModel.find({ user_id });
      res.json(projects);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get a single project
  router.get('/projects/:id', getProject, (req, res) => {
    res.json(res.project);
  });
  
  // Create a project
  router.post('/projects', async (req, res) => {
      const project = {
      title: req.body.title,
      tDate: req.body.tDate,
      targetDate: req.body.targetDate,
      tDesc: req.body.tDesc,
      toDoList: req.body.toDoList,
      status: req.body.status,
      user_id: req.user._id
    };
  
    try {
      const newProject = await ProjectModel.create(project);
      res.status(201).json(newProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update a project
  router.put('/projects/:id', getProject, async (req, res) => {
    
    if (req.body.title != null) {
      res.project.title = req.body.title;
    }
    if (req.body.tDate != null) {
      res.project.tDate = req.body.tDate;
    }
    if (req.body.targetDate != null) {
      res.project.targetDate = req.body.targetDate;
    }
    if (req.body.tDesc != null) {
      res.project.tDesc = req.body.tDesc;
    }
    if (req.body.toDoList != null) {
      res.project.toDoList = req.body.toDoList;
    }
    if (req.body.status != null) {
      res.project.status = req.body.status;
    }
  
    try {
      const updatedProject = await res.project.save();
      res.json(updatedProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a project
  router.delete('/projects/:id', getProject, async (req, res) => {
    const id = res.project.id;
    try {
      await ProjectModel.findByIdAndDelete({_id: id});

      res.json({ message: 'Project deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Middleware function to get a single project by ID
  async function getProject(req, res, next) {
    let project;
    try {
      project = await ProjectModel.findById(req.params.id);
      if (project == null) {
        return res.status(404).json({ message: 'Project not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.project = project;
    next();
  }
  
  module.exports = router;