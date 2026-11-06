import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Header from "../ui/Header";

export default function MainLayout() {
  return (
    <div className="grid grid-cols-[4rem_1fr] grid-rows-[auto_1fr] lg:grid-cols-[15rem_1fr] lg:grid-rows-[auto_1fr] h-screen">
      <div className="row-span-2 border-gray-200 border-r">
        <Sidebar />
      </div>

      <div className="w-full border-gray-200 border-b">
        <Header />
      </div>
      <main className="w-full overflow-y-auto p-5 lg:p-10 text-sm md:text-base bg-[whitesmoke]">
        <Outlet />
      </main>
    </div>
  );
}
