import { Button } from "@/components/ui/button";


export default async function CourseDetails({ params }: { params: { courseId: string } }) {

    const { courseId } = params;
    const response = await fetch(`http://localhost:4000/courses/${courseId}`)
    if (!response.ok) {
        throw new Error(`course not found in this page:${courseId}`)
    }
    const course = await response.json();

   

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 min-w-[800px]">
            <div className="grid grid-cols-4 gap-4">
                <div className="rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.03]"
                >
                    <img
                        src={course.image}
                        alt="Course"
                        className="w-20 h-20 rounded-full mb-3 object-cover"
                    />
                    <h4 className="font-semibold text-gray-800 text-lg">{course.title}</h4>
                    <p className="text-gray-500 text-sm mt-2 text-center">{course.description}

                    </p>
                    <p className="text-gray-500 text-sm mt-2 text-center">{course.author}
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-800 text-white mt-4">
                        Enroll Now 
                    </Button>
                </div>
            </div>
        </div>
    );
}
