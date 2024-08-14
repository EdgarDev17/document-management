"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface Conference {
  conferenceID: number;
  conference_name: string;
  conference_type: string;
  description: string;
  conference_RegDate: string; // Consider using Date if you handle dates properly
  beggingDate: string; // Consider using Date if you handle dates properly
  finishDate: string; // Consider using Date if you handle dates properly
  documentAttempt: number;
  institutionID: number;
  status: number;
  institution_name: string;
  institution_website: string;
  institution_contact_phone: string;
  rolID: number;
}

export const columns: ColumnDef<Conference>[] = [
  {
    accessorKey: "conference_name",
    header: "Nombre",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
  },
];
