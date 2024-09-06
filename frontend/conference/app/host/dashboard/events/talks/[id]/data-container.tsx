"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  MapPin,
  Clock,
  User,
  FileSpreadsheet,
  Send,
  Edit,
  Trash2,
  Users,
  UserPlus2,
  ShieldCheck,
} from "lucide-react";
import { apiClient } from "@/lib/api-service";
import { Talk } from "@/types/models/talk";
import { toast } from "sonner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { ScrollArea } from "@/app/components/ui/scrollarea";
import { Role } from "@/types/models/role";
import { Conference } from "@/types/models/conference";
import { CertificateFormDialog } from "@/app/components/features/generate-certificate";
import { DocumentIcon } from "@heroicons/react/24/outline";

const talkSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  location: z.string().min(1, "La ubicación es requerida"),
  startHour: z.string(),
  startEnd: z.string(),
  nameSpeaker: z.string().min(1, "El nombre del ponente es requerido"),
});

type TalkData = z.infer<typeof talkSchema> & {
  topicsID: number;
  conferenceID: number;
};

type User = {
  userID: number;
  name: string;
  lastname: string;
  email: string;
  rolID: number;
  roleName: string;
};

export function DataContainer({
  talkData,
  token,
  eventData,
  currentUserId,
}: {
  talkData: TalkData;
  token: string;
  eventData: Conference;
  currentUserId: number;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [speakerAndJuryUsers, setSpeakerAndJuryUsers] = useState<User[]>([]);

  // estados que manejan los usuarios.
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("all");

  // validacion para saber si es un admin
  const isAdmin = currentUserId === eventData.userID;

  const form = useForm<TalkData>({
    resolver: zodResolver(talkSchema),
    defaultValues: talkData,
  });

  const onSubmit = (data: TalkData) => {
    // Implement the edit functionality here
  };

  const handleDelete = async () => {
    try {
      const res = await apiClient.post(
        "/conference/deleteconferencetopics",
        {
          topicsID: talkData.topicsID,
        },
        {
          headers: {
            "Authorization-Token": token,
          },
        },
      );

      toast.success("Eliminado con éxito");
    } catch (err) {
      toast.error("Error al eliminar la charla");
    }
    setIsDeleteDialogOpen(false);
  };

  // obtiene los participantes de la charla (se filtra por rol)
  const getParticipants = async () => {
    try {
      const res = await apiClient.get(
        `conference/GetConferenceUsersDetails?conferenceID=${talkData.conferenceID}`,
        {
          headers: {
            "Authorization-Token": token,
          },
        },
      );

      const allUsersInEvent = res.data.userConference.filter(
        (item: any) => item.topicsID === talkData.topicsID,
      );

      setAllUsers(allUsersInEvent);
      setSpeakerAndJuryUsers(
        allUsersInEvent.filter(
          (user: User) => user.rolID === 2 || user.rolID === 3,
        ),
      );
    } catch (error) {
      toast.error("Error al obtener los participantes");
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  useEffect(() => {
    if (selectedRole === "all") {
      setFilteredUsers(allUsers);
    } else {
      setFilteredUsers(
        allUsers.filter((user) => user.roleName === selectedRole),
      );
    }
  }, [selectedRole, allUsers]);

  const handleConvertToJury = async (userId: number) => {
    try {
      const response = await apiClient.post(
        "/Conference/UpdateUserConferenceRole",
        {
          topicsID: talkData.topicsID,
          userID: userId,
          newRolID: Role.Jury,
        },
        {
          headers: {
            "Authorization-Token": token,
          },
        },
      );

      toast.success("Jurado asignado con éxito");
      getParticipants(); // Refresh the participants list
    } catch (error) {
      toast.error("Ocurrió un error al asignar jurado, intente de nuevo");
    }
  };

  async function sendCertificates() {
    try {
      const response = await apiClient.get(
        `/Certificate/GenerateCertificates/${currentUserId}/${talkData.topicsID}`,
        {
          headers: {
            "Authorization-Token": token,
          },
        },
      );

      toast.success("Diplomas enviados exitosamente");
      getParticipants();
    } catch (error) {
      toast.error("Ocurrió un error al enviar los diplomas, intente de nuevo");
    }
  }

  // traduce el role de usuario
  function translateRole(role: any): string {
    const translations = {
      Jury: "Jurado",
      Speaker: "Ponente",
      Attendee: "Participante",
      attendee: "Participante",
    };
    //@ts-ignore
    return translations[role] || role;
  }

  const renderUserList = () => (
    <ScrollArea className="h-[400px]">
      {filteredUsers.map((user) => (
        <div
          key={user.userID}
          className="flex items-center space-x-4 py-2 border-b last:border-b-0"
        >
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name} ${user.lastname}`}
            />
            <AvatarFallback>
              {user.name[0]}
              {user.lastname[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="font-medium">
              {user.name} {user.lastname}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge>{translateRole(user.roleName)}</Badge>
        </div>
      ))}
    </ScrollArea>
  );

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <Card>
        <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg" />
        <CardHeader className="-mt-16 pb-0">
          <div className="bg-background p-4 rounded-lg shadow-lg inline-block">
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              {talkData.name}
              {isAdmin && (
                <Badge variant="secondary" className="ml-2">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Administrador
                </Badge>
              )}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="jury">Jurado</TabsTrigger>
          <TabsTrigger value="participants">Participantes</TabsTrigger>
          <TabsTrigger value="actions">Acciones</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <CardDescription className="text-lg flex flex-col items-start">
                <p className="m-0 text-sm">Descripción</p>
                <p className="font-normal text-zinc-900">
                  {talkData.description}
                </p>
              </CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4">
                    <CardTitle className="text-xl font-semibold text-zinc-800">
                      Detalles del evento
                    </CardTitle>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-[auto,1fr] gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                          Ubicación
                        </h3>
                        <p className="text-base">{talkData.location}</p>
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                          Horario
                        </h3>
                        <p className="text-base">
                          {format(
                            new Date(talkData.startHour),
                            "dd/MM/yyyy HH:mm",
                          )}{" "}
                          - {format(new Date(talkData.startEnd), "HH:mm")}
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
                        <User className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                          Ponente
                        </h3>
                        <p className="text-base">{talkData.nameSpeaker}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4">
                    <CardTitle className="text-xl font-semibold text-amber-800">
                      Información adicional
                    </CardTitle>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                          ID de Tema
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-base px-3 py-1"
                        >
                          {talkData.topicsID}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                          ID de Conferencia
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-base px-3 py-1"
                        >
                          {talkData.conferenceID}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jury">
          <Card className="w-full h-[500px] max-h-[500px] max-w-6xl mx-auto shadow-md">
            <CardHeader className="border-b border-border/40 px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6" />
                Ponentes Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {speakerAndJuryUsers.length > 0 ? (
                <ScrollArea className="h-[400px] pr-4">
                  <ul className="space-y-4">
                    {speakerAndJuryUsers.map((user) => (
                      <li
                        key={user.userID}
                        className="flex items-center justify-between p-4 bg-muted/30 border border-border/40 rounded-lg shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="flex items-center gap-4 flex-grow">
                          <Avatar className="h-14 w-14">
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name} ${user.lastname}`}
                            />
                            <AvatarFallback>
                              {user.name[0]}
                              {user.lastname[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-grow">
                            <p className="font-semibold text-lg">
                              {user.name} {user.lastname}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {user.email}
                            </p>
                            <Badge
                              variant={
                                user.roleName === "Jury"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="mt-2 text-xs"
                            >
                              {translateRole(user.roleName)}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleConvertToJury(user.userID)}
                          disabled={user.roleName === "Jury" || !isAdmin}
                          variant={
                            user.roleName === "Jury" ? "secondary" : "outline"
                          }
                          size="lg"
                          className="ml-4 whitespace-nowrap"
                        >
                          {user.roleName === "Jury" ? (
                            "Ya es jurado"
                          ) : (
                            <>
                              <UserPlus2 className="mr-1 h-3 w-3" />
                              Convertir a jurado
                            </>
                          )}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              ) : (
                <p className="text-center text-muted-foreground">
                  No hay ponentes disponibles para ser jurados.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Participantes del Evento</span>
                <Select onValueChange={setSelectedRole} defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Speaker">Ponentes</SelectItem>
                    <SelectItem value="Jury">Jurados</SelectItem>
                    <SelectItem value="attendee">Oyentes</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>{renderUserList()}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="actions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Acciones
                {isAdmin && (
                  <Badge variant="outline" className="ml-2">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    Control total
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {isAdmin
                  ? "Como administrador, tienes control total sobre esta charla."
                  : "Acciones disponibles para esta charla."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Gestión de Charla</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={!isAdmin}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Charla</DialogTitle>
                        <DialogDescription>
                          Modifica los detalles de la charla aquí.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                  <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ubicación</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="startHour"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hora de inicio</FormLabel>
                                <FormControl>
                                  <Input {...field} type="datetime-local" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="startEnd"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hora de finalización</FormLabel>
                                <FormControl>
                                  <Input {...field} type="datetime-local" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="nameSpeaker"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre del ponente</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit">Guardar cambios</Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-full"
                        disabled={!isAdmin}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmar eliminación</DialogTitle>
                        <DialogDescription>
                          ¿Estás seguro de que quieres eliminar esta charla?
                          Esta acción no se puede deshacer.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsDeleteDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          Eliminar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Evaluación</h3>
                <Link
                  href={`/host/dashboard/events/rubrica?conferenceId=${talkData.conferenceID}&talkId=${talkData.topicsID}`}
                >
                  <Button size="lg" className="w-full" disabled={!isAdmin}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Asignar rúbrica
                  </Button>
                </Link>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Certificados</h3>
                <div className="grid grid-cols-1 gap-2">
                  <CertificateFormDialog
                    token={token}
                    userId={currentUserId}
                    topicId={talkData.topicsID}
                    institutionName={eventData.institution_name}
                  />

                  <Button
                    size="lg"
                    className="w-full"
                    variant={"outline"}
                    onClick={sendCertificates}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar certificados a ponentes
                  </Button>
                </div>
              </div>

              {!isAdmin && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Solo el administrador puede realizar estas acciones.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
