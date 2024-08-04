const admin = require("../firebaseClient/firebaseAdmin");

// Token verification middleware
function verifyIdToken(req, res, next) {
    const idToken = req.headers.authorization?.split('Bearer ')[1]; // Assuming token is in Authorization header

    if(idToken){
        admin.getAuth().verifyIdToken(idToken || "string")
        .then((decodedToken) => {
          req.user = decodedToken;
          console.log("verified");
          // collection prefix, so that we can know which company's collection to go to, different companies have differnt collections for similar entities e.g. companyA_employees, companyB_employees
          req.collectionPrefix = decodedToken.email.split('@')[1].split('.')[0];
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