import PageHead from "@/components/commons/PageHead"
import { Fragment, ReactNode } from "react";

interface PropsTypes{
    children: ReactNode
    title?: string,
}

const AuthLayout = (props: PropsTypes) => {
    const {children, title} = props;
    return(
        <Fragment>
            <PageHead title={title}></PageHead>
            <section className="max-w-screen-3xl 3xl:container p-6">{children}</section>
        </Fragment>
    )

}

export default AuthLayout;