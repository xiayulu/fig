import mongoose from 'mongoose'

// 模板接口
export interface Document extends mongoose.Document {
  school: string
  subject: string
  score: string
  from: string
  to: string
  course: string
  createdAt: Date
  updatedAt: Date
}

// 模板校验规则
const Schema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    school: { type: String, required: true },
    score: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    course: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<Document>('edus', Schema);