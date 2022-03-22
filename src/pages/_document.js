import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="ko">
    <Head>
      <meta charSet="UTF-8" />
      <link
        href="https://fonts.googleapis.com/css?family=Nanum+Gothic|Nanum+Myeongjo"
        rel="stylesheet"
      />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-97049730-2" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-97049730-2');
          `
        }}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
