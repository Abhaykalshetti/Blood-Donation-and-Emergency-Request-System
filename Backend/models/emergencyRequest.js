import mongoose  from 'mongoose';

const requests = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      patientName:  { type: String},
      bloodType:  { type: String},
      urgency:  { type: String},
      hospital:  { type: String},
      doctorContact:  { type: String},
      reason:  { type: String},
      status: { type: String},
       requestDate: {
    type: Date,
    default: Date.now,
    expires: 259200 // 3 days in seconds
  },
});

const Entry = mongoose.model('EmergencyRequests', requests);

export default Entry;