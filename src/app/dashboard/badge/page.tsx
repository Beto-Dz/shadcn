"use client";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <section className="flex gap-2">
      <Badge>hola mundo</Badge>
      <Badge variant="destructive" capitalize>hola destructive</Badge>
      <Badge variant="secondary">hola secondary</Badge>
      <Badge variant="outline" capitalize>hola outline</Badge>
      <Badge variant="custom" capitalize>hola custom</Badge>
    </section>
  );
}
