export interface Edu {
  _id: string
  school: string
  subject: string
  score: string
  from: string
  to: string
  course: string
  createdAt: string
  updatedAt: string
}

export interface CreateForm {
  school: string
  subject: string
  score: string
  from: string
  to: string
  course: string
}
