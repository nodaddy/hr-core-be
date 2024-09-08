const { updateEmployee } = require("../firebaseClient/crud/employee");
const { createLeaveApplication, readEmployeeLeaves } = require("../firebaseClient/crud/leave");

const postLeaveApplication = async (req, res) => {
    const {leaveType, datesAndDuration, reason, attachment} = req.body;
    console.log(req.user.managerEmail);
    const application = {
        employeeEmail: req.user.email,
        managerEmail: req.user.employeeData.managerEmail,
        leaveType: leaveType,
        dates: datesAndDuration, // array of objects {date: date, duration: half/full day}
        reason: reason,
        status: 0, // 0 = pending, 1 = approved, -1 = rejected
        appliedOn: new Date().toString(),  // Thu Aug 01 2024 00:00:00 GMT+0530 (India Standard Time)
        approvedBy: null,
        approvedOn: null,
        companyId: req.user.employeeData?.companyId,
        attachment: attachment
    }
    const applicationId = await createLeaveApplication(application);

    if(applicationId){
        res.status(200).json({applicationId: applicationId});
    } else {
        res.status(500).json({error: "Internal Server Error"});
    }
}

// get leaves by employee email
const getLeaves = async (req, res) => {
    const leaves = await readEmployeeLeaves(req.user.email, req.user.employeeData?.companyId);

    if(leaves){
        res.status(200).json(leaves);
    } else {
        res.status(404).json("Not found");
    }
}

module.exports = {
    postLeaveApplication,
    getLeaves
}