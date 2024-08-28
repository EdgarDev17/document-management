"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Input } from "@headlessui/react";
import { Button } from "@/app/components/ui/button";
import axios from "axios";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const submitNewInstitution = async () => {
    axios
      .post("/user", {
        firstName: "Fred",
        lastName: "Flintstone",
      })
      .then(function (response) {})
      .catch(function (error) {});
  };

  return (
    <div className="rounded-md border">
      <Table className={"w-full"}>
        <TableHeader className={"bg-tertiary text-white"}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className={"text-white"}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className={"bg-white w-full"}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
/*

esto es para agregar inputs al incio de la tabla
<TableRow>
  <TableCell>
    <Input
      className="bg-white w-full border border-zinc-300 shadow rounded-lg h-14 p-2"
      placeholder="Nombre conferencia"
    />
  </TableCell>
  <TableCell>
    <Input
      className="bg-white w-full border border-zinc-300 shadow rounded-lg h-14 p-2"
      placeholder="Website conferencia"
    />
  </TableCell>
  <TableCell>
    <Input
      className="bg-white w-full border border-zinc-300 shadow rounded-lg h-14 p-2"
      placeholder="Telefono conferencia"
    />
  </TableCell>
  <TableCell>
   <Button>Crear</Button>
  </TableCell>
</TableRow>
*/
