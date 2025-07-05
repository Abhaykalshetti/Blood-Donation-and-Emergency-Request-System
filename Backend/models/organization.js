import mongoose  from 'mongoose';

const campschema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
      name:{ type: String},
      organizer: { type: String },
      date:  { type: String},
      time: { type: String},
      status:{type: String},
      contact:{ type: String},
      expectedDonors: { type: String },
      licenseNumber: { type: String},
      licenseExpiry:{ type: String},
      bloodBankName: { type: String},
      bloodBankAddress:{ type: String},
      medicalOfficerName:{ type: String},
      medicalOfficerRegistration:{ type: String},
      targetBottles:{ type: String},
      city: { type: String},
      location:{ type: String},
      equipmentAvailable:{ type: String},
      emergencyContact:{ type: String},
      additionalNotes: { type: String},
       registeredUsers: [
    {
      username: String,
      bloodType: String,
      location: String,
      _id: String
    }
  ]
});

const Entry = mongoose.model('CampData', campschema);

export default Entry;