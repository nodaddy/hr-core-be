const { createExpense, readExpensesByEmployeeIdAndCompanyId } = require("../firebaseClient/crud/expenses");

const postExpense = async (req, res) => {

    const newExpense = req.body;
    newExpense.companyId = req.user.employeeData.companyId;
    newExpense.employeeId = req.user.employeeData.id;
    const response = await createExpense(newExpense);
    if(response){
        res.status(200).json(response);
    } else {
        res.status(500).json({error: "Internal server error"});
    }
}

const getExpensesByEmployeeIdAndCompanyId = async (req, res) => {
    const response = await readExpensesByEmployeeIdAndCompanyId(req.user.employeeData.id, req.user.employeeData.companyId);
    if(response){
        res.status(200).json(response);
    } else {
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    postExpense,
    getExpensesByEmployeeIdAndCompanyId
}