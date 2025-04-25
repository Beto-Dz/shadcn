"use client";
import { Button } from "@/components/ui/button";
import { Pokeapi, Result } from "@/types/pokeapi";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [number, setNumber] = useState<number>(1);

  const showSonner = () => {
    toast(`Evento agregado ${number}`, {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "listo",
        onClick: () => console.log(`Undo ${number}`),
      },
    });

    setNumber(number + 1);
  };

  const showSonnerPromise = async () => {
    // crea una promesa que resuelve un nombre
    const myPromise = new Promise<{ name: string }>((resolve, reject) => {
      setTimeout(() => {
        resolve({ name: "My toast" });
        // reject();
      }, 3000);
    });

    // de toast accedemos a promise, 1er arg es la promesa
    // loading es lo que se muestra cuando la promesa aun no se recuelve
    //
    toast.promise(myPromise, {
      loading: "Loading...",
      success: (data: { name: string }) => {
        return `${data.name} toast has been added`;
      },
      error: "Error",
    });
  };

  // funcion que obtiene un pokemon
  const getPokemona = () => {
    // promesa que internamente resuelve una petición http
    const promise = new Promise<Result>((resolve, reject) => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
        .then((res) => res.json())
        .then((data) => resolve(data.results[0]))
        .catch(() => reject());
    });

    toast.promise(promise, {
      loading: "Un momento...",
      success: (data) => {
        return data.name;
      },
      error: "Ocurrio un error",
    });
  };

  // funcion simplificada
  const getPokemon = () => {
    // funcion auto invocada
    const promise = (async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
      const data: Pokeapi = await res.json();
      return data.results[0];
    })();

    toast.promise(promise, {
      loading: "Un momento...",
      success: (data) => `Primer Pokémon: ${data.name}`,
      error: "Ocurrió un error",
    });
  };

  return (
    <div className="flex justify-center gap-2">
      <Button variant="outline" onClick={showSonner}>
        Show Toast
      </Button>

      <Button variant={"outline"} onClick={showSonnerPromise}>
        Render toast
      </Button>

      <Button variant={"outline"} onClick={getPokemon}>
        Render toast pokemon
      </Button>
    </div>
  );
}
