import mongoose from 'mongoose'

// 模板接口
export interface JobDocument extends mongoose.Document {
  name: string
  detail: string
  address: string
  tags: string
  createdAt: Date
  updatedAt: Date
}

// 模板校验规则
const jobSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    detail: { type: String, required: true },
    address: { type: String, required: true },
    tags: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)


// 创建模板 执行之后会自动在mongodb中创建相应的模板
const JobModel = mongoose.model<JobDocument>('Job', jobSchema);

export default JobModel;