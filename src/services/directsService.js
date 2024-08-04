const { createDirectReport, readDirectReports } = require("../firebaseClient/crud/directs");
const { readEmployees } = require("../firebaseClient/crud/employee")

const getDirects = async (collectionPrefix, managerEmail) => {
    const response = await readDirectReports(`${collectionPrefix}_directs`, managerEmail);
    return response;
}

const updateDirects = async (collectionPrefix, managerEmail) => {
    // update any reporting changes 
}

const publishDirects = async (collectionPrefix) => {
    const employees = await readEmployees(`${collectionPrefix}_employees`);
    console.log(employees.length);
    const directs = {};

    employees.forEach(doc => {
        const managerEmail = doc.data.managerEmail.toString().toLowerCase();
        if (!directs[managerEmail]) {
          directs[managerEmail] = []; // Initialize with an empty array
        }
        directs[managerEmail].push(doc.id.toString().toLowerCase());
      });
      console.log(Object.keys(directs).length);
    
    Object.keys(directs).forEach( async (managerEmail) => {
        await createDirectReport(`${collectionPrefix}_directs`, {data: directs[managerEmail.toString().toLowerCase()], managerEmail: managerEmail.toString().toLowerCase()})
    })
}

module.exports = {
    publishDirects,
    getDirects,
    updateDirects
}