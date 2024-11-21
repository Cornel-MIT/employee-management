// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');
// require('dotenv').config(); 


// admin.initializeApp({
//   credential: admin.credential.cert({
//     type: 'service_account',
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: process.env.FIREBASE_AUTH_URI,
//     token_uri: process.env.FIREBASE_TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
//   })
// });

// const db = admin.firestore();
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   next();
// });

// app.get('/api/employees', async (req, res) => {
//   try {
//     const snapshot = await db.collection('employees').get();
//     const employees = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     res.json(employees);
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//     res.status(500).json({ 
//       error: 'Unable to fetch employees', 
//       details: error.message 
//     });
//   }
// });

// app.get('/api/employees/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const doc = await db.collection('employees').doc(id).get();
    
//     if (!doc.exists) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }
    
//     res.json({ id: doc.id, ...doc.data() });
//   } catch (error) {
//     console.error('Error fetching employee:', error);
//     res.status(500).json({ 
//       error: 'Unable to fetch employee', 
//       details: error.message 
//     });
//   }
// });

// app.post('/api/employees', async (req, res) => {
//   try {
//     const employee = req.body;

//     if (!employee.name || !employee.email) {
//       return res.status(400).json({ error: 'Name and email are required' });
//     }

//     const docRef = await db.collection('employees').add({
//       ...employee,
//       createdAt: admin.firestore.FieldValue.serverTimestamp()
//     });
    
//     res.status(201).json({ 
//       id: docRef.id, 
//       ...employee 
//     });
//   } catch (error) {
//     console.error('Error adding employee:', error);
//     res.status(500).json({ 
//       error: 'Unable to add employee', 
//       details: error.message 
//     });
//   }
// });

// app.put('/api/employees/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const employee = req.body;

//     if (!employee.name || !employee.email) {
//       return res.status(400).json({ error: 'Name and email are required' });
//     }

//     await db.collection('employees').doc(id).update({
//       ...employee,
//       updatedAt: admin.firestore.FieldValue.serverTimestamp()
//     });
    
//     res.json({ 
//       id, 
//       ...employee 
//     });
//   } catch (error) {
//     console.error('Error updating employee:', error);
//     res.status(500).json({ 
//       error: 'Unable to update employee', 
//       details: error.message 
//     });
//   }
// });

// app.delete('/api/employees/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const doc = await db.collection('employees').doc(id).get();
//     if (!doc.exists) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }

//     await db.collection('employees').doc(id).delete();
    
//     res.json({ 
//       message: 'Employee deleted successfully',
//       id 
//     });
//   } catch (error) {
//     console.error('Error deleting employee:', error);
//     res.status(500).json({ 
//       error: 'Unable to delete employee', 
//       details: error.message 
//     });
//   }
// });

// app.get('/api/employees/search', async (req, res) => {
//   try {
//     const { query } = req.query;
    
//     if (!query) {
//       return res.status(400).json({ error: 'Search query is required' });
//     }

//     const lowercaseQuery = query.toLowerCase();

//     const snapshot = await db.collection('employees')
//       .where('name', '>=', lowercaseQuery)
//       .where('name', '<=', lowercaseQuery + '\uf8ff')
//       .get();
    
//     const employees = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
    
//     res.json(employees);
//   } catch (error) {
//     console.error('Error searching employees:', error);
//     res.status(500).json({ 
//       error: 'Unable to search employees', 
//       details: error.message 
//     });
//   }
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     error: 'Something went wrong', 
//     details: err.message 
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// });

// module.exports = app;


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

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Route to get all employees
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


// app.post('/api/superadmin', async (req, res) => {
//   try {
//     const superAdmin = req.body;

//     // Check if a super admin already exists
//     const snapshot = await db.collection('superAdmins').get();
//     if (!snapshot.empty) {
//       return res.status(400).json({ error: 'Only one Super Admin is allowed' });
//     }

//     // Validate input
//     if (!superAdmin.name || !superAdmin.email || !superAdmin.password) {
//       return res.status(400).json({ error: 'Name, email, and password are required for Super Admin' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(superAdmin.password, 10);

//     // Save the super admin to Firestore
//     const docRef = await db.collection('superAdmins').add({
//       name: superAdmin.name,
//       email: superAdmin.email,
//       password: hashedPassword, // Store the hashed password
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     // Return success response
//     res.status(201).json({ id: docRef.id, ...superAdmin });
//   } catch (error) {
//     console.error('Error adding Super Admin:', error);
//     res.status(500).json({ 
//       error: 'Unable to add Super Admin', 
//       details: error.message 
//     });
//   }
// });


// // Route to get all super admins
// app.get('/api/superadmins', async (req, res) => {
//   try {
//     const snapshot = await db.collection('superAdmins').get();
//     const superAdmins = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     res.json(superAdmins);
//   } catch (error) {
//     console.error('Error fetching Super Admins:', error);
//     res.status(500).json({ 
//       error: 'Unable to fetch Super Admins', 
//       details: error.message 
//     });
//   }
// });


// app.post('/api/generaladmin', async (req, res) => {
//   try {
//     const generalAdmin = req.body;

//     if (!generalAdmin.name || !generalAdmin.email || !generalAdmin.password) {
//       return res.status(400).json({ error: 'Name, email, and password are required for General Admin' });
//     }

//     const docRef = await db.collection('generalAdmins').add({
//       ...generalAdmin,
//       createdAt: admin.firestore.FieldValue.serverTimestamp()
//     });

//     res.status(201).json({ id: docRef.id, ...generalAdmin });
//   } catch (error) {
//     console.error('Error adding General Admin:', error);
//     res.status(500).json({ 
//       error: 'Unable to add General Admin', 
//       details: error.message 
//     });
//   }
// });


// // Route to get all general admins
// app.get('/api/generaladmins', async (req, res) => {
//   try {
//     const snapshot = await db.collection('generalAdmins').get();
//     const generalAdmins = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     res.json(generalAdmins);
//   } catch (error) {
//     console.error('Error fetching General Admins:', error);
//     res.status(500).json({ 
//       error: 'Unable to fetch General Admins', 
//       details: error.message 
//     });
//   }
// });

// // Route to get specific super admin by id
// app.get('/api/superadmins/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const doc = await db.collection('superAdmins').doc(id).get();
    
//     if (!doc.exists) {
//       return res.status(404).json({ error: 'Super Admin not found' });
//     }
    
//     res.json({ id: doc.id, ...doc.data() });
//   } catch (error) {
//     console.error('Error fetching Super Admin:', error);
//     res.status(500).json({ 
//       error: 'Unable to fetch Super Admin', 
//       details: error.message 
//     });
//   }
// });

// // Route to get specific general admin by id
// app.get('/api/generaladmins/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const doc = await db.collection('generalAdmins').doc(id).get();
    
//     if (!doc.exists) {
//       return res.status(404).json({ error: 'General Admin not found' });
//     }
    
//     res.json({ id: doc.id, ...doc.data() });
//   } catch (error) {
//     console.error('Error fetching General Admin:', error);
//     res.status(500).json({ 
//       error: 'Unable to fetch General Admin', 
//       details: error.message 
//     });
//   }
// });

// // Route to delete a super admin
// app.delete('/api/superadmins/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const doc = await db.collection('superAdmins').doc(id).get();
//     if (!doc.exists) {
//       return res.status(404).json({ error: 'Super Admin not found' });
//     }

//     await db.collection('superAdmins').doc(id).delete();
    
//     res.json({ message: 'Super Admin deleted successfully', id });
//   } catch (error) {
//     console.error('Error deleting Super Admin:', error);
//     res.status(500).json({ 
//       error: 'Unable to delete Super Admin', 
//       details: error.message 
//     });
//   }
// });

// // Route to delete a general admin
// app.delete('/api/generaladmins/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const doc = await db.collection('generalAdmins').doc(id).get();
//     if (!doc.exists) {
//       return res.status(404).json({ error: 'General Admin not found' });
//     }

//     await db.collection('generalAdmins').doc(id).delete();
    
//     res.json({ message: 'General Admin deleted successfully', id });
//   } catch (error) {
//     console.error('Error deleting General Admin:', error);
//     res.status(500).json({ 
//       error: 'Unable to delete General Admin', 
//       details: error.message 
//     });
//   }
// });

// Route to create a Super Admin
app.post('/api/superadmin', async (req, res) => {
  try {
    const superAdmin = req.body;

    // Check if a Super Admin already exists (only one Super Admin allowed)
    const superAdminSnapshot = await db.collection('superAdmins').get();
    if (!superAdminSnapshot.empty) {
      return res.status(400).json({ error: 'Only one Super Admin is allowed' });
    }

    // Validate input
    if (!superAdmin.name || !superAdmin.email || !superAdmin.password) {
      return res.status(400).json({ error: 'Name, email, and password are required for Super Admin' });
    }

    // Check if the email is already taken (for Super Admins)
    const existingSuperAdmin = await db.collection('superAdmins').where('email', '==', superAdmin.email).get();
    if (!existingSuperAdmin.empty) {
      return res.status(400).json({ error: 'Super Admin with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(superAdmin.password, 10);

    // Save the super admin to Firestore
    const docRef = await db.collection('superAdmins').add({
      name: superAdmin.name,
      email: superAdmin.email,
      password: hashedPassword, // Store the hashed password
      role: 'superAdmin',       // Assign the role of Super Admin
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ id: docRef.id, ...superAdmin });
  } catch (error) {
    console.error('Error adding Super Admin:', error);
    res.status(500).json({
      error: 'Unable to add Super Admin',
      details: error.message
    });
  }
});

// Route to create a General Admin
app.post('/api/generaladmin', async (req, res) => {
  try {
    const { name, surname, age, idNumber, photo, role } = req.body;

    // Validate input
    if (!name || !surname || !age || !idNumber || !photo || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if a general admin already exists with the same ID number (or email, etc.)
    const snapshot = await db.collection('generalAdmins').where('idNumber', '==', idNumber).get();
    if (!snapshot.empty) {
      return res.status(400).json({ error: 'Admin with this ID number already exists.' });
    }

    // Create new General Admin document
    const docRef = await db.collection('generalAdmins').add({
      name,
      surname,
      age,
      idNumber,
      photo, // Storing Base64 encoded image as string
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Return success response
    res.status(201).json({ id: docRef.id, name, surname, age, idNumber, role });
  } catch (error) {
    console.error('Error creating General Admin:', error);
    // Log more details about the error for debugging
    res.status(500).json({ error: 'Unable to create General Admin', details: error.message });
  }
});


// Route to get all Super Admins
app.get('/api/superadmins', async (req, res) => {
  try {
    const snapshot = await db.collection('superAdmins').get();
    const superAdmins = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(superAdmins);
  } catch (error) {
    console.error('Error fetching Super Admins:', error);
    res.status(500).json({
      error: 'Unable to fetch Super Admins',
      details: error.message
    });
  }
});

// Route to get all General Admins
// app.get('/api/admins', async (req, res) => {
//   try {
//     // Fetch general admins and super admins
//     const generalAdminsSnapshot = await db.collection('generalAdmins').get();
//     const superAdminsSnapshot = await db.collection('superAdmins').get();

//     const generalAdmins = generalAdminsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     const superAdmins = superAdminsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     // Combine both lists
//     const admins = [...generalAdmins, ...superAdmins];

//     res.json(admins);
//   } catch (error) {
//     console.error('Error fetching admins:', error);
//     res.status(500).json({
//       error: 'Unable to fetch admins',
//       details: error.message,
//     });
//   }
// });

app.get('/api/admins', async (req, res) => {
  try {
    const generalAdminsSnapshot = await db.collection('generalAdmins').get();
    const superAdminsSnapshot = await db.collection('superAdmins').get();

    const generalAdmins = generalAdminsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const superAdmins = superAdminsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const admins = [...generalAdmins, ...superAdmins];
    res.json(admins); 
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({
      error: 'Unable to fetch admins',
      details: error.message,
    });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
