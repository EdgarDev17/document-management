"use client";

import React, { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-service";
import { CardContent, Card, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { InstitutionDetails } from "@/app/host/dashboard/institutions/add/columns";

const MAX_DESCRIPTION_LENGTH = 240;

export default function EditForm({ id, token }: { id: string; token: string }) {
  const [institution, setInstitution] =
    React.useState<InstitutionDetails | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [descriptionLength, setDescriptionLength] = React.useState<number>(0);
  const router = useRouter();
  const [imageBase64, setImageBase64] = useState("");

  const headers = {
    "Authorization-Token": token,
  };

  React.useEffect(() => {
    apiClient
      .get(`/institutions/${id}`, { headers })
      .then((res) => {
        setInstitution(res.data);
        setDescriptionLength(res.data.description.length);
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "description") {
      if (value.length <= MAX_DESCRIPTION_LENGTH) {
        setInstitution((prev) => (prev ? { ...prev, [name]: value } : null));
        setDescriptionLength(value.length);
      }
    } else if (name === "image") {
      const fileInput = e.target as HTMLInputElement; // Hacemos un type assertion

      if (fileInput.files && fileInput.files[0]) {
        // Convertimos la imagen seleccionada a base64
        convertToBase64(fileInput.files[0], (base64: string) => {
          setImageBase64(base64);
          if (institution) {
            setInstitution({ ...institution, image: base64 });
          }
        });
      }
    } else {
      setInstitution((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const convertToBase64 = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.replace(/^data:image\/\w+;base64,/, "");

      callback(base64);
      // callback(reader.result as string);
    };
    reader.onerror = (error) => {};
  };

  const handleSave = () => {
    if (!institution) return;

    const fieldsToCheck = [
      "name",
      "website",
      "contact_phone",
      "description",
      "image",
    ];

    const allFieldsFilled = fieldsToCheck.every((field) => {
      const value = institution[field as keyof InstitutionDetails];
      return value !== null && value !== undefined && value !== "";
    });

    if (allFieldsFilled) {
      if (institution.institutionID == id) {
        apiClient
          .put("/Institutions/update", institution, { headers })
          .then((res) => {
            toast.success("Actualizado exitosamente");
            setInterval(() => {
              router.push("/host/dashboard/institutions/");
            }, 1000);
          })
          .catch((err) => {});
      }
    } else {
    }
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (!institution) {
    return <div>Error...</div>;
  }

  return (
    <div className={"w-full h-full flex flex-col justify-center items-center"}>
      <Card className={"w-[900px] h-[650px] relative"}>
        <CardHeader
          className={
            "w-full h-[25%] bg-tertiary flex flex-row justify-start items-center"
          }
        >
          <Input
            className={"w-1/2 bg-blue-50 border border-blue-50 py-6"}
            name="name"
            value={institution.name}
            onChange={handleInputChange}
          />
        </CardHeader>
        <div className="absolute right-16 top-[25%] -translate-y-1/2">
          <img
            src={
              institution.image
                ? `data:image/jpeg;base64,${institution.image}`
                : "/pfp_i.png"
            }
            alt="Descripción de la imagen"
            className="w-56 h-56 rounded-full object-cover"
          />
        </div>

        <Label htmlFor={"image"}>
          <PencilSquareIcon
            className={
              "w-16 h-16 absolute right-16 top-[14%] text-zinc-600 bg-zinc-200 p-3 rounded-full -translate-y-1/2 z-50 cursor-pointer"
            }
          />

          <Input
            name={"image"}
            id={"image"}
            className={"hidden"}
            type={"file"}
            onChange={handleInputChange}
          />
        </Label>

        <CardContent className={"w-full py-6 h-[75%]"}>
          <div className={"space-y-6"}>
            <Label htmlFor={"website"}>Website</Label>
            <Input
              id={"website"}
              name="website"
              className={"w-1/2 bg-white border border-zinc-100 shadow py-6"}
              value={institution.website}
              onChange={handleInputChange}
            />
            <Label htmlFor={"contact_phone"}>Telefono</Label>
            <Input
              id={"contact_phone"}
              name="contact_phone"
              className={"w-1/2 bg-white border border-zinc-100 shadow py-6"}
              value={institution.contact_phone}
              onChange={handleInputChange}
            />
          </div>
          <div className={"py-8"}>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Descripción</Label>
              <Textarea
                className={cn("resize-none h-[140px]", {
                  "border-yellow-600 border-2 outline-none focus:outline-none focus-visible:ring-0":
                    descriptionLength == MAX_DESCRIPTION_LENGTH,
                })}
                id="message"
                name="description"
                value={institution.description}
                onChange={handleInputChange}
                maxLength={MAX_DESCRIPTION_LENGTH}
              />
              <div
                className={cn("text-sm text-gray-500 text-right", {
                  "font-semibold text-yellow-600":
                    descriptionLength == MAX_DESCRIPTION_LENGTH,
                })}
              >
                {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className={"w-[900px] py-6 flex gap-x-4"}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"outline"}>Cancelar</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Deseas Cancelar?</AlertDialogTitle>
              <AlertDialogDescription>
                Si cancelas, los nuevos datos no serán actualizados, se
                mantendran los datos anteriores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Seguir editando</AlertDialogCancel>
              <AlertDialogAction
                className={"bg-destructive text-red-50 hover:bg-red-600"}
                onClick={() => router.push("/host/dashboard/institutions")}
              >
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button onClick={handleSave}>Guardar</Button>
      </div>
    </div>
  );
}
