"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlRegisterUsers } from "@/lib/endpoints";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { signOut } from "next-auth/react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Textarea } from "@/app/components/ui/textarea";
import { formatDate } from "@/lib/utils";

export default function Page() {
  const [base64String, setBase64String] = React.useState("");
  const [userProfile, setUserProfile] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("http://localhost:5110/api/User/UserPerfil", {
        headers: {
          "Authorization-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsImVtYWlsIjoiZWRnYXJkb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IktNVS91M0NDWmJuSWN5ek5acXJ4S0E9PSIsImNvbXBsZXRlUHJvZmlsZSI6dHJ1ZSwiY291bnRyeUlEIjoxLCJleHBpcmF0aW9uRGF0ZSI6IjIwMjQtMDgtMjhUMDk6MTc6MjAuMjUyNTU4MS0wNjowMCIsInN0YXRlIjp0cnVlfQ.PPqBWdRs0pdS4K8FLyNLgqUajS40JuwKGWKhFIu9xe4",
        },
      })
      .then((response) => {
        setBase64String(response.data.imagenBase);
        setUserProfile(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-muted rounded-t-lg p-6 flex justify-between items-center gap-4">
          <div className="flex items-center gap-x-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`data:image/jpeg;base64,${base64String}`}
                alt="@shadcn"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <h2 className="text-2xl font-bold">
                {userProfile.name} {userProfile.lastname}
              </h2>
              <p className="text-muted-foreground">Perfil de usuario</p>
            </div>
          </div>

          <Button onClick={() => signOut()}>Cerrar Sesión</Button>
        </div>
        <div className="grid gap-4 py-6">
          <Card>
            <CardHeader>
              <CardTitle>Nombre completo</CardTitle>
              <CardDescription>
                Este es el nombre que se mostrará en tu pefil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                disabled
                value={`${userProfile.name} ${userProfile.lastname}`}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>
                Este el correo asociado a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input type="email" value={userProfile.email} disabled />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>País </CardTitle>
              <CardDescription>Es tu pais de residencia</CardDescription>
            </CardHeader>
            <CardContent>
              <Input type="text" value={userProfile.countryName} disabled />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fecha de nacimiento </CardTitle>
              <CardDescription>No se puede editar</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                value={formatDate(userProfile.birthdate)}
                disabled
              />
            </CardContent>
          </Card>
        </div>
      </div>
      {/*<ImageUploader />*/}
    </div>
  );
}

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<Uint8Array | null>(null);
  const [imageExtension, setImageExtension] = useState<string>(".JPEG");

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.result) {
          const base64String = (fileReader.result as string).split(",")[1]; // Extrae solo la parte base64
          resolve(base64String);
        } else {
          reject(new Error("FileReader result is null"));
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const image = await convertToBase64(file);
      setImage(image as any);
    }
  };

  const handleSubmit = async () => {
    if (image) {
      try {
        const response = await axios.post(
          `${urlRegisterUsers}/Imagen`,
          {
            Image: image,
            ImageExtension: imageExtension,
          },
          {
            headers: {
              "Authorization-Token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiWTdLbVNCeTAxaFBPejQzRkhCVUVYQXpRR1dSS3pScWk1RFE2QSs5Z1pvaz0iLCJjb21wbGV0ZVByb2ZpbGUiOnRydWUsImNvdW50cnlJRCI6MSwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA4LTE0VDE0OjAxOjE3LjMyOTU5NDMtMDY6MDAiLCJzdGF0ZSI6dHJ1ZX0.mji7urX0kNp77s6-wMhFS6J36A0FqspqGcZy_hIDHXk",
            },
          },
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <Label htmlFor={"uploadimage"}>Cambiar Fotografia</Label>
      <Input
        id={"uploadimage"}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={"hidden"}
      />
      <button onClick={handleSubmit}>Aplicar camibios</button>
    </div>
  );
};
