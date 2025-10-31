"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Courses() {

    const fetchCourses = async () => {
        const result = await fetch(`http://localhost:4000/courses`);
        if (!result.ok) throw new Error("Network response was not ok");
        return result.json();
    };

    const { data  } = useQuery({
        queryKey: ["courses"],
        queryFn: fetchCourses,
    });



    return (
        <div className="bg-white rounded-2xl shadow-md p-6 min-w-[800px]">
            <div className="grid grid-cols-4 gap-4">
                {data && data.map((course: any) => (
                    <div
                        key={course.id}
                        className="rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.03]"
                    >
                        <img
                            src={course.image}
                            alt="Course"
                            className="w-20 h-20 rounded-full mb-3 object-cover"
                        />
                        <h4 className="font-semibold text-gray-800 text-lg">{course.title}</h4>
                        <p className="text-gray-500 text-sm mt-2 text-center">
                            {course.description}
                        </p>
                        <p className="text-gray-500 text-sm mt-2 text-center">
                            {course.author}
                        </p>
                        <Link href={`/course/${course.id}`}>     
                         <Button className="bg-blue-400 text-bold hover:bg-blue-600 items-center justify-center p-3 mt-8 text-white">View Course</Button>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
                <Button className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-600">
                    Previous
                </Button>
                <Button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800">
                    Next
                </Button>
            </div>
        </div>
    );
}
