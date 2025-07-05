import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Donor from "../models/donor.js"
import Requests from "../models/emergencyRequest.js"
const router = express.Router();


// Add a new diary entry
router.post("/profile", authMiddleware(['donor']), async (req, res) => {
  console.log(req.body);

  const {
    userType,
    fullName,
    phoneNumber,
    email,
    address,
    cityState,
    pincode,
    dateOfBirth,
    age,
    gender,
    weight,
    bloodGroup,
    emergencyContactName,
    emergencyContactRelationship,
    emergencyContactPhone,
    licenseNumber,
    licensePdf,
    storageCapacity,
    operatingHours
  } = req.body;

  try {
    const existingEntry = await Donor.findOne({ userId: req.userId });

    if (existingEntry) {
      existingEntry.userType = userType;
      existingEntry.fullName = fullName;
      existingEntry.phoneNumber = phoneNumber;
      existingEntry.email = email;
      existingEntry.address = address;
      existingEntry.cityState = cityState;
      existingEntry.pincode = pincode;
      existingEntry.dateOfBirth = dateOfBirth;
      existingEntry.age = age;
      existingEntry.gender = gender;
      existingEntry.weight = weight;
      existingEntry.bloodGroup = bloodGroup;
      existingEntry.emergencyContactName = emergencyContactName;
      existingEntry.emergencyContactRelationship = emergencyContactRelationship;
      existingEntry.emergencyContactPhone = emergencyContactPhone;
      existingEntry.licenseNumber = licenseNumber;
      existingEntry.licensePdf = licensePdf;
      existingEntry.storageCapacity = storageCapacity;
      existingEntry.operatingHours = operatingHours;

      await existingEntry.save();
      res.json({ message: "Profile updated successfully" });
    } else {
      // Create new entry
      const newEntry = new Donor({
        userId: req.userId,
        userType,
        fullName,
        phoneNumber,
        email,
        address,
        cityState,
        pincode,
        dateOfBirth,
        age,
        gender,
        weight,
        bloodGroup,
        emergencyContactName,
        emergencyContactRelationship,
        emergencyContactPhone,
        licenseNumber,
        licensePdf,
        storageCapacity,
        operatingHours
      });

      await newEntry.save();
      res.json({ message: "Profile created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process profile" });
  }
});

  
  router.get('/get-profile',authMiddleware(['donor']), async (req,res)=>{
    try{
      const ispresnet= await Donor.findOne({
        userId: req.userId
      });
      if(ispresnet) return res.status(201).json(ispresnet)
      if(!ispresnet) return  res.status(401)
    }catch(err){
      res.status(500).json({ message: "Server Error" });
    }
      

  });;
 router.get("/getAllDonors",authMiddleware(['admin']), async (req,res)=>{
      let Donors= await Donor.find();
      console.log(Donors);
      
         res.json(Donors);
          
 })

 // Example (simplified Express.js route)
router.post('/requests', authMiddleware(['donor']), async (req, res) => {
    try {
        const { patientName, bloodType, urgency, hospital, doctorContact, reason, status, requestDate } = req.body;
        // req.user.id is populated by your authentication middleware after successful login
        const newRequest = new Requests({
            patientName, bloodType, urgency, hospital, doctorContact, reason, status, requestDate,
            userId: req.user.id // <-- Crucial: Associate the request with the logged-in user
        });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
// GET /api/requests/my
router.get('/requests/my', authMiddleware(['donor']), async (req, res) => {
    try {
        const myRequests = await Requests.find({ userId: req.user.id }).sort({ requestDate: -1 });
        res.status(200).json(myRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/requests/others
router.get('/requests/others',  authMiddleware(['donor']), async (req, res) => {
    try {
        // $ne means "not equal"
        const otherRequests = await Requests.find({ userId: { $ne: req.user.id } }).sort({ requestDate: -1 });
        res.status(200).json(otherRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/profile/:userId',authMiddleware('organization'), async (req, res) => {
    try {
        const user = await Donor.findOne({_id:req.params.userId}); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        res.status(500).json({ message: 'Server error while fetching user profile.' });
    }
});

router.put('/requests/:requestId/:Stat',authMiddleware(['donor']),async (req,res)=>{
  const requestId= req.params.requestId;
  const stat=req.params.Stat;
   const donor = await Donor.findOne({userId: req.body.donorId});
   const receiver= await Donor.findOne({userId: req.body.requestOwner});
   const requests= await Requests.findOneAndUpdate(
    {_id: requestId},
      { $set: { status: stat} }, 
        { new: true }    
   )
    if (receiver) {
      receiver.notifications.push({
        sender: `Donor-${donor.fullName}`,
        message: `Your request for the blood donation has been accepted by ${donor.fullName}`,
        timestamp: new Date()
      });
      await receiver.save();
    }
  
    
     res.status(200).json({ message: 'Request Accepted and Notified  notified'});


})
  export default router;
  