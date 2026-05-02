const jwt = require("jsonwebtoken")
// middleware for protected route to access profile page, only login user can access
const authMiddleWare = (req,res,next) => {
    try {
        const {accessToken} = req.cookies;
        console.log(accessToken);
        
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        if(decoded){
            req.user = decoded;  // store the decoded user information in the request object for further use
            next()  // call the next route handler to continue processing the request
        }
        else{
            res.status(401).send({message:"Unauthorized request"})
        }
        
        }
        
        catch (error) {
            console.log(error);
            
         res.status(401).send({message:"Unauthorized request"})
    }
}

module.exports = {authMiddleWare};