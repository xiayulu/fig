import { Edu } from "./types"
import dayjs from "dayjs";

export interface Props {
  item: Edu,
}

export default function ({ item }: Props) {
  return (
    <div>
      <div className="flex justify-between py-4">
        <strong>{dayjs(item.from).format("YYYY-MM")}~{dayjs(item.to).format("YYYY-MM")}</strong>
        <strong>{item.school}</strong>
        <strong>{item.subject}</strong>
      </div>
      <div className="py-2">
        <strong>主修成绩：</strong>{item.score}
      </div>
      <div className="py-2">
        <strong>主修课程：</strong>{item.course}
      </div>
    </div>
  )
}