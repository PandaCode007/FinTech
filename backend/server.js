require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const seedDatabase = require('./utils/seeder');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve React static build files (in production)
const buildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(buildPath));

// MongoDB Database Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://FinTech:FinTech00%40%4022@cluster0.22uwisj.mongodb.net/FinTech?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('💚 Connected to MongoDB Database');
    // Run seeder to set up default values
    await seedDatabase();
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
  });

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/public', require('./routes/public'));

// Fallback to React frontend index.html for React Router SPAs
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API Route not found' });
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
