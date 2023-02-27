import mongoose from 'mongoose'

// 模板接口
export interface ProjectDocument extends mongoose.Document {
  name: string
  role: string
  details: string[]
  from: string
  to: string
  createdAt: Date
  updatedAt: Date
}

// 模板校验规则
const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    details: { type: Array<String>, required: true },
    role: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ProjectDocument>('projects', Schema);
