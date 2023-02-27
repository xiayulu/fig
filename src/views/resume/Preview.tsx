import { useAppSelector } from "@/store"
import EmpItem from "../employee/ListItem";
import EduItem from "../edu/ListItem";
import ProItem from "../project/ListItem";

export interface SectionProps {
  name: string
  children?: React.ReactNode
}

function Section({ name, children }: SectionProps) {
  return (
    <div className="border-t-3 border-l-3 border-solid relative px-4 py-6">
      <h3 className="absolute -top-4 -left-4 rounded-3xl  bg-gray-300 py-2 px-6">{name}</h3>
      {children}
    </div>
  )
}

export default function () {
  const { emp, edus, pro } = useAppSelector(state => state.resume)

  return (
    <div className="w-800px px-8 py-12 shadow-md">
      {emp &&
        <Section name="基本信息">
          {<EmpItem item={emp} />}
        </Section>}
      <div>
        {edus.length > 0 &&
          <Section name="教育背景">
            {edus.map(item => {
              return <div key={item._id}>
                <EduItem item={item} />
              </div>
            })}
          </Section>}
      </div>
      <div>
        {pro.length > 0 &&
          <Section name="项目经历">
            {pro.map(item => {
              return <div key={item._id}>
                <ProItem item={item} />
              </div>
            })}
          </Section>}
      </div>
    </div>
  )
}

