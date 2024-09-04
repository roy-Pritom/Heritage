"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Menu,
  MoonIcon,
  Phone,
  Route,
  SunIcon,
  X,
} from "lucide-react";
import { getUserInfo } from "../Server/auth.service";
import { TUser } from "@/types";
import { Avatar, Button } from "@nextui-org/react";
import { logoutUser } from "../Server/logOutUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const user = getUserInfo() as TUser;
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router=useRouter();
  const handleLogout = () => {
    const toastId = toast.loading('processing...')
      try {
          logoutUser(router)
          toast.success("logout successfully",{id:toastId,duration:1000})
      }
      catch (error: any) {
          console.log(error?.message);
      }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${scrolling
        ? "bg-white dark:bg-slate-800 fixed w-full z-40"
        : "fixed w-full z-40 bg-white"
        }`}
    >
      <div className="container mx-auto py-3 flex justify-between items-center md:px-5 px-2">
        <div className="hidden md:block">
          <div className="flex items-center gap-3 ">
            <Link href={"/buy"} className="text-lg text-slate-800">
              Buy
            </Link>
            <Link href='/create-property'>
            <h1 className="text-lg text-slate-800">Sell</h1>
            </Link>
            <Link href='/about'>
            <h1 className="text-lg text-slate-800">About Us</h1>

            </Link>
          </div>
        </div>
        <div>
          <Link href='/'><h1 className="text-lg text-slate-800">Home</h1></Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href='/all-property'>
          <h1 className="text-lg text-slate-800">Properties</h1>
          </Link>
          <div className="">
          {
            user ?
            <div className="flex items-center gap-3">
            <Button onClick={handleLogout} className="border-none">Logout</Button>
            <Link href='/user-profile'>
            <Avatar/>
            </Link>
            </div>
              :
              <>
              <Link href={"/login"}>
                <button className="border-none">Sign In</button>
              </Link>
              </>
          }

          </div>
        </div>
        <button className="md:hidden text-slate-800" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden md:hidden"
      >
        <div className="flex flex-col items-center bg-white dark:bg-slate-800">
          <Link href="#" className="py-2 text-lg text-slate-800">
            Manage Rentals
          </Link>
          <button className="py-2 border-none text-lg text-slate-800">
            Sign In
          </button>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
