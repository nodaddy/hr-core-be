const { createEmployee, readEmployee, updateEmployee } = require("../firebaseClient/crud/employee");
const { faker } = require('@faker-js/faker');
const Employee = require("../models/employee");

const getEmployee = async (collectionPrefix, id) => {
    const response = await readEmployee(`${collectionPrefix}_employees`, id);
    return response ? response: null;
};

const postEmployee = async (collectionPrefix, newEmployee) => {
    const response = await createEmployee(`${collectionPrefix}_employees`, newEmployee);
    return response;
};

const createNRandomEmployees = async (numberOfEmployees) => {
    // Array to store employee IDs
    const employeeIds = [];

    const departments = {
        dep1: "dep1",
        dep2: "dep2",
        dep3: "dep3",
        dep4: "dep4",
        dep5: "dep5",
    }
  
    for (let i = 0; i < numberOfEmployees; i++) {
        const email = faker.internet.email().toString().toLocaleLowerCase().split("@")[0] + "@aviato.com";
      const employeeData = {
        department: faker.helpers.arrayElement(Object.keys(departments)), // Random department
        jobTitle: faker.name.jobTitle(),
        email: email,
        employeeId: faker.datatype.uuid(), // Use datatype.uuid for unique IDs
        fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
        location: {
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          streetAddress: faker.location.streetAddress()
        },
        employeeType: Math.random() < 0.5 ? "fulltime" : "parttime",
        managerEmail: null
      };
  
      employeeIds.push(email); // Add employee ID to the array
  
      const employee = new Employee(employeeData);
      await createEmployee("aviato_employees", employee.toObject()); // Replace with your actual function call
    }


  
    // Assign manager IDs after generating all employees
    for (let i = 0; i < numberOfEmployees; i++) {
      // Logic to assign manager ID based on specific criteria (replace with your logic)
      const managerIndex = Math.floor((Math.random()/10) * (numberOfEmployees - 1)); // Example: Random manager excluding current employee
     
      await updateEmployee("aviato_employees", employeeIds[i], {managerEmail: employeeIds[managerIndex].toString().toLowerCase()}); // Replace with your function to update employee
    }
  
    console.log(`${numberOfEmployees} employees created successfully!`);
  };


module.exports = {
    postEmployee,
    getEmployee,
    createNRandomEmployees
}