import Head from "next/head";

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
          <Head>
              <meta name='viewport' content='width=device-width, initial-scale=1' />
              <meta name="google-site-verification" content="i5atFIldhu9wvDrYq9H6H0WjAqLVUVBphgwFgYgJ7mA" />
          </Head>
          <Component {...pageProps} />
      </Layout>
  );
}

export default MyApp
