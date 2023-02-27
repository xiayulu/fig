export interface Employee {
  _id: string
  name: string
  age: number
  exp: number
  phone: string
  email: string
  job: string
  city: string
  salary: string
  // 0:girl, 1: man
  sex: boolean
  avatar: string
  createdAt: string
  updatedAt: string
}

export interface CreateForm {
  name: string
  age: number
  exp: number
  phone: string
  email: string
  job: string
  city: string
  salary: string
  sex: boolean
}
