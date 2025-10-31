"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [showInput, setShowInput] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setComments([...comments, inputValue]);
    setInputValue("");
    setShowInput(false);
  };

  const handleDelete = (index: number) => {
    const updated = comments.filter((_, i) => i !== index);
    setComments(updated);
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditValue(comments[index]);
  };

  const handleSaveEdit = () => {
    if (!editValue.trim() || editIndex === null) return;
    const updated = [...comments];
    updated[editIndex] = editValue;
    setComments(updated);
    setEditIndex(null);
    setEditValue("");
  };

  const filteredComments = comments.filter((comment) =>
    comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex flex-col gap-3 p-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Track your Tasks</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Task Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="relative w-full max-w-sm mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full shadow-md hover:scale-110 transition-transform"
                onClick={() => setShowInput(true)}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>

            {showInput && (
              <div className="bg-white border rounded-xl p-2 flex flex-col gap-2 shadow-md aspect-video">
                <textarea
                  placeholder="Add your comment..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="resize-none border rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Button
                  className="self-end"
                  variant="default"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            )}

            {filteredComments.map((comment, index) => (
              <div
                key={index}
                className="bg-blue-200 border rounded-xl p-10 shadow-md aspect-video relative flex flex-col font-semibold text-base"
              >
                {editIndex === index ? (
                  <>
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="resize-none border rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <Button
                      className="self-end mt-2 bg-green-300 hover:bg-green-500"
                      variant="default"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <span>{comment}</span>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full shadow-md hover:scale-110 hover:bg-green-400 transition-transform bg-green-200 border border-green-900"
                        onClick={() => handleEditClick(index)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full shadow-md hover:scale-110 hover:bg-red-400 transition-transform bg-red-200 border border-red-900"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
