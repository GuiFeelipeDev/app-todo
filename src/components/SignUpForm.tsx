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
import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { useForm } from "react-hook-form"
import { registerSchema, ZodRegisterSchema } from "../../schema/RegisterSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import api from "@/services/api"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"

const SignUpForm = () => {
  const [seePass, setSeePass] = useState<boolean>(false)

  const { toast } = useToast()

  const router = useRouter()

  const registerForm = useForm<ZodRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })

  const createUser = useMutation({
    mutationFn: async (data: ZodRegisterSchema) =>
      await api.post("/api/user", data),
    onError: async (err: any) => {
      const res = await err.response
      toast({
        variant: "destructive",
        title: res.data.msg || "Algo deu errado!",
        description: "Tente novamente!",
      })
    },
    onSuccess: () => router.push("/sign-in"),
  })

  const onSubmit = (data: ZodRegisterSchema) => {
    delete data.confirmPassword
    createUser.mutate(data)
  }

  return (
    <div>
      <Card className="w-[340px] md:w-[400px]">
        <CardHeader>
          <CardTitle>Faça seu Cadastro</CardTitle>
          <CardDescription>Crie sua conta agora mesmo!</CardDescription>
        </CardHeader>
        <CardContent className="w-full gap-3 flex flex-col">
          <Form {...registerForm}>
            <form
              id="signup-form"
              className="w-full"
              onSubmit={registerForm.handleSubmit(onSubmit)}
            >
              {/* Nome=============================================== */}
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome e Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: João da Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email=============================================== */}
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: joao@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Senha=============================================== */}
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          type={seePass ? "text" : "password"}
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
              {/* Confirmar Senha=============================================== */}
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        type={seePass ? "text" : "password"}
                        placeholder="Confirmar Senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Favorite Framework=============================================== */}
              <FormField
                control={registerForm.control}
                name="favorite_framework"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Framework Favorita</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full text-slate-500">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-slate-500">
                        <SelectItem value="NextJs">NextJs</SelectItem>
                        <SelectItem value="VueJs">VueJs</SelectItem>
                        <SelectItem value="AngularJs">AngularJs</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Termos e condições=============================================== */}
              <div className="flex gap-2 items-center mt-3 w-full justify-center">
                <FormField
                  control={registerForm.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-2">
                      <div className="flex gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Aceito os termos e condições!</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <Button
            type="submit"
            form="signup-form"
            size="sm"
            isLoading={createUser.isPending}
          >
            Fazer Cadastro
          </Button>
          <p className="text-sm w-full text-center text-slate-100">
            Já possui uma conta?{" "}
            <Link href="sign-in" className="text-slate-200 underline">
              Entre agora!
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUpForm
