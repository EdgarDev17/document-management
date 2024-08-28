import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";
import { LockIcon } from "lucide-react";
import Link from "next/link";

function NoAuth() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <LockIcon className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-extrabold text-primary">
          Acceso Restringido
        </h2>
        <p className="text-lg font-medium text-muted-foreground">
          Función exclusiva para usuarios registrados
        </p>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          Para disfrutar de todas las funciones de nuestro sitio, necesitas
          tener una cuenta activa.
        </p>
        <p className="text-sm font-medium">
          Si ya tienes una cuenta, inicia sesión para continuar.
        </p>
        <p className="text-sm font-medium">
          ¿Eres nuevo? Crea una cuenta gratis y accede a todas nuestras
          funciones.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Link href={"/"}>
          <Button className="w-full" size="lg">
            Iniciar Sesión
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="w-full" size="lg">
            Crear Cuenta
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export { NoAuth };
