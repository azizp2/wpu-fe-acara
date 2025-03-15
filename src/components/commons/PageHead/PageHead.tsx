import Head from 'next/head'

interface PropsTypes{
    title?: string
}


const PageHead = (props: PropsTypes) => {
    const {title = "Acara"} =  props

    return (
        <Head>
            <title>{title}</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel='icon' href='/images/general/logo.svg' type='image/x-icon' />
        </Head>
    )
}


export default PageHead;