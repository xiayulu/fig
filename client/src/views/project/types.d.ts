export interface Project {
  _id: string
  name: string
  from: string
  to: string
  role: string
  details: string[]
}

export interface CreateForm {
  name: string
  from: string
  to: string
  role: string
  details: string[]
}