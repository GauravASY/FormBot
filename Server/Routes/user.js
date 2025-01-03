import express from 'express'
import mongoose from 'mongoose'
import User from '../Models/userModel.js'
import {WorkSpace} from '../Models/workspaceModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authorization from '../Middlewares/authorization.js'
import { validateSignInInput, validateSignUpInput } from '../Middlewares/validation.js'

const userRouter = express.Router();


userRouter.get("/", authorization, async (req, res)=>{
    const id = req.userId;
    try {
        const user = await User.findById(id).populate('mySpace', 'name');
        if(user){
            return res.json({msg : "User Found", user : user, success: true});
        }
        else{
            return res.json({msg : "User not found", success: false});
        }
    } catch (error) {
        return res.json({msg : "Error", success: false});
    }
})

userRouter.get("/sharedSpace", authorization, async (req, res)=>{
    const id = req.userId;
    try {
        const user = await User.findById(id);
        if (user) {
            user.sharedSpaces = user.sharedSpaces.filter(sharedSpace => mongoose.Types.ObjectId.isValid(sharedSpace.sharedSpace));
        }
        const populatedUser = await user.populate({
            path: 'sharedSpaces.sharedSpace',
            select: 'name _id'
        });
        
        return res.json({msg : "Shared Space Retrieved", user : populatedUser, success:true})
    } catch (error) {
        return res.json({msg:"Error occured", success: false});
    }
})

userRouter.post("/signin", validateSignInInput, async (req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email: email});
    if(!user){
        return res.json({msg : "User not present", success:false});
    }

    const passwordCheck = bcrypt.compareSync(password, user.password);
    if(passwordCheck){
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        return res.json({msg : "Sign-In Successful", token:token, success: true});
    }
    else{
        return res.json({msg : "Incorrect Password", success: false});
    }
    } catch (error) {
        return res.json({msg : "Error", success: false});
    }
})

userRouter.post("/signup", validateSignUpInput, async (req, res)=>{
    const {username, email, password} = req.body;

    try {
        const user = await User.findOne({email: email});
    if(user){
        return res.json({msg : "User already present", success:false});
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const workspace = await WorkSpace.create({name : `${username}'s Workspace`});
    const newUser = new User({
        username : username,
        email: email,
        password: hashedPassword,
        mySpace : workspace._id
    })

    await newUser.save();
    return res.json({msg : "Sign-Up Successful", user : newUser, success: true});
    } catch (error) {
        return res.json({msg : "Error", success: false});
    }
})

userRouter.post("/sharebyemail", authorization, async (req, res)=>{
    const userId = req.userId;
    const {email, permission} = req.body;
    try {
        const user1 = await User.findById(userId);
        if(!user1){
            return res.json({msg:"User not present", success: false});
        }
        const user2 = await User.findOneAndUpdate({ email: email }, {$push : {sharedSpaces : {sharedSpace : user1.mySpace, permission : permission}}});
        if(!user2){
            return res.json({msg:"User do not have an account", success: false});
        }
        return res.json({msg : "Workspace Shared", success : true});

    } catch (error) {
        return res.json ({msg : "Error Occured", success : false});
    }
})

userRouter.post("/sharebylink", authorization, async (req, res) => {
    const userId = req.userId;
    const linkToken = req.body.linkToken;
  
    try {
      const verified = jwt.verify(linkToken, process.env.JWT_LINKTOKEN_SECRET);
      if (!verified.userId) {
        return res.json({ msg: "Invalid Link", success: false });
      }
      if (userId === verified.userId) {
        return res.json({ msg: "Workspace already present", success: false });
      }
  
      const user1 = await User.findById(verified.userId);
      if (!user1) {
        return res.json({ msg: "Workspace no longer exists", success: false });
      }
  
      const user2 = await User.findById(userId);
      if (!user2) {
        return res.json({ msg: "User does not have an account", success: false });
      }
  
      const hasSharedSpace = user2.sharedSpaces.some((sharedSpace) => {
        return sharedSpace.sharedSpace.equals(user1.mySpace);
    });
  
      if (hasSharedSpace) {
        return res.json({ msg: "Workspace already shared with you", success: false });
      }
  
      const updatedUser2 = await User.findByIdAndUpdate(userId, {
        $push: { sharedSpaces: { sharedSpace: user1.mySpace, permission: verified.permission } },
      }, { new: true }); 
  
      if (!updatedUser2) {
        return res.json({ msg: "Error updating user", success: false });
      }
  
      return res.json({ msg: "Workspace Shared", success: true });
    } catch (error) {
      return res.json({ msg: "Error Occured", success: false });
    }
  });


userRouter.post('/generatelink', authorization, async(req, res)=>{
    const userId = req.userId;
    const permission =req.body.permission;
    try {
        const linktoken = jwt.sign({userId, permission}, process.env.JWT_LINKTOKEN_SECRET);
        const link = process.env.FRONTEND_URL +"share/"+ linktoken;
        return res.json({msg:'Link Generated', link : link, success:true})
    } catch (error) {
        return res.json({msg:"Error Occured", success: false});
    }
})

userRouter.put("/update", authorization, async (req, res) => {
    try {
      const userId = req.userId;
      const { name, email, password, newPassword } = req.body;

      const user = await User.findById(userId);
  
      if (!user) {
        return res.json({ msg: "User not found" , success:false});
      }

      if (name !== "") user.username = name;
      if (email !== "") user.email = email;
      if (password !=="" && newPassword !=="") {
        const passwordCheck = bcrypt.compareSync(password, user.password);
        if (!passwordCheck) {
          return res.json({ msg: "Incorrect password", success: false });   
        }
        const hashedPassword = bcrypt.hashSync(newPassword, 12);
        user.password = hashedPassword;
      }
      await user.save();
  
      res.json({ msg: "User updated successfully" , success:true});
  
    } catch (error) {
      console.error("Error updating user:", error);
      res.json({ msg: "Internal server error", success:false });
    }
  });

export default userRouter;