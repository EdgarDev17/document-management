"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Link from "next/link";
import { InstitutionDetails } from "@/app/host/dashboard/institutions/add/columns";
import axios from "axios";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { urlInstitutions } from "@/lib/endpoints";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState<InstitutionDetails[] | null>(
    null,
  );

  useEffect(() => {
    console.log(urlInstitutions)
    axios(urlInstitutions, {
      headers: {
        "Authorization-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiWTdLbVNCeTAxaFBPejQzRkhCVUVYQXpRR1dSS3pScWk1RFE2QSs5Z1pvaz0iLCJjb21wbGV0ZVByb2ZpbGUiOnRydWUsImNvdW50cnlJRCI6MSwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA4LTE0VDEwOjI1OjA5LjY2NzIwNDgtMDY6MDAiLCJzdGF0ZSI6dHJ1ZX0.VzOMkwfOYWkzFiKE_uB5AkYxYGp0a2wgGldNJoJ1b9I",
      },
    })
      .then((response) => {
        console.log(response);
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

  useEffect(() => {
    console.log(institutions);
  }, [institutions]);

  return (
    <div className={"w-11/12 mx-auto flex flex-col gap-y-6"}>
      <div className={"w-full flex justify-end items-center"}>
        <Link href={"/host/dashboard/institutions/add"}>
          <Button variant={"default"}>Crear</Button>
        </Link>
      </div>
      <ScrollArea className="w-full h-[70vh] rounded-md border border-none">
        <div className={"grid grid-cols-3 grid-rows-2 gap-y-6"}>
          {loading ? (
            <p>cargando datos...</p>
          ) : (
            <>
              {institutions?.map((institution) => {
                return (
                  <Card
                    className="w-80 relative"
                    key={institution.institutionID}
                  >
                    <div className="absolute right-4 top-1/4 -translate-y-1/2">
                      <img
                        src="/pfp_i.png"
                        alt="Descripción de la imagen"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                    <CardHeader className="bg-tertiary rounded-t-lg pt-4 h-32">
                      <CardTitle className="text-lg text-white">
                        {institution.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center h-40 py-6">
                      <p className="text-sm">{institution.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button size="sm">Editar</Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
