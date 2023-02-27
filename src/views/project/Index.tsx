import Edit from "./Edit";
import List from "./List";
import { Project } from "./types";

export default function () {
  const [isEditOpen, setEditOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project>();
  return (
    <div>
      <Edit
        project={editProject}
        open={isEditOpen}
        setEditProject={setEditProject}
        setEditOpen={setEditOpen}
      />
      <List
        setEditOpen={setEditOpen}
        setEditProject={setEditProject}
      />
    </div>
  )
}