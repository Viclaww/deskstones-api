import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: String,
  role: {
    type: String,
    enum: ['user', 'writer', 'admin'],
  },
});

export default model('User', userSchema);
