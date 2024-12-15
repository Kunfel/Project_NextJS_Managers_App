"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import codingLogo from "@/public/coding.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col-2 h-screen bg-gray-100 overflow-hidden shadow-xl">
      <div className="flex items-center justify-center bg-[#23155B] w-1/2 p-4">
        <Image
          src={codingLogo}
          alt="Red hair guy looking in his laptop"
          className="w-3/5"
        />
      </div>{" "}
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center bg-white w-[400px] h-[350px] mx-48 rounded-lg p-5">
          <h1 className="text-2xl font-bold  mb-4">Join Managers Now!</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none "
              >
                Login
              </Button>
              <p className="text-sm text-gray-600 mt-0">
                New to CodeCLA?
                <Link href="/auth/signOut" className="text-[#8053FF] hover:underline">
                  Signup
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
