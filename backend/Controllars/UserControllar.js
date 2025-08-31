const UserModel = require("../Models/UserModel");
const { hashPassword, GenrateToken } = require("../Utils/Helper");
const bcrypt = require("bcrypt")

async function CreateUser(req, res) {
    const { fullname: { firstname, lastname }, email, password } = req.body;

    try {

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const finduser = await UserModel.findOne({ email: email });
        if (finduser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const GenrateHashPassword = await hashPassword(password);
        if (!GenrateHashPassword) {
            return res.status(500).json({ message: "Something went wrong" });
        }
        const newUser = new UserModel({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: GenrateHashPassword
        })
        const token = await GenrateToken(email, newUser._id);
        await newUser.save();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 12 * 60 * 60 * 1000
        })
        return res.status(201).json({
            message: "User created successfully",
            user: {
                fullname: newUser.fullname,
                email: newUser.email
            }
        });

    } catch (err) {
        console.log(err)

    }

}

async function LoginUser(req, res) {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const finduser = await UserModel.findOne({ email: email });
        if (!finduser) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, finduser.password);
        if (!isMatch) {
            return res.status(400).json({ message: " invaild Email or password" });
        }

        const token = await GenrateToken(email, finduser._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 12 * 60 * 60 * 1000
        })
        return res.status(200).json({
            message: "Login successful",
            user: {
                fullname: finduser.fullname,
                email: finduser.email
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something went wrong" });
    }
}


module.exports = { CreateUser, LoginUser };