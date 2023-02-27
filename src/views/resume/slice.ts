import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Edu } from '../edu/types'
import { Employee } from '../employee/types'
import { Project } from '../project/types'


export type State = {
  emp?: Employee
  edus: Edu[]
  pro: Project[]
}

const initialState: State = {
  emp: undefined,
  edus: [],
  pro: []
}

const slice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setEmp(state, action: PayloadAction<Employee | undefined>) {
      state.emp = action.payload
    },
    setEdus(state, action: PayloadAction<Edu[]>) {
      state.edus = action.payload
    },
    setPro(state, action: PayloadAction<Project[]>) {
      state.pro = action.payload
    },
  }
})


export const { setEmp, setEdus, setPro } = slice.actions;

export default slice;