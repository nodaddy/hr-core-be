const admin = require("../firebaseAdmin");

const db = admin.getFirestore();

const collectionName = 'employees';

// Create a Employee
async function createEmployee(data) {
    try {
      const docRef = await db.collection(collectionName).doc();
      console.log(data);
      await docRef.set(data);
      console.log('Employee written with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding Employee:', error);
      throw error;
    }
  }
  
  // Read all Employees
  async function readEmployees() {
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
  async function readEmployee(email) {
    try {
      const docRef = db.collection(collectionName);
      const queryRef = docRef.where("email", "==", email);
      const docs = await queryRef.get();
      const employees = [];
      docs.forEach(doc => {
          employees.push({...doc.data(), id: doc.id});
      })
      if(employees && employees.length > 0) {
          return employees[0];
      } else {
          console.log(`Employee with email ${email} not found! `);
          return null;
      }
    } catch (error) {
      console.error('Error reading Employee:', error);
      throw error;
    }
  }
  
  // Update a Employee
  async function updateEmployee(email, data) {
    console.log(data);
    try {
      const docRef = db.collection(collectionName);
      const queryRef = docRef.where("email", "==", email);
      const docs = await queryRef.get();
       
      // Check if any documents match the query
      if (!docs.empty) {
        // Iterate through the matching documents (usually only one)
        docs.forEach(async (doc) => {
            // Update the document with the new data
            await docRef.doc(doc.id).update(data);
            console.log(`Document with email ${email} has been updated.`);
        });
    } else {
        console.log(`No document found with email ${email}.`);
    }
  }
    catch (error) {
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