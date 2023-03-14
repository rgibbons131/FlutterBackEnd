const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const db = require("../models");
const User = db.user;

// Verify Token
verifyToken = (req, res, next) => {
 // Get auth header value token
 let token = req.headers["x-access-token"];
 // Check if token is not empty
 if (!token) {
// If token is empty, return a 403 error
 return res.status(403).send({
 message: "No token provided!"
 });
 }
 // Verify token
 jwt.verify(token, config.secret, (err, decoded) => {
 if (err) {
// If token is invalid, return a 401 error
 return res.status(401).send({
 message: "Unauthorized!"
 });
 }
 // If token is valid, save the user id to the request
 req.user_Id = decoded.id;
 next();
 });
};

       const authJwt = {
        verifyToken: verifyToken,
       };
       module.exports = authJwt;
       