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

function InstitutionContinaer({ token }: { token: string }) {
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState<InstitutionDetails[] | null>(
    null,
  );

  useEffect(() => {
    axios("http://localhost:5110/api/Institutions", {
      headers: {
        "Authorization-Token": token,
      },
    })
      .then((response) => {
        setInstitutions(response.data);
        setLoading(false);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
                    <div className="absolute right-4 top-[34%] -translate-y-1/2">
                      <img
                        src={
                          !institution.image
                            ? "/pfp_i.png"
                            : `data:image/jpeg;base64,${institution.image}`
                        }
                        alt="Descripción de la imagen"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                    <CardHeader className="bg-tertiary rounded-t-lg pt-4 h-32">
                      <CardTitle className="text-lg text-white">
                        {institution.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-start h-40 py-6">
                      <p className="text-sm">
                        {institution.description.length > 100
                          ? `${institution.description.substring(0, 100)}...`
                          : institution.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button size="sm" variant={"outline"} asChild>
                        <Link
                          href={`institutions/edit/${institution.institutionID}`}
                        >
                          Editar
                        </Link>
                      </Button>
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
export { InstitutionContinaer };
