const employeeService = require('../services/employeeService');

getEmployee = async (req, res) => {
    // if id is provided in the body, it fetches the employee details of that employee otherwise it gives the employee details of the
    // users/employee who made the api call
    console.log(req.user + "user");
    console.log(req.body);
    const employee = await employeeService.getEmployee(req.collectionPrefix, req.body.id ? req.body.id : req.user.email);
    if(employee){
        res.status(200).json(employee);
    } else {
        res.status(404).json("Not found");
    }
};

postEmployee = async (req, res) => {
    const newEmployee = req.body;
    const userId = await employeeService.postEmployee(req.collectionPrefix, newEmployee)
    .then(() => console.log('Script completed.'))
    .catch((error) => console.error('Error creating employee:', error));
    res.status(201).json({userId: userId});
};

module.exports = {
    postEmployee,
    getEmployee
}
