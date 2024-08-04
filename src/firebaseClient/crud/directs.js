const admin = require("../firebaseAdmin");

const db = admin.getFirestore();

// Function to handle potential errors
const handleError = (error) => {
  console.error(error);
  throw error; // Re-throw for further handling
};

// Create Direct Report
async function createDirectReport(collectionName, data) {
  // Assuming data includes manager email and employee IDs
  try {
    const docRef = await db.collection(collectionName).doc(data.managerEmail);
    await docRef.set({ directs: data.data }); // Store employee IDs as an array
    console.log('Direct report written for manager:', docRef.id);
  } catch (error) {
    handleError(error);
  }
}

// Read Direct Reports
async function readDirectReports(collectionName, managerEmail) {
  try {
    const docRef = await db.collection(collectionName).doc(managerEmail).get();
    if (docRef.exists) {
      return docRef.data().directs || null; // Return empty array if no employees
    } else {
      console.log('No direct reports found for manager:', managerEmail);
      return null;
    }
  } catch (error) {
    handleError(error);
  }
}

// Update Direct Reports (Modify Existing Array)
async function updateDirectReports(collectionName, managerEmail, employeeIds) {
  try {
    const docRef = await db.collection(collectionName).doc(managerEmail);
    await docRef.update({ directs: employeeIds });
    console.log('Direct reports updated for manager:', managerEmail);
  } catch (error) {
    handleError(error);
  }
}

// Delete Direct Report (Remove from Array)
async function deleteDirectReport(collectionName, managerEmail, employeeId) {
  try {
    const docRef = await db.collection(collectionName).doc(managerEmail).get();
    if (docRef.exists) {
      const currentEmployees = docRef.data().employees || [];
      const updatedEmployees = currentEmployees.filter(id => id !== employeeId);
      await docRef.update({ directs: updatedEmployees });
      console.log('Direct report deleted for manager:', managerEmail);
    } else {
      console.log('No direct reports found for manager:', managerEmail);
    }
  } catch (error) {
    handleError(error);
  }
}

module.exports = {
  createDirectReport,
  readDirectReports,
  updateDirectReports,
  deleteDirectReport,
};

