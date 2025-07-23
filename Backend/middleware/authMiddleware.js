 import jwt from  "jsonwebtoken"; // Use environment variable in production

const authMiddleware = (roles = []) => { 
  return (req, res, next) => {
  
   
    const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];    
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = decoded;
      req.userId=decoded.id;
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid Token" }); 
    }
  };
};

export default authMiddleware;
