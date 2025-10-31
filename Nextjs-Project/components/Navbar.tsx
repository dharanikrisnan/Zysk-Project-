"use client"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GraduationCap } from "lucide-react"



export default function Navbar() {
    const handleLogin = () => {
  window.location.href = "/sign-in";
};

    return (
        <div className="flex w-full justify-center bg-gray-100 p-4">
            <div className="flex items-center bg-purple-300 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden max-w-5xl w-full h-16 px-6">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
                    <GraduationCap className="w-6 h-6" />
                    EduLearn
                </div>

                <div className="relative w-64 ml-20">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
                    <Input
                        type="text"
                        placeholder="Search courses..."
                        className="pl-10 pr-4 bg-white text-black-500"
                    />
                </div>

                <Menubar className="flex gap-4 ml-6">
                    <MenubarMenu>
                        <MenubarTrigger className="text-black font-semibold">Explore</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem asChild>
                                <Link href="/course">All Courses</Link>
                            </MenubarItem>
                            <MenubarItem>New Releases</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="text-black font-semibold">Courses</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem asChild>
                                <Link href="/webdevelopment">Web Development</Link>
                            </MenubarItem>
                            <MenubarItem>Data Science</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>

                <div className="ml-auto flex gap-2">
                    <Button className="bg-white border-2 border-purple-500 text-purple-900 hover:bg-purple-500 hover:text-white " onClick={handleLogin}>
                        Login
                    </Button>
                    <Button className="bg-white border-2 border-purple-500 text-purple-900 hover:bg-purple-500 hover:text-white">
                        Sign-Up
                    </Button>
                </div>

            </div>
        </div>
    )
}
