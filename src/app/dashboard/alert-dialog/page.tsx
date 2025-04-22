"use client";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function Page() {
  // manejar el dialog por un estado
  const [stateDialogOpen, setStateDialogOpen] = useState<boolean>(false);

  return (
    <>
      {/*
        // para manejarlo normalmente
       <AlertDialog> 
       */}
      <AlertDialog open={stateDialogOpen} onOpenChange={setStateDialogOpen}>
        {/* asChild permite que el componente de ShadCN use el elemento hijo como su tag HTML raíz. */}
        {/* en este ejemplo AlertDialogTrigger hereda sus clases y atributos a Button. es como decir que en lugar de que se muestre
        el alert trigger, se muestre el Button */}
        <AlertDialogTrigger asChild>
          <Button className="w-fit">
            <Mail /> Abrir
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Que onda</AlertDialogTitle>
            <AlertDialogDescription>
              Este deberíá ser el contenido de la alerta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => console.log("Cancelar")}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => console.log("Cerrar")}>
              Cerrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button className="w-fit" onClick={() => setStateDialogOpen(true)}>
        Abrir dialog manualmente
      </Button>
    </>
  );
}
