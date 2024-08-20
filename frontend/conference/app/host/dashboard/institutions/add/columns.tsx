"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export interface InstitutionDetails {
  institutionID: number;
  name: string;
  website: string;
  contact_phone: string;
  rolID: number;
  description: string;
  image_url: string;
  image_name: string;
  image: string;
}

export const columns: ColumnDef<InstitutionDetails>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "contact_phone",
    header: "Telefono",
  },
];
