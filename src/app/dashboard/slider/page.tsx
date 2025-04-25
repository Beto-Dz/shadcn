"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function Page() {
  const [value, setValue] = useState(0);

  return (
    <>
      <span>Valor: {value}</span>
      <Slider
        defaultValue={[value]}
        onValueChange={(nvalue) => setValue(nvalue[0])}
        max={100}
        step={1}
      />
    </>
  );
}
