import { Skeleton } from "@/components/ui/skeleton";
import { Card,  CardFooter, CardHeader, } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

    // const dataSimulate = Array.from({ length: 9 }).map((_, index) => index + 1);
    const dataSimulate = '123456789'.split('');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {dataSimulate.map((item) => (
        <Card key={item}>
          <CardHeader className="flex">
            <Skeleton className="rounded-full mr-2 w-10 h-10"/>
            <div className="flex flex-col flex-grow gap-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-full" />
            </div>
          </CardHeader>
          <CardFooter>
            <Skeleton className="h-8 w-20" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
