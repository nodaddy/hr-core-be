const admin = require("../firebaseAdmin");

const db = admin.getFirestore();

// Create a Employee
async function createEmployee(collectionName, data) {
    try {
      const docRef = await db.collection(collectionName).doc(data.email.toString().toLowerCase());
      await docRef.set(data);
      console.log('Employee written with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding Employee:', error);   
  
      throw error;
    }
  }
  
  // Read all Employees
  async function readEmployees(collectionName) {
    try {
      const snapshot = await db.collection(collectionName).get();
      const Employees = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
      return Employees;
    } catch (error) {
      console.error('Error reading Employees:', error);
      throw error;
    }
  }
  
  // Read a specific Employee
  async function readEmployee(collectionName, id) {
    try {
      const docRef = db.collection(collectionName).doc(id);
      const doc = await docRef.get();
      if (doc.exists) {
        return doc.data();
      } else {
        console.log('No such Employee!');
        return null;
      }
    } catch (error) {
      console.error('Error reading Employee:', error);
      throw error;
    }
  }
  
  // Update a Employee
  async function updateEmployee(collectionName, id, data) {
    try {
      await db.collection(collectionName).doc(id).update(data);
      console.log('Employee updated successfully');
    } catch (error) {
      console.error('Error updating Employee:', error);
      throw error;
    }
  }
  
  // Delete a Employee
  async function deleteEmployee(collectionName, id) {
    try {
      await db.collection(collectionName).doc(id).delete();
      console.log('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting Employee:', error);
      throw error;
    }
  }
  
  module.exports = {
    createEmployee,
    readEmployees,
    readEmployee,
    updateEmployee,
    deleteEmployee
  };