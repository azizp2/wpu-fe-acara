import PageHead from "@/components/commons/PageHead"
import { Fragment, ReactNode } from "react";

interface PropsTypes{
    children: ReactNode
    title?: string,
}

const AuthLayout = (props: PropsTypes) => {
    const {children, title} = props;
    return(
        <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py">
            <PageHead title={title}></PageHead>
            <section className="max-w-screen-3xl 3xl:container p-6">{children}</section>
        </div>
    )

}

export default AuthLayout;