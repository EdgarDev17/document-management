"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Calendar,
  Users,
  BarChart,
  FileText,
  Star,
  Search,
  Clock,
  User,
} from "lucide-react";
import { useEffect } from "react";

const MotionCard = motion(Card);
const MotionImage = motion(Image);

const AnimatedGradient = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{
        background: "linear-gradient(45deg, #ff00cc, #3333ff, #00ccff)",
        backgroundSize: "400% 400%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  );
};

const AnimatedBorder = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      boxShadow: [
        "0 0 0 2px rgba(255, 255, 255, 0)",
        "0 0 0 2px rgba(255, 255, 255, 1)",
        "0 0 0 2px rgba(255, 255, 255, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <motion.div className="rounded-lg overflow-hidden" animate={controls}>
      {children}
    </motion.div>
  );
};

export default function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const pulse = {
    scale: [1, 1.01, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <AnimatedGradient />
          <div className="px-4 md:px-6 relative z-10 flex justify-center">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Gestiona tus eventos con EventMaster
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  La plataforma todo en uno para crear, gestionar y descubrir
                  eventos. Perfecta para organizadores y asistentes.
                </p>
              </div>
              <motion.div
                className="space-x-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={"/account/login?rol=admin"}>
                  <Button size="lg" variant="secondary">
                    <User className="mr-2 h-4 w-4" /> Soy organizador
                  </Button>
                </Link>
                <Link href={"/account/login?rol=general"}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white text-purple-500 hover:bg-purple-100"
                  >
                    <Search className="mr-2 h-4 w-4" /> Explorar eventos
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Para Organizadores
            </motion.h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <AnimatedBorder>
                <MotionCard {...fadeInUp}>
                  <CardHeader>
                    <Calendar className="h-6 w-6 mb-2" />
                    <CardTitle>Crea Eventos</CardTitle>
                    <CardDescription>
                      Diseña y personaliza tus eventos con facilidad.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MotionImage
                      src="/host-1.png"
                      alt="Crear eventos"
                      width={400}
                      height={200}
                      className="rounded-lg w-full"
                      animate={pulse}
                    />
                  </CardContent>
                </MotionCard>
              </AnimatedBorder>
              <AnimatedBorder>
                <MotionCard {...fadeInUp}>
                  <CardHeader>
                    <Users className="h-6 w-6 mb-2" />
                    <CardTitle>Asigna Charlas</CardTitle>
                    <CardDescription>
                      Organiza ponentes y sesiones de manera eficiente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MotionImage
                      src="/host-2.png"
                      alt="Crear eventos"
                      width={400}
                      height={200}
                      className="rounded-lg w-full"
                      animate={pulse}
                    />
                  </CardContent>
                </MotionCard>
              </AnimatedBorder>
              <AnimatedBorder>
                <MotionCard {...fadeInUp}>
                  <CardHeader>
                    <BarChart className="h-6 w-6 mb-2" />
                    <CardTitle>Estadísticas</CardTitle>
                    <CardDescription>
                      Analiza el rendimiento de tus eventos en tiempo real.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MotionImage
                      src="/host-3.png"
                      alt="Crear eventos"
                      width={400}
                      height={200}
                      className="rounded-lg w-full"
                      animate={pulse}
                    />
                  </CardContent>
                </MotionCard>
              </AnimatedBorder>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Para Asistentes
            </motion.h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <AnimatedBorder>
                <MotionCard {...fadeInUp}>
                  <CardHeader>
                    <Search className="h-6 w-6 mb-2" />
                    <CardTitle>Marketplace de Eventos</CardTitle>
                    <CardDescription>
                      Descubre y únete a eventos interesantes fácilmente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MotionImage
                      src="/user-1.png"
                      alt="Marketplace de eventos"
                      width={400}
                      height={200}
                      className="rounded-lg"
                      animate={pulse}
                    />
                  </CardContent>
                </MotionCard>
              </AnimatedBorder>
              <AnimatedBorder>
                <MotionCard {...fadeInUp}>
                  <CardHeader>
                    <BarChart className="h-6 w-6 mb-2" />
                    <CardTitle>Estadísticas Personales</CardTitle>
                    <CardDescription>
                      Sigue tus eventos y charlas favoritas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MotionImage
                      src="/user-2.png"
                      alt="Estadísticas personales"
                      width={400}
                      height={200}
                      className="rounded-lg"
                      animate={pulse}
                    />
                  </CardContent>
                </MotionCard>
              </AnimatedBorder>
              <AnimatedBorder>
                <MotionCard {...fadeInUp}>
                  <CardHeader>
                    <Calendar className="h-6 w-6 mb-2" />
                    <CardTitle>Información Detallada</CardTitle>
                    <CardDescription>
                      Accede a toda la información relevante de cada evento.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MotionImage
                      src="/user-3.png"
                      alt="Información detallada de eventos"
                      width={400}
                      height={200}
                      className="rounded-lg"
                      animate={pulse}
                    />
                  </CardContent>
                </MotionCard>
              </AnimatedBorder>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ¿Por qué EventMaster?
            </motion.h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <AnimatedBorder>
                <MotionCard {...fadeInUp}>
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold">
                      Todo en un solo lugar
                    </CardTitle>
                    <CardDescription>
                      Gestiona todos tus eventos, rápido y fácil
                    </CardDescription>
                  </CardHeader>
                </MotionCard>
              </AnimatedBorder>
              <AnimatedBorder>
                <MotionCard {...fadeInUp}>
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold">
                      Analíticas para tu evento
                    </CardTitle>
                    <CardDescription>
                      Obten feedback de tus usuarios para mejorar tu evento
                    </CardDescription>
                  </CardHeader>
                </MotionCard>
              </AnimatedBorder>
              <AnimatedBorder>
                <MotionCard {...fadeInUp}>
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold">
                      Multiplataforma
                    </CardTitle>
                    <CardDescription>
                      Utilizalo desde cualquier navegador en movil o computadora
                    </CardDescription>
                  </CardHeader>
                </MotionCard>
              </AnimatedBorder>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden flex justify-center">
          <AnimatedGradient />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Comienza tu viaje con EventMaster hoy
                </h2>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Ya sea que estés organizando el próximo gran evento o buscando
                  experiencias únicas, EventMaster es tu plataforma.
                </p>
              </div>
              <motion.div
                className="space-x-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="secondary">
                  Registrarse gratis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-purple-500 hover:bg-purple-100"
                >
                  Saber más
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 EventMaster. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos de servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}
