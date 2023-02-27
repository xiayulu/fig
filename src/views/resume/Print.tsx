import { Button } from "antd"
import Preview from "./Preview"
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
      <div className="flex w-800px mt-6 mb-4">
        <Button className="ml-auto"><Link to={`/resume`}>取消</Link></Button>
        <Button onClick={() => { print() }}>打印</Button>
      </div>
      <Preview />
    </div>
  )
}