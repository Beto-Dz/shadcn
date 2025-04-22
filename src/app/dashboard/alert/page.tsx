import { Terminal, Check, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Page() {
  return (
    <div className="grid gap-3">
      <h1>Alert page</h1>

      <hr />
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>

      <hr />
      <Alert variant="destructive">
        <X className="h-4 w-4" />
        <AlertTitle>Heads up [destructive variant]!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>

      <hr />
      <Alert variant="success">
        <Check className="h-4 w-4" />
        <AlertTitle>Heads up [success | custom variant]!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>

    </div>
  );
}
