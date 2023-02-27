import { Project } from "./types"
import dayjs from "dayjs";

export interface Props {
  item: Project,
}

export default function ({ item }: Props) {
  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <strong>{dayjs(item.from).format("YYYY-MM")}~{dayjs(item.to).format("YYYY-MM")}</strong>
        <strong>{item.name}</strong>
        <strong>{item.role}</strong>
      </div>
      <ul className="py-2 list-disc list-inside">
        {item.details.map((detail, idx) => {
          return <li key={idx} className="my-2">{detail}</li>
        })}
      </ul>
    </div>
  )
}