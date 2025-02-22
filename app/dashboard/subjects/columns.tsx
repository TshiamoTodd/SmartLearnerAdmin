"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import DeleteDialog from "@/components/DeleteDialog"
import { redirect } from "next/navigation"

// Define the Subject type
export type Subject = {
  id: string
  subjectName: number
  gradeRange: string
  schoolLevel: string
}

export const columns: ColumnDef<Subject>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "subjectName",
    header: "Subject",
  },
  {
    accessorKey: "gradeRange",
    header: "Grade Range",
  },
  {
    accessorKey: "schoolLevel",
    header: "School Level",
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="rounded-full bg-primary p-2 text-white font-light">
          {row.getValue("schoolLevel")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
      const subject = row.getValue("subjectName") as string
      const id = row.getValue("id") as string

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {redirect(`/dashboard/subjects/${id}`)}}>Edit Subject</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation() // Prevent the dropdown from closing immediately
                  setIsDeleteDialogOpen(true)
                }}
              >
                <DeleteDialog 
                  title="Delete Subject"
                  subject={subject}
                  id={id}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Render DeleteDialog outside the DropdownMenu */}
        </>
      )
    },
  },
]
