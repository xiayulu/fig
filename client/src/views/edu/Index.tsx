import Edit from "./Edit";
import List from "./List";
import { Edu } from "./types";

export default function () {
  const [isEditOpen, setEditOpen] = useState(false);
  const [editEdu, setEditEdu] = useState<Edu>();
  return (
    <div>
      <Edit
        edu={editEdu}
        open={isEditOpen}
        setEditEdu={setEditEdu}
        setEditOpen={setEditOpen}
      />
      <List
        setEditOpen={setEditOpen}
        setEditEdu={setEditEdu}
      />
    </div>
  )
}