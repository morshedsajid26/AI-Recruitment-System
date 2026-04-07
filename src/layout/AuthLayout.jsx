import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen  bg-[#F9F9F9]">

      <div className="bg-white w-full h-[100px]">
        
      </div>
     
      <div className=" flex items-center justify-center   py-20">
        <Outlet />
      </div>

      
     
    </div>
  );
}
