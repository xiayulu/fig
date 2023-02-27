import { Button, message, Steps } from "antd";
import SelectEmp from "./SelectEmp";
import SelectEdu from "./SelectEdu";
import SelectPro from "./SelectPro";
import { Link } from "react-router-dom";
import { Employee } from "../employee/types";
import { Edu } from "../edu/types";
import { Project } from "../project/types";
import Preview from "./Preview";


export default function () {
  const [current, setCurrent] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const steps = [
    {
      title: '选择求职者',
      content: <SelectEmp />,
    },
    {
      title: '选择教育经历',
      content: <SelectEdu />,
    },
    {
      title: '选择项目经历',
      content: <SelectPro />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <div>
      {contextHolder}
      <Steps current={current} items={items} />
      <div className="my-4">
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => {
            setCurrent(current - 1);
          }}>
            上一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" danger><Link to={`/print`}>打印简历</Link></Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => {
            setCurrent(current + 1);
          }}>
            下一步
          </Button>
        )}
      </div>
      <div className="my-4">{steps[current].content}</div>

      <Preview />
    </div>
  )
}