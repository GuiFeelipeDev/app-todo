"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { loginSchema, ZodLoginSchema } from "../../schema/LoginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { signIn } from "next-auth/react"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"

const SignInForm = () => {
  const [seePass, setSeePass] = useState<boolean>(false)
  const loginForm = useForm<ZodLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (data: ZodLoginSchema) => {
    const userSignIn = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (userSignIn?.error)
      toast({ variant: "destructive", title: "Usuário ou Senha incorretos!" })

    if (!userSignIn?.error) window.location.reload()
  }

  return (
    <div>
      <Card className="w-[340px] md:w-[400px]">
        <CardHeader>
          <CardTitle>Faça o Login</CardTitle>
          <CardDescription>Conecte-se com nossa aplicação!</CardDescription>
        </CardHeader>
        <CardContent className="w-full gap-3 flex flex-col">
          <Form {...loginForm}>
            <form id="signin-form" onSubmit={loginForm.handleSubmit(onSubmit)}>
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        id="login-email"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          type={seePass ? "text" : "password"}
                          id="login-password"
                          placeholder="Senha"
                          {...field}
                        />
                        <div
                          className="absolute right-3 cursor-pointer"
                          onClick={() => setSeePass(!seePass)}
                        >
                          {seePass ? <EyeOff /> : <Eye />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Button type="submit" form="signin-form" size="sm">
            Fazer Login
          </Button>
          <p className="text-sm w-full text-center text-slate-100">
            Não possui uma conta?{" "}
            <Link href="sign-up" className="text-slate-200 underline">
              Cadastre-se
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInForm
