"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Challenge } from "@/app/challenges/type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteChallenge } from "./actions";
import { useToast } from "@/hooks/use-toast"
import { Pencil, Trash2 } from "lucide-react";

export const columns: ColumnDef<Challenge>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString();
    },
  },
  { 
    accessorKey: "",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const challenge = row.original;
      const { toast } = useToast();

      const handleDelete = async () => {
        try {
          await deleteChallenge(challenge.id);
          toast({
            title: "Success",
            description: "Challenge deleted successfully",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to delete challenge",
            variant: "destructive",
          });
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Link href={`/challengeForm?id=${challenge.id}`}>
            <Button variant="outline" size="sm" className="flex items-center">
              <Pencil className="h-4 w-4 mr-1" />
            
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleDelete}
            className="flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            
          </Button>
        </div>
      );
    },
  },
];