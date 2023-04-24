import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class TheAssetsClubDocument extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* Favicons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="The Assets Club" />
          <meta name="application-name" content="The Asse(t)s Club" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
