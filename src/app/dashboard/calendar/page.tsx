"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function Page() {
  // estado para la fecha
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dates, setDates] = useState<Date[] | undefined>([new Date()]);

  return (
    <div>
      <h1>
        fecha:{" "}
        {date?.toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </h1>

      {/* bloquear fines de semana */}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        // si el día es 0 (domingo) o 1 (sabado) se bloquea
        disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
        className="rounded-md border"
      />

      {/* bloquear fechas anteriores a la actual */}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        // si el día es 0 (domingo) o 1 (sabado) se bloquea
        disabled={(date) => date < new Date()}
        className="rounded-md border"
      />

      {/* multiples fechas */}
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
      />
      <h2>
        Multiples fechas:{" "}
        {dates
          ?.map((date) =>
            date.toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })
          )
          .join(" * ")}
      </h2>
    </div>
  );
}
