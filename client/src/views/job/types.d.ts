export interface Job {
  _id: string
  name: string
  detail: string
  address: string
  tags: string
}

export interface MutateJobForm {
  name: string
  detail: string
  address: string
  tags: string
}
