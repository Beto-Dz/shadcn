"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Page = () => {
  // esquema de zod para validar el formulario
  const formSchema = z.object({
    username: z.string().min(2, 'Mínimo 2 caracteres').max(20, 'Máximo 20 caracteres'),
    email: z.string().email('Email inválido').min(1, 'Campo requerido').max(50, 'Máximo 50 caracteres'),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated. ( type-saved quiere decir que si se espera un tipo de dato se mantiene ese tipo de dato )
    console.log({ values });
  }

  return (
    <div >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  Nombre público de tu cuenta.
                </FormDescription>
                {/* mensaje de error */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="shadcn@gmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  Correo electrónico de tu cuenta
                </FormDescription>
                {/* mensaje de error */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
