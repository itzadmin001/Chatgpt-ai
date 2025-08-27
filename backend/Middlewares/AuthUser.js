const express = require("express")
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");


async function VerifyUser(req, res, next) {
    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. Please Login first" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
            if (err) {
                console.log(err)
                return res.status(403).json({ message: "Invalid or expired token" });
            }
            const FindUser = await UserModel.findOne({
                $or: [
                    { email: decoded.email },
                    { _id: decoded.id }
                ]
            })
            if (!FindUser) {
                return res.status(404).json({ message: "User not found Login First" });
            }

            req.user = decoded;
            next();
        });
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
}


module.exports = { VerifyUser }