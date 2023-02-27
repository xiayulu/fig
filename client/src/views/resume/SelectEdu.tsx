import { Select, Spin } from "antd";
import { useGetEduListQuery } from "@/views/edu/api";
import { Edu } from "../edu/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { setEdus } from "./slice";

export interface Props {

}

export default function () {
  const { data, error, isLoading } = useGetEduListQuery();
  const options = data?.map(item => ({ value: item._id, label: item.school })) || [];

  const { edus } = useAppSelector(state => state.resume)
  const dispatch = useAppDispatch();

  if (isLoading) return (
    <Spin tip="Loading" size="large" />
  )

  return (
    <div>
      <Select
        mode="multiple"
        style={{ width: 240 }}
        defaultValue={edus.map(e => e._id)}
        placeholder="请选择教育经历"
        onChange={(_ids: string[]) => {
          const set = new Set(_ids);
          dispatch(setEdus(data?.filter(e => {
            return set.has(e._id);
          }) || []));
        }}
        options={options}
      />
    </div>
  )
}