import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { IRegister } from "@/types/Auth"
import authServices from "@/services/auth"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import endpoint from "@/services/endpoint.constant"
import environment from "@/config/environment"

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
        console.log(environment.API_URL)
        return result
    }

    const {mutate: mutateRegister, isPending: isPendingRegsiter} = useMutation({
        mutationFn: registerService,
        onError(error) {
            setError("root",{
                message: error.message
            });
            console.log(error);
        },

        onSuccess: () => {
            // router.push("/auth/register/success");
            // reset();
        }
    })

    const handleRegister = (data: IRegister) => mutateRegister(data)

    return {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit, 
        handleRegister,
        isPendingRegsiter,
        errors
    }

}

export default useRegister;