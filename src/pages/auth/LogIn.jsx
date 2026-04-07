import React, { useState } from "react";
import InputField from "../../components/InputField";
import Password from "../../components/Password";
import Image from "../../components/Image";
import { MdLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LogIn = () => {
  const [role, setRole] = useState("Owner");
  const [loading, setLoading] = useState(false);

  const roleText = {
    Admin: {
      title: "Farm Admin",
      subtitle: "Access your farm management dashboard",
      redirect: "/admin/home",
    },
    Owner: {
      title: "System Owner",
      subtitle: "Secure access to farm management platform",
      redirect: "/",
    },
  };

  const handleLogin = () => {
    //  Save role
    localStorage.setItem("userRole", role);
    localStorage.setItem("isLoggedIn", "true");

    toast.success("Logged in successfully!");

    //  Redirect
    setTimeout(() => {
      window.location.href = roleText[role].redirect;
    }, 1000);
  };

  return (
    <main className="bg-white grid justify-center items-center py-15 md:px-11 px-15 rounded-3xl border border-[#E5E7EB] shadow-lg">
      <div>
        <Toaster position="top-center" />
      </div>
      <form className="gap-5 flex flex-col items-center md:w-[450px] w-full">
        <h3 className="text-[#2D468A] font-semibold text-4xl">Edukai</h3>

        <h3 className="text-[32px] text-[#2D468A] font-medium">
          Login to Account
        </h3>

        <p className="text-[#333333]">
          Please enter your email and password to continue
        </p>

        <InputField
          type="email"
          label="Email Address"
          inputClass="rounded-lg border border-[#2D468A]"
        />
        <Password
          label="Password"
          inputClass="rounded-lg border border-[#2D468A]"
        />

        {/* Forgot password */}
        <Link
          to="/auth/reset/password"
          className="text-[#2D468A] self-end text-sm"
        >
          Forgot Password?
        </Link>

        {/* LOGIN */}
        <button
          type="button"
          onClick={handleLogin}
          className="bg-[#2D468A] text-white w-full py-3 rounded-lg mt-6 flex items-center justify-center gap-2 cursor-pointer"
        >
          <MdLogin />
          Sign in
        </button>
      </form>
    </main>
  );
};

export default LogIn;
