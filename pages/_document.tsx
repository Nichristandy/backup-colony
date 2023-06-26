import Document, { Html, Head, Main, NextScript } from 'next/document';


class MyDocument extends Document {

    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta name="robots" content="index,follow" />
                    <meta name="description" content="Colony | This Website is Designed by PT INFINI OASE TECHNOLOGY" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossOrigin="anonymous" ></script> */}
                </body>
            </Html>
        )
    }
}

export default MyDocument