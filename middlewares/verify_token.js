const jwt = require('jsonwebtoken')

const auth_middleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = auth_middleware;