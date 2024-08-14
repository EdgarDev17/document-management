"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { useEffect, useState } from "react";
import { Conference } from "@/app/host/dashboard/events/columns";

//
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [conferences, setConferences] = useState<Conference>(null);

  useEffect(() => {
    axios("http://localhost:5110/api/Conference/ConferencesDetailsByUser", {
      headers: {
        "Authorization-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiWTdLbVNCeTAxaFBPejQzRkhCVUVYQXpRR1dSS3pScWk1RFE2QSs5Z1pvaz0iLCJjb21wbGV0ZVByb2ZpbGUiOnRydWUsImNvdW50cnlJRCI6MSwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA4LTE0VDEwOjI1OjA5LjY2NzIwNDgtMDY6MDAiLCJzdGF0ZSI6dHJ1ZX0.VzOMkwfOYWkzFiKE_uB5AkYxYGp0a2wgGldNJoJ1b9I",
      },
    })
      .then((response) => {
        setConferences(response.data.conference);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div>
        <Card className={"max-w-[400px]"}>
          <CardHeader className={"bg-tertiary"}>
            <CardTitle className={"text-white font-bold"}>
              Instituciones creadas
            </CardTitle>
          </CardHeader>
          <CardContent className={"py-6 flex justify-center"}>
            <p className={"text-4xl font-bold"}>10</p>
          </CardContent>
        </Card>
      </div>
      <div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          // <DataTable columns={columns} data={conferences} />
          <p>x</p>
        )}
      </div>
    </div>
  );
}
