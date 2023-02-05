import User from '../middleware/Models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController {
    // register user
    static async createUser(req, res) {

        try {

            const salt = await bcrypt.genSalt()

            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            const hashedRepeatPassword = await bcrypt.hash(req.body.repeatPassword, salt)

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                repeatPassword: hashedRepeatPassword
            });
            await user.save();
            res.status(201).json({
                status: "success",
                registeredUser: user
            });
            console.log("User registered successfully!");

        } catch (err) {
            res.status(500).json({
                status: "fail",
                error: err.message
            });
        }

    }
    static async login(req, res) {
        try {

            //check if user exists
            const user = await User.findOne({ email: req.body.email })

            if (!user) {
                return res.status(400).json({
                    status: "fail",
                    "InvalidCredentials": "Invalid email or password"
                });
            }
            //check if password is correct
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    status: "fail",
                    "InvalidCredentials": "Invalid email or password"
                });
            }
            //create token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "48h",
            });
            res.header("auth_token", token)

            res.status(200).json({
                status: "success",
                "successMessage": "LoggedIn successfully!",
                "token": token
            });
        } catch (err) {
            res.status(500).json(err.message);

        }

    }

    //get single user
    static async getSingleUser(req, res) {
            try {

                const singleUser = await User.findById(req.params.id)
                if (!singleUser) {
                    res.status(404).json({
                        status: "fail",
                        message: "user not found!!!"
                    });
                    return;
                }

                res.status(200).json({
                    status: "success",
                    data: singleUser
                });
            } catch (error) {
                res.status(500).json({

                    status: "fail",
                    error: error.message
                });
            }
        }
        //get all users
    static async getAllUsers(req, res) {
            try {
                const users = await User.find();
                res.status(200).json({
                    status: "success",
                    allUsers: users
                })
            } catch (error) {
                res.status(404).json({
                    status: "fail",
                    error: error.message
                });
            }
        }
        ////
    static async updateUser(req, res) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ status: "fail", message: "The user not found" });
            }
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ status: "success", data: null, message: 'User deleted!' });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    }

}
export default UserController