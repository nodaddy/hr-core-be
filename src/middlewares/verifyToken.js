const { readEmployee } = require("../firebaseClient/crud/employee");
const admin = require("../firebaseClient/firebaseAdmin");

// Token verification middleware
function verifyIdToken(req, res, next) {
    const idToken = req.headers.authorization?.split('Bearer ')[1]; // Assuming token is in Authorization header

    if(idToken){
        admin.getAuth().verifyIdToken(idToken || "string")
        .then(async (decodedToken) => {
          req.user = decodedToken;
          console.log("verified");
          if(req.user.email.includes('adminforaccountcreation')){
            req.user.isAdmin = true;
          }

          // in every request we have all the employee data from the employees document
          // email is the primary key
          const employee = await readEmployee(req.user.email);
          req.user.employeeData = employee;
          next();
        })
        .catch((error) => {
          console.error('Error verifying ID token:', error);
          res.status(401).json({ error: 'Unauthorized' });
        });
    } else {
      console.error('No ID token found in request:');
      res.status(200).json({ error: 'pre-flight passed' });
    }
  }

module.exports = verifyIdToken;