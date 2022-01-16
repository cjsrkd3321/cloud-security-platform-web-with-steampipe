import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 20,
  },
  password: { type: String, required: true, minlength: 10, maxlength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
