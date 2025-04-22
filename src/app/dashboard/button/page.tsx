import { Button } from "@/components/ui/button";
import { ChevronRight, Mail } from "lucide-react";

const page = () => {
  return (
    <div className="grid grid-cols-5 gap-2">
      <Button>default</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="outline">outline</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="link">link</Button>
      <Button variant="success">success</Button>
      <Button capitalize={false}>capitalize false</Button>
      <Button variant="outline" size="icon">
        <ChevronRight />
      </Button>
      <Button variant="outline" className="w-fit">
        <Mail /> Ver mails
      </Button>
    </div>
  );
};

export default page;
