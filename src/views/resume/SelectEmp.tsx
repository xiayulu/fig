import { Select, Spin } from "antd";
import { useGetEmployeeListQuery } from "@/views/employee/api";
import { Employee } from "../employee/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { setEmp } from "./slice";

export interface Props {
}

export default function () {
  const { data, error, isLoading } = useGetEmployeeListQuery();
  const options = data?.map(item => ({ value: item._id, label: item.name })) || [];

  const { emp } = useAppSelector(state => state.resume)
  const dispatch = useAppDispatch();

  if (isLoading) return (
    <Spin tip="Loading" size="large" />
  )

  return (
    <div>
      <Select
        style={{ width: 240 }}
        defaultValue={emp ? emp._id : ""}
        placeholder="请选择求职者"
        onChange={(_id: string) => {
          dispatch(setEmp(data?.find(e => e._id === _id)))
        }}
        options={options}
      />
    </div>
  )
}