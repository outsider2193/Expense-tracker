//users table.. -->userModel
const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil")
const multer = require("multer");
const resetkey = "yourresetkey"

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Multer object
const upload = multer({
  storage: storage,
}).single("profileImage");

const signup = async (req, res) => {

  try {

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);
    await mailUtil.sendingMail(createdUser.email, "welcome to Trackflow", "this is welcome mail")


    res.status(201).json({
      message: "user created..",
      data: createdUser,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const loginUser = async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;



  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("role");
  console.log(foundUserFromEmail);

  if (foundUserFromEmail != null) {

    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });


    const token = jwt.sign({ id: user._id }, resetkey, { expiresIn: "30m" });


    const resetLink = `"http://localhost:5173"/reset-password/${token}`;


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yogeshkarthik1524@gmail.com",
        pass: "xats arzt onpj rbgz",
      },
    });


    await transporter.sendMail({
      from: "yogeshkarthik1524@gmail.com",
      to: user.email,
      subject: "Password Reset Link",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
    });

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const token = req.params.token;

  try {

    const decoded = jwt.verify(token, resetkey);
    const userId = decoded.id;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Password reset failed", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
//getUserById
const getUserById = async (req, res) => {

  //req.params.id

  const foundUser = await userModel.findById(req.params.id)
  res.json({
    message: "user fetched..",
    data: foundUser
  })

}



module.exports = {
  getUserById, loginUser, signup



}