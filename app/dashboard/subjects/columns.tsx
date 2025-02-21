"use client"

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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
    cell: ({row}) => {
      return <Badge variant="outline" className='rounded-full bg-primary p-2 text-white font-light'>{row.getValue('schoolLevel')}</Badge>
    }
  },
  {
      accessorKey: "actions",
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {}}
              >
                Edit Subject
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete Subject</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    
  }
]
