const userModel = require("../models/userModel");

exports.registerController = async (req, res) => {
  try {
    const { name, email, branch, password, confirmPassword } = req.body;

    if (!name || !email || !branch || !password || !confirmPassword) {
      return res.send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    if (password != confirmPassword) {
      return res.send({
        success: false,
        message: "Password doesn't match",
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.send({
        success: false,
        message: "Account already exist",
      });
    }

    // create admin profile

    if (name === "admin" && email === "admin@gmail.com" && branch === "CSE") {
      const admin = new userModel({
        name,
        email,
        branch,
        password,
        type: "Admin",
      });

      await admin.save();

      return res.send({
        success: true,
        message: "Admin account created successfully",
      });
    }

    // create a new user profile

    const newUser = new userModel({
      name,
      email,
      branch,
      password,
      type: "User",
    });

    await newUser.save();

    return res.send({
      success: true,
      message: "Account created successfully",
      newUser,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.send({
        success: false,
        message: "Account not found",
      });
    }

    const userPassword = user.password;

    if (password != userPassword) {
      return res.send({
        success: false,
        message: "Incorrect password",
      });
    }

    return res.send({
      success: true,
      message: "Login successfully",
      user,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};
