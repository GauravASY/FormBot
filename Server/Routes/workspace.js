import mongoose from "mongoose";
import express from 'express'
import authorization from "../Middlewares/authorization.js";
import User from '../Models/userModel.js'
import jwt from 'jsonwebtoken'
import {WorkSpace, Folder} from "../Models/workspaceModel.js";

const workspaceRouter = express.Router();

workspaceRouter.post('/', authorization, async (req, res)=>{
    const accountId = req.body.accountId;

   try {
        const workspace = await WorkSpace.findById(accountId).populate('folders', 'name');
        if(workspace){
            return res.json({msg :'Workspace found', workspace:workspace, success:true});
        }
        else{
            return res.json({msg : 'Workspace not found', success: false});
        }
   } catch (error) {
        return res.json({msg:'error', success: false});
   }
})

workspaceRouter.post('/createfolder', authorization, async(req, res)=>{
    const {accountId, name}= req.body;
    console.log("Create folder handler line 28");
    console.log(accountId);
    console.log(name);
    try {
        console.log("Create folder handler line 31");
        const folder = await Folder.create({name : name}); 
        console.log("Create folder handler line 33");
        if(!folder){
            return res.json({msg :'Folder creation error', success:false});
        }
        console.log("Create folder handler line 37");
        const workspace = await WorkSpace.findByIdAndUpdate(accountId, {$push : {folders : folder._id} });
        console.log("Create folder handler line 39");
        return res.json({msg :'Folder created', success: true});  
    } 
    catch (error) {
        return res.json({msg : "Error Occured", success:false});
    }
})

workspaceRouter.post('/createform', authorization, async(req, res)=>{
    const {accountId, name}= req.body;
    try {
        const form  = {name : name}; 
        const workspace = await WorkSpace.findByIdAndUpdate(accountId, {$push : {forms : form} });
        return res.json({msg :'Form created', success: true});  
    } 
    catch (error) {
        return res.json({msg : "Error Occured", success:false});
    }
})

workspaceRouter.delete('/deletefolder', authorization, async(req, res)=>{
    const {accountId, folderId} = req.body;
    try {
        const folder = await Folder.findByIdAndDelete(folderId);
        if(!folder){
            return res.json({msg:'No Folder Found', success:false});
        }
        const workspace = await WorkSpace.findByIdAndUpdate(accountId, {$pull : {folders : folderId}});
        return res.json({msg:"Folder deleted", success: true});
    } catch (error) {
        return res.json({msg:"Error Occured", success : false});
    }
})

workspaceRouter.delete('/deleteform', authorization, async(req, res)=>{
    const {accountId, formId} = req.body;
    try {
        const workspace = await WorkSpace.findByIdAndUpdate(accountId, {$pull : {forms : {_id : formId}}});
        return res.json({msg:"Form deleted", success: true});
    } catch (error) {
        return res.json({msg:"Error Occured", success : false});
    }
})

workspaceRouter.post("/saveform", authorization, async(req, res)=>{
    const {form, formId, workspaceId, name} = req.body;
    try {
        const workspace = await WorkSpace.findOne({ _id: workspaceId, "forms._id": formId });
    
        if (!workspace) {
          return res.json({msg:'Workspace or form does not exist', success: false});
        }

        const updatedWorkspace = await WorkSpace.findOneAndUpdate(
          { _id: workspaceId, "forms._id": formId }, 
          { $set: { "forms.$.content": form, "forms.$.name": name} },
        );

        return res.json({msg:"Form Saved", success: true})
      } catch (error) {
        return res.json({msg:'Error Occured', success: false});
      }
})

workspaceRouter.post("/getform/:id", authorization, async(req, res)=>{
    const formId = req.params.id;
    const {currentWorkSpace} = req.body;
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.json({msg:'User not found', success:false})
        }
        const workspace = await WorkSpace.findOne({ _id: currentWorkSpace, "forms._id": formId }, { "forms.$": 1 });
        if(!workspace){
            return res.json({msg:'Workspace or form does not exist', success: false});
        }
        return res.json({msg:'Form Found', form: workspace.forms, success: true})
    } catch (error) {
        return res.json({msg:"Error Occured", success:false});
    }
})

workspaceRouter.post("/updatevisit", authorization, async(req, res)=>{
    const formToken = req.body.formToken;
    const visitCount = req.body.visitCount;
    try {
        const {formId, workspaceId} = jwt.verify(formToken, process.env.JWT_LINKTOKEN_SECRET);

        const workspace = await WorkSpace.findOne({ _id: workspaceId, "forms._id": formId }, { "forms.$": 1 });
        if(!workspace){
            return res.json({msg:'Workspace or form does not exist', success: false});
        }
        let val = workspace.forms[0].visitCount + visitCount;
        const updatedWorkspace = await WorkSpace.findOneAndUpdate(
            { _id: workspaceId, "forms._id": formId }, 
            { $set: { "forms.$.visitCount": val } },
          );
        return res.json({msg:'Start updated', success: true})
    } catch (error) {
        return res.json({msg:"Error Occured", success:false});
    }
})

workspaceRouter.post("/savestart", authorization, async(req, res)=>{
    const formToken = req.body.formToken;
    const start = req.body.start;
    try {
        const {formId, workspaceId} = jwt.verify(formToken, process.env.JWT_LINKTOKEN_SECRET);

        const workspace = await WorkSpace.findOne({ _id: workspaceId, "forms._id": formId }, { "forms.$": 1 });
        if(!workspace){
            return res.json({msg:'Workspace or form does not exist', success: false});
        }
        let val = workspace.forms[0].start + start;
        const updatedWorkspace = await WorkSpace.findOneAndUpdate(
            { _id: workspaceId, "forms._id": formId }, 
            { $set: { "forms.$.start": val } },
          );
        return res.json({msg:'Start updated', success: true})
    } catch (error) {
        return res.json({msg:"Error Occured", success:false});
    }
})

workspaceRouter.get("/fillform/:formToken", authorization, async(req, res)=>{
    const formToken = req.params.formToken;
    const userId = req.userId;
    try {
        const {formId, workspaceId} = jwt.verify(formToken, process.env.JWT_LINKTOKEN_SECRET);
        const user = await User.findById(userId);
        if(!user){
            return res.json({msg:'User not found', success:false})
        }
        const workspace = await WorkSpace.findOne({ _id: workspaceId, "forms._id": formId }, { "forms.$": 1 });
        if(!workspace){
            return res.json({msg:'Workspace or form does not exist', success: false});
        }
        return res.json({msg:'Form Found', form: workspace.forms, success: true})
    } catch (error) {
        return res.json({msg:"Error Occured", success:false});
    }
})

workspaceRouter.post('/submitresponse', authorization, async(req, res)=>{
    const {formToken, responses} = req.body;
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.json({msg:'User not found', success:false})
        }
        const {formId, workspaceId} = jwt.verify(formToken, process.env.JWT_LINKTOKEN_SECRET);
        const workspace = await WorkSpace.findOne({ _id: workspaceId, "forms._id": formId });
    
        if (!workspace) {
          return res.json({msg:'Workspace or form does not exist', success: false});
        }
        const now = new Date();
        const options = {
            month: 'short', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        };

        const updatedWorkspace = await WorkSpace.findOneAndUpdate(
          { _id: workspaceId, "forms._id": formId }, 
          { $push: { "forms.$.responses": {email : user.email, data: responses, submittedAt: now.toLocaleString('en-US', options) }} },
        );

        return res.json({msg:"response Submitted", success: true})
      } catch (error) {
        return res.json({msg:'Error Occured at submit response', success: false});
      }
})

workspaceRouter.post('/shareform', authorization, async(req, res)=>{
    const {formId, workspaceId} = req.body;
    const workspace = await WorkSpace.findOne({ _id: workspaceId, "forms._id": formId });
    if (!workspace) {
        return res.json({msg:'Unauthorized to share', success: false});
    }
    const formToken = jwt.sign({formId: formId, workspaceId:workspaceId}, process.env.JWT_LINKTOKEN_SECRET);
    const sharelink = process.env.FRONTEND_URL + "/fillForm/" + formToken;
    return res.json({msg:'Share link generated', link:sharelink, success:true});
})


export default workspaceRouter;