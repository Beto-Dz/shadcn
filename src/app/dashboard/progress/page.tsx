"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";

export default function Page() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () =>
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }

          return prev + 1;
        }),
      100
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <Progress
        value={progress}
        className="w-[60%]"
        indicatorColor={cn({
          "bg-red-500": progress < 50,
          "bg-yellow-500": progress > 50 && progress < 80,
          "bg-green-500": progress >= 80,
        })}
      />
    </div>
  );
}
