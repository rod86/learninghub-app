import '@assets/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Lato } from 'next/font/google';
import Header from '@components/layout/Header';
import HeroImage from '@components/layout/HeroImage';
import Footer from '@components/layout/Footer';

const lato = Lato({
    variable: '--font-lato',
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    display: 'swap'
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${lato.variable} font-sans flex flex-col min-h-screen`}>
            <Head>
                <title key="title">Learning Hub</title>
                <meta key="description" name="description" content="Learning Hub App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <HeroImage />
            <main className="container flex-grow mx-auto">
                <Component {...pageProps} />
            </main>
            <Footer />
        </div>
    );
}
