//users table.. -->userModel
const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil")
const cloudinaryUtil = require("../utils/CloudanryUtil");
const multer = require("multer");

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
    await mailUtil.sendingMail(createdUser.email,"welcome to Trackflow","this is welcome mail")
    

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

//--------->> addUserWithProfileImage----
const addUserWithProfileImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    try {
      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Profile image is required" });
      }

      // Upload file to Cloudinary
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      
      // Attach image URL to req.body
      req.body.profileImage = cloudinaryResponse.secure_url;

      // Save user data in database
      const savedUser = await userModel.create(req.body);

      res.status(201).json({
        message: "User with profileimage created successfully",
        data: savedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};




const getAllUsers = async (req, res) => {
 

  const users = await userModel.find() //[{}]

  res.json({
    message: "user fetched successfully",
    data:users
  });
};

// const addUser1  = async(req,res)=>{

//   //try catch if else...
//   try{

//       const createdUser = await userModel.create(req.body)
//       res.status(201).json({
//           message:"user created..",
//           data:createdUser
//       })



//   }catch(err){

//       res.status(500).json({
//           message:"error",
//           data:err
//       })

//   }




//addUser
const addUser = async (req, res) => {
  //req.body,req.params,req.headers,req.query
  //console.log("request body....", req.body);
  //insert into roles () values()
  //database...
  const savedUser = await  userModel.create(req.body)

  res.json({
    message:"user created...",
    data:savedUser
  });
};
//getUser
//deleteUser
const deleteUser = async(req,res)=>{

  //delete from roles where id =?
  //req.params
//    console.log(req.params.id) //prams object...

  const deletedUser = await userModel.findByIdAndDelete(req.params.id)

  res.json({
    message:"user deleted successfully..",
    data:deletedUser
  })



}
//getUserById
const getUserById = async (req,res)=>{

  //req.params.id

  const foundUser = await userModel.findById(req.params.id)
  res.json({
    message:"user fatched..",
    data:foundUser
  })

}


//exports
module.exports = {
    getAllUsers,addUser,deleteUser,getUserById,loginUser,signup,addUserWithProfileImage


    
}