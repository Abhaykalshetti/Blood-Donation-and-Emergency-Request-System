import mongoose  from 'mongoose';

const donorschema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  userType:{ type: String, required: true },
  fullName: { type: String },
  dateOfBirth:{ type: String},
  gender: { type: String},
  bloodGroup: { type: String},
  phoneNumber:{ type: String },
  email: { type: String},
   address:{ type: String},
   age: { type: String},
 cityState:{ type: String },
  pincode:{ type: String },
  weight:{ type: String},
 emergencyContactName:  { type: String},
    emergencyContactRelationship:{ type: String},
   emergencyContactPhone: { type: String},
   photo:{type: Object },
   licenseNumber: { type: String},
   licensePdf: { type: Object}, 
   storageCapacity: { type: String},
   operatingHours: { type: String},
    notifications: [
    {
      sender: { type: String, required: true }, // e.g., "Admin" or "Organization"
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const Entry = mongoose.model('DonorData', donorschema);

export default Entry;
