import { Employee } from "./types"
import { Image } from 'antd';

export interface Props {
  item: Employee,
}

export default function ({ item }: Props) {
  return (
    <div className="flex justify-between pt-4">
      <div>
        <div className="py-1"><span className="mr-2 font-bold">姓名：</span>{item.name}</div>
        <div className="py-1"><span className="mr-2 font-bold">岗位：</span>{item.job}</div>
        <div className="py-1"><span className="mr-2 font-bold">城市：</span>{item.city}</div>
        <div className="py-1"><span className="mr-2 font-bold">邮箱：</span>{item.email}</div>
      </div>
      <div>
        <div className="py-1"><span className="mr-2 font-bold">经验：</span>{item.exp}年</div>
        <div className="py-1"><span className="mr-2 font-bold">薪资：</span>{item.salary}/月</div>
        <div className="py-1"><span className="mr-2 font-bold">性别：</span>{item.sex ? "男" : "女"}</div>
        <div className="py-1"><span className="mr-2 font-bold">手机：</span>{item.phone}</div>
      </div>
      <Image
        width={100}
        src={item.avatar}
      />
    </div>
  )
}