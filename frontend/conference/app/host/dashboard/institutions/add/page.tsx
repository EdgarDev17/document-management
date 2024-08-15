"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { DataTable } from "./data-table";
import { columns, InstitutionDetails } from "./columns";
import axios from "axios";
import { useEffect, useState } from "react";

//
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState<InstitutionDetails[] | null>(
    null,
  );

  useEffect(() => {
    axios("http://localhost:5110/api/User/Institutions", {
      headers: {
        "Authorization-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiWTdLbVNCeTAxaFBPejQzRkhCVUVYQXpRR1dSS3pScWk1RFE2QSs5Z1pvaz0iLCJjb21wbGV0ZVByb2ZpbGUiOnRydWUsImNvdW50cnlJRCI6MSwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA4LTE0VDEwOjI1OjA5LjY2NzIwNDgtMDY6MDAiLCJzdGF0ZSI6dHJ1ZX0.VzOMkwfOYWkzFiKE_uB5AkYxYGp0a2wgGldNJoJ1b9I",
      },
    })
      .then((response) => {
        console.log(response.data);
        setInstitutions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={"flex flex-col gap-y-16"}>
      <div>
        <Card className={"max-w-[400px]"}>
          <CardHeader className={"bg-tertiary"}>
            <CardTitle className={"text-white font-bold"}>
              Instituciones creadas
            </CardTitle>
          </CardHeader>
          <CardContent className={"py-6 flex justify-center"}>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <p className={"text-4xl font-bold"}>{institutions?.length}</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <DataTable
            columns={columns}
            data={institutions ? institutions : []}
          />
        )}
      </div>
    </div>
  );
}
