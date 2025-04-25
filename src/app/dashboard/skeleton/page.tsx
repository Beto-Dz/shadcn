import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

// funcion para simular peticion http
const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return "123456789".split("");
};

export default async function Page() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {data.map((item) => (
        <Card key={item}>
          <CardHeader className="flex">
            <Image
              src="https://github.com/shadcn.png"
              alt="Shadcn"
              width={40}
              height={40}
              className="rounded-full mr-2 w-10 h-10"
            />
            <div>
              <CardTitle>CardTitle</CardTitle>
              <CardDescription>CardDescription: esta es la descripción de la tarjeta</CardDescription>
            </div>
          </CardHeader>
          <CardFooter>
            <Button variant={"success"}>Más información</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
