const { createDirectReport, readDirectReports } = require("../firebaseClient/crud/directs");
const { readEmployees, readEmployee } = require("../firebaseClient/crud/employee")

const getDirects = async (collectionPrefix, managerEmail) => {
    const response = await readDirectReports(`${collectionPrefix}_directs`, managerEmail);

    if(response && response.length > 0){
         // response will lhave the details of the manager too who's reports are being considered here 
        response.push(managerEmail);

        // res will have data of direct reports including the manager's data
        const res = await Promise.all(response.map(async (direct) => {
            const employee = await readEmployee(`${collectionPrefix}_employees`, direct);
            return {
                department: employee?.department,
                email: employee?.email,
                fullName: employee?.fullName,
                jobTitle: employee?.jobTitle
            };
        }));
        return res;   
    } else {
        return null;
    }
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