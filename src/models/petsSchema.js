import { Schema, model } from "mongoose";

const petSchema = new Schema(
{
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  description: { type: String },
  healthStatus: { type: String },
  photos: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},
{
    versionKey:false
});

export const petModel = model('Pet', petSchema);
