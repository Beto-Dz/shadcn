import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function Page() {
  // este tiene una carga peresoza de la imagen y mientras se carga
  // se muestra lo que tengamos en avatarFallBack
  return (
    <Avatar>  
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
      <AvatarFallback><User className="w-full" /></AvatarFallback>
    </Avatar>
  );
}
