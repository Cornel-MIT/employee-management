const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config(); 


admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
  })
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/api/employees', async (req, res) => {
  try {
    const snapshot = await db.collection('employees').get();
    const employees = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ 
      error: 'Unable to fetch employees', 
      details: error.message 
    });
  }
});

app.get('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('employees').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ 
      error: 'Unable to fetch employee', 
      details: error.message 
    });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const employee = req.body;

    if (!employee.name || !employee.email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const docRef = await db.collection('employees').add({
      ...employee,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(201).json({ 
      id: docRef.id, 
      ...employee 
    });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ 
      error: 'Unable to add employee', 
      details: error.message 
    });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = req.body;

    if (!employee.name || !employee.email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    await db.collection('employees').doc(id).update({
      ...employee,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({ 
      id, 
      ...employee 
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ 
      error: 'Unable to update employee', 
      details: error.message 
    });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('employees').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await db.collection('employees').doc(id).delete();
    
    res.json({ 
      message: 'Employee deleted successfully',
      id 
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ 
      error: 'Unable to delete employee', 
      details: error.message 
    });
  }
});

app.get('/api/employees/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const lowercaseQuery = query.toLowerCase();

    const snapshot = await db.collection('employees')
      .where('name', '>=', lowercaseQuery)
      .where('name', '<=', lowercaseQuery + '\uf8ff')
      .get();
    
    const employees = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json(employees);
  } catch (error) {
    console.error('Error searching employees:', error);
    res.status(500).json({ 
      error: 'Unable to search employees', 
      details: error.message 
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong', 
    details: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;