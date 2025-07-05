import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Camp from "../models/organization.js"
import Donor from "../models/donor.js"
const router = express.Router();

router.post('/camp-details',authMiddleware(['organization']), async (req,res)=>{
    const {
      name,
    organizer,
    date,
    time,
    contact,
    expectedDonors,
    licenseNumber,
    licenseExpiry,
    bloodBankName,
    bloodBankAddress,
    medicalOfficerName,
    medicalOfficerRegistration,
    targetBottles,
    city,
    location,
    equipmentAvailable,
    emergencyContact,
    additionalNotes}=req.body;
const status="pending";
let user= new Camp({
    userId:req.userId,
    name,
    organizer,
    date,
    time,
    status,
    contact,
    expectedDonors,
    licenseNumber,
    licenseExpiry,
    bloodBankName,
    bloodBankAddress,
    medicalOfficerName,
    medicalOfficerRegistration,
    targetBottles,
    city,
    location,
    equipmentAvailable,
    emergencyContact,
    additionalNotes
})
try {
  await user.save();
  res.json({ message: "Diary entry added successfully" });
} catch (error) {
  res.status(500).json({ error: "Failed to add diary entry" });
}
});

router.get("/organization/camps",authMiddleware(['organization']),async (req,res)=>{
 
  let requireddata= await Camp.find({
    userId: req.user.id
  })
  res.json(requireddata);
})
router.get("/all",authMiddleware(['admin']),async (req,res)=>{
    let alldata= await Camp.find();
   res.send(alldata)
    
})
router.get("/findcamps",authMiddleware(['donor']),async (req,res)=>{
  try{
  let approved=await Camp.find({
    status:"accepted"
  })
    if(approved){
     res.json(approved);
    }else{
      res.json({ message:"There are no camps available" });
    }}catch(err){
      res.status(500).json({ error: "Failed to fetch camps" });
    }
})
router.patch("/camps/:campId",authMiddleware(["admin"]),async (req, res) => {
      
    try {
      const stat  = req.body.status;

      const camp = await  Camp.findOneAndUpdate(
        { _id: req.params.campId },    // Filter by campId
        { $set: { status: stat } },  // Update the status field
        { new: true }                  // Return the updated document
      );
  
      if (!camp) {
        return res.status(404).json({ message: 'Camp not found' });
      }
      
      if (req.user.role !== 'admin') {
       
        return res.status(403).json({ message: 'Not authorized' });
      }
      await camp.save();
      res.json(camp);
    } catch (error) {
      res.status(500).json({ message: 'Error updating camp status' });
    }
  });

  router.put('/update-registered-users/:campId',authMiddleware(['donor']), async (req, res) => {
     const { campId } = req.params;
    const { registeredUsers } = req.body; // Can be a single object or an array

    if (!registeredUsers) {
        return res.status(400).json({ message: 'registeredUsers field is required' });
    }

    const usersToAdd = Array.isArray(registeredUsers) ? registeredUsers : [registeredUsers];

    try {
        const updatedCamp = await Camp.findByIdAndUpdate(
            campId,
            { $push: { registeredUsers: { $each: usersToAdd } } },
            { new: true }
        );

        if (!updatedCamp) {
            return res.status(404).json({ message: 'Camp not found' });
        }

        res.status(200).json({ message: 'User(s) added to registeredUsers', camp: updatedCamp });
    } catch (error) {
        console.error('Error adding registered users:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
router.put('/remove-registered-user/:campId',authMiddleware(['organization']),async (req, res) => {
    const { campId } = req.params;
    const { userId } = req.body;


    try {
        const camp = await Camp.findById(campId);
        if (!camp) return res.status(404).json({ message: 'Camp not found' });

        camp.registeredUsers = camp.registeredUsers.filter(user => user._id !== userId);
        await camp.save();
        const donor = await Donor.findOne({_id: userId});
    if (donor) {
      donor.notifications.push({
        sender: `Organization- ${camp.name}`,
        message: `You have been removed from the blood camp ${camp.name}, because while reviweing your profile we found that you are not eligible`,
        timestamp: new Date()
      });
      await donor.save();
    }
    
        res.status(200).json({ message: 'User removed successfully and notified', camp });

  

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});


export default router;