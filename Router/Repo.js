const express = require('express');
const router = express.Router();
const repo = require('../Modals/Repo');
const user = require('../Modals/Auth');
const { body, validationResult } = require('express-validator');
const fetchData = require('../middleware/fetchData');
var jwt = require('jsonwebtoken');

const JWT_secret = "iamironman";



// IMP :- Remember JoinRepo Field in User has three field first is CreaterName , RepoName , Visible -> [CreaterName][Reponame] is address for pc 
router.post('/createRepo',fetchData,[body('repoName', 'please input valid title').isLength({ min: 1 }),
body('repoDescription', 'please enter atleast 4 length password').isLength({ min: 4 })], async (req, res) => {
    //console.log("Hello notes page");
    // checking validation of request(req) which was send by user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("error");
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { repoName, repoDescription,visibility} = req.body;
        const Data = await repo.findOne({repoName,createrName : req.UserData.id}); // repoName unique for a User means Other User take that name
        if(Data){
            return res.json("That repoName choose please choose different one of them :)")
        }

        const repoData = await new repo({
            createrName: req.UserData.id,
            repoName, repoDescription,visibility
        })
        //console.log(userdata);
        // addToSet put unique element and repoName must be unique for particular user
        user.findOneAndUpdate({username : req.UserData.id},{$addToSet : {createRepo : {repoName : repoData.repoName,visible : repoData.visibility}}},(err,docs)=>{
            if (err){
                console.log(err);
                return res.json({success : false,message : "Not updated in user repo details"});
            }
        })
        //console.log(userdata);
        repoData.save();
        res.json(repoData);
    } catch (error) {
        console.log(error)
        res.json({ success : false,error: error.message });
    }
})


router.delete('/delete/:repoName',fetchData,async (req,res) =>{
    try {
        const username = req.UserData.id;
        const reponame = req.params.repoName;

        // FindDetails
        const userRepo = await user.findOne({username}).select("-password");
        let check = false;
        userRepo.createRepo.forEach(element => {
            if(element.repoName == reponame){
                check =  true;
            }
        });
        // //console.log(userRepo.createRepo);

        if(!check){
            return res.status(400).json({success : false,message : "Invalid request"});
        }
    
        // write the code of delete this repository :-
        repo.findOneAndDelete({repoName : reponame,createrName : username},(err,docs)=>{
            if(err){
                console.log(err)
                return res.json({ success : false,error: err.message });
            }else{
                // we have to also update in user database in createRepo and joinRepo field 
                

                // In update I gave a query because some other person may create same name of repository
                user.updateMany({username},{$pull : {createRepo : {"repoName" : reponame}}},{multi : true},(err,docs)=>{
                    if(err){
                        console.log(err)
                        return res.json({ success : false,error: err.message });
                    }
                });


                user.updateMany({},{$pull : {joinRepo : {"createrName" : username,"repoName" : reponame}}},{multi : true},(err,docs)=>{
                    if(err){
                        console.log(err)
                        return res.json({ success : false,error: err.message });
                    }
                });
            }
        })

        res.json({success : check,username,reponame});
    } catch (error) {
        console.log(error)
        res.json({ success : false,error: error.message });
    }
})


router.put('/update/:repoName',fetchData,async (req,res) => {
    try {
        const createrName = req.UserData.id;
        const repoName = req.params.repoName;
        const {repoDescription,visibility} = req.body;
        // if(visibility){
        //     console.log({repoName,repoDescription,visibility});
        // }else{
        //     console.log({repoName,repoDescription});
        // }

        // Do it -> if Reponame changes than In user createrepo and joinRepo must also updated 

        if(repoDescription){
            await repo.updateOne({createrName,repoName},{$set : {repoDescription}})
        }

        if(visibility){
            await repo.updateOne({createrName,repoName},{$set : {visibility}})
        }


        res.json({success : true});
    } catch (error) {
        console.log(error)
        res.json({ success : false,error: error.message });
    }
})


router.post('/:repoName/contributer/:userName',fetchData,async (req,res) => {

    try {
        const {repoName , userName} = req.params;

        const createrName = req.UserData.id;

        // May be by mistake creater add himself to the contributer
        if(createrName == userName){
            return res.status(400).json({success : false , message : "Invalid Request"});
        }

        // User is valid or not
        const Userdata = await user.findOne({username : userName});
        if(!Userdata){
            return res.status(400).json({success : false , message : "Invalid Request"});
        }

        repo.findOneAndUpdate({repoName,createrName},{$addToSet : {contributors :  {username : userName}}},(err,docs)=> {
            if(err){
                console.log(err)
                return res.json({ success : false,error: err.message });
            }else{
                console.log(docs);
                user.findOneAndUpdate({username : userName},{$addToSet : {joinRepo :  {createrName,repoName}}},(err,docs) =>{
                    if(err){
                        console.log(err)
                        return res.json({ success : false,error: err.message });
                    }else{
                        console.log(docs);
                    }
                })

                res.json({success : true});
            }
        })
    } catch (error) {
        console.log(error)
        res.json({ success : false,error: error.message });
    }
})


router.get('/see/contributors/:createrName/:repoName',async (req,res)=>{
    try {
        
        const {createrName,repoName} = req.params;
        const token = req.header('auth-token');
        let AuthUser;
        if(token){
            var decoded = jwt.verify(token, JWT_secret);
            AuthUser = decoded.User.id;
        }
        const repoData = await repo.findOne({createrName,repoName},{visibility : 1,_id : 0,contributors : 1});
        if(!repoData){
            return res.status(400).json({success : false,message : "Invalid Request"});
        }
        if(repoData.visibility == true || AuthUser == createrName){
            return res.json(repoData.contributors);
        }else{
            return res.status(400).json({ success : false});
        }
    } catch (error) {
        console.log(error)
        res.json({ success : false,error: error.message });
    }
})

// router.post('/JoinRepo/:RepoId/:Type',fetchData,async (req,res) => {

//     try {
//         //console.log(req.params);
//         const {RepoId,Type} = req.params;
//         const userId = req.UserData.id;
        
//         //console.log(RepoId)
//         const RepoData = await repo.findById(RepoId);
//         const UserData = await user.findById(userId);
//         // Is Repo Exists
//         if(!RepoData){
//             return res.status(404).json({success : false,error : "This repo is not exist"})
//         }
//         // Is User Already a member or admin
//         RepoData.Admin.map((data)=>{
//             if(data == userId){
//                 return res.status(400).json({success : false,error : "You are already a admin of this repository"});
//             }
//         })
//         RepoData.Member.map((data) => {
//             if(data == userId){
//                 return res.status(400).json({success : false,error : "You are already a member of this repository"});
//             }
//         })
//         UserData.joinRepo.map((data) => {
//             if(data == RepoId){
//                 return res.status(400).json({success : false,error : "You joined that repository already"});
//             }
//         })

//         //console.log(UserData);
        

//         //console.log(RepoData)
//         // Type = 1 -> as member 2-> as admin
//         if(Type == '1'){
//             RepoData.Member.push(userId);
//             repo.findByIdAndUpdate(RepoId,RepoData,(err,docs) => {
//                 if(err){
//                     console.log(err);
//                     return res.json({success : false,message : "Not added a user in repo details"});
//                 }
//             })
//         }else{
//             RepoData.Admin.push(userId);
//             repo.findByIdAndUpdate(RepoId,RepoData,(err,docs) => {
//                 if(err){
//                     console.log(err);
//                     return res.json({success : false,message : "Not added a user in repo details"});
//                 }
//             })
//         }
//         UserData.joinRepo.push(RepoId);
//         user.findByIdAndUpdate(userId,UserData,(err,docs) => {
//             if(err){
//                 console.log(err);
//                 return res.json({success : false,message : "Not added a repo in user details"});
//             }
//         })

//         res.json(RepoData)
//         console.log(UserData)
//     } catch (error) {
//         console.log(error)
//         res.json({ error: error.message });
//     }
// })

// router.post('/Repodata/:RepoId',fetchData, async (req, res) => {
//     try {
//       const id = req.params.RepoId;
//       const repoData = await repo.findById(id).select("-password");
//       res.json(repoData);
//     } catch (error) {
//       console.log(error)
//       res.json({error: error.message });
//     }
//   })

module.exports = router;