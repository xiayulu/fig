import { Select, Spin } from "antd";
import { useGetProjectListQuery } from "@/views/project/api";
import { Project } from "@/views/project/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { setPro } from "./slice";

export interface Props {
}

export default function () {
  const { data, error, isLoading } = useGetProjectListQuery();
  const options = data?.map(item => ({ value: item._id, label: item.name })) || [];

  const { pro } = useAppSelector(state => state.resume)
  const dispatch = useAppDispatch();

  if (isLoading) return (
    <Spin tip="Loading" size="large" />
  )

  return (
    <div>
      <Select
        mode="multiple"
        style={{ width: 240 }}
        defaultValue={pro.map(e => e._id)}
        placeholder="请选择项目经历"
        onChange={(_ids: string[]) => {
          const set = new Set(_ids);
          dispatch(setPro(data?.filter(e => {
            return set.has(e._id);
          }) || []));
        }}
        options={options}
      />
    </div>
  )
}