import { Outlet } from "react-router-dom";
import Aside from "@/views/root/Aside";
import Header from "./Header";

export default function () {
  return (
    <div>
      <Header></Header>
      <div className="flex">
        <aside className="flex-shrink-0">
          <Aside />
        </aside>
        <main className="p-4 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
