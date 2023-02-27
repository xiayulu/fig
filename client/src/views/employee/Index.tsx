import Edit from "./Edit";
import List from "./List";
import { Employee } from "./types";

export default function () {
  const [isEditOpen, setEditOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee>();
  return (
    <div>
      <Edit
        employee={editEmployee}
        open={isEditOpen}
        setEditEmployee={setEditEmployee}
        setEditOpen={setEditOpen}
      />
      <List
        setEditOpen={setEditOpen}
        setEditEmployee={setEditEmployee}
      />
    </div>
  )
}