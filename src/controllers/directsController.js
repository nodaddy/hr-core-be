const directsService = require('../services/directsService');

// get list of direct reports to a manager
const getDirects = async (req, res) => {
    // req.body.managerId
    const response = await directsService.getDirects(req.collectionPrefix, req.body.managerId);
    console.log(req.body.managerId);
    if(response){
        res.status(200).json(response);
    } else {
        res.status(404).json("Not found");
    }
}

const updateDirects = async (req, res) => {
    // update any reporting changes
}

module.exports = {
    getDirects,
    updateDirects
}