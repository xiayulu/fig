import { createBrowserRouter } from "react-router-dom";
import Root from "@/views/root/Index";
import Employee from '@/views/employee/Index';
import Edu from '@/views/edu/Index';
import Project from "@/views/project/Index";
import Resume from "@/views/resume/Index";
import Job from '@/views/job/Index';
import Corp from "@/views/corp/Corp";
import Print from "@/views/resume/Print";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Employee />,
      },
      {
        path: "/edu",
        element: <Edu />,
      },
      {
        path: "/job",
        element: <Job />,
      },
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/resume",
        element: <Resume />,
      },
      {
        path: "/corp",
        element: <Corp />,
      },
    ],
  },
  {
    path: "/print",
    element: <Print />
  }
]);

export default router;