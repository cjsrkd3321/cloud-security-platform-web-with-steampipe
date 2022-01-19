import mongoose from 'mongoose';

const complianceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 30,
  },
  results: [{ type: Map }],
  exceptions: { type: [String], length: 32 },
  exceptionLastUpdatedAt: { type: Date },
  complianceLastUpdatedAt: { type: Date, required: true },
});

const Compliance = mongoose.model('Compliance', complianceSchema);
export default Compliance;
