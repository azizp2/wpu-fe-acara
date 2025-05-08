import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { IRegister } from "@/types/Auth"
import authServices from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { ToasterContext } from "@/contexts/ToasterContext"

const registerSchema  = yup.object().shape({
    fullName: yup.string().required("Please input your fullName"),
    username: yup.string().required("Please input your username"),
    email: yup.string().email().required("Please input your email"),
    password: yup.string().min(2, "Minimal 8 characters").required("Please input your password"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), ""], "Password not match")
        .required("Please input password confirmation"),
})

const useRegister = () => {
    const router = useRouter();
    const { setToaster } = useContext(ToasterContext);

    const [visiblePassword, setVisiblePassword] = useState({
        password: false,
        passwordConfirmation: false,       

    })

    const handleVisiblePassword = (key: "password" | "passwordConfirmation") => {
        setVisiblePassword({
            ...visiblePassword,
            [key]: !visiblePassword[key]
        })
    }

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset, 
        setError
    }  = useForm({
        resolver: yupResolver(registerSchema),
    })

    const registerService = async (payload: IRegister) => {
        const result = await authServices.register(payload)
        return result
    }

    const {mutate: mutateRegister, isPending: isPendingRegister} = useMutation({
        mutationFn: registerService,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
              });
        },

        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Register success",
              });
            router.push("/auth/register/success");
            reset();
        }
    })

    const handleRegister = (data: IRegister) => mutateRegister(data)

    return {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit, 
        handleRegister,
        isPendingRegister,
        errors
    }

}

export default useRegister;