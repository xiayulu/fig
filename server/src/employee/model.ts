import mongoose from 'mongoose'

// 模板接口
export interface Document extends mongoose.Document {
  name: string
  age: number
  exp: number
  phone: string
  avatar: string
  email: string
  job: string
  city: string
  salary: string
  sex: boolean
  createdAt: Date
  updatedAt: Date
}

// 模板校验规则
const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    age: { type: Number, required: true },
    exp: { type: Number, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    job: { type: String, required: true },
    city: { type: String, required: true },
    salary: { type: String, required: true },
    sex: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<Document>('employees', Schema);