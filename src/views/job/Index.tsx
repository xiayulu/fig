import Edit from "./Edit";
import List from "./List";
import { Job } from "./types";

export default function () {
  const [isEditOpen, setEditOpen] = useState(false);
  const [editJob, setEditJob] = useState<Job>();
  return (
    <div>
      <Edit
        job={editJob}
        open={isEditOpen}
        setEditJob={setEditJob}
        setEditOpen={setEditOpen}
      />
      <List
        setEditOpen={setEditOpen}
        setEditJob={setEditJob}
      />
    </div>
  )
}