"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const Page = () => {
  const [term, setTerm] = useState<boolean>(false);

  return (
    <section>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={term}
          onCheckedChange={(state: boolean) => setTerm(state)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
      <hr />

      {
        term
        ? ( <Badge variant="custom">Acceptado!</Badge> )
        : ( <Badge variant="destructive">No acceptado!</Badge> )
      }


    </section>
  );
};

export default Page;
