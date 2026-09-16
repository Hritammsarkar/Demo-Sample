const express = require('express');
const cors = require('cors');
const { profile, skills, projects, contactMessages } = require('./data');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API Info Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Portfolio API',
    endpoints: {
      profile: 'GET /api/profile',
      skills: 'GET /api/skills',
      projects: 'GET /api/projects',
      projectById: 'GET /api/projects/:id',
      contact: 'POST /api/contact'
    }
  });
});

// GET /api/profile
app.get('/api/profile', (req, res) => {
  res.json({
    success: true,
    data: profile
  });
});

// GET /api/skills
app.get('/api/skills', (req, res) => {
  res.json({
    success: true,
    count: skills.length,
    data: skills
  });
});

// GET /api/projects (supports ?featured=true)
app.get('/api/projects', (req, res) => {
  const { featured } = req.query;

  let result = projects;
  if (featured !== undefined) {
    const isFeatured = featured.toLowerCase() === 'true';
    result = projects.filter((p) => p.featured === isFeatured);
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /api/projects/:id
app.get('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: `Project with ID ${projectId} not found`
    });
  }

  res.json({
    success: true,
    data: project
  });
});

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and message.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  const newMessage = {
    id: contactMessages.length + 1,
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  contactMessages.push(newMessage);
  console.log('New contact message received:', newMessage);

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out! Your message has been received.',
    data: {
      id: newMessage.id,
      receivedAt: newMessage.receivedAt
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend running on http://localhost:${PORT}`);
});
