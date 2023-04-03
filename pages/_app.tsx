import "../styles/index.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Dzajdrop</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/x-icon" href="/logo.svg" />
				<meta name="title" content="Dzajdrop" />
				<meta
					name="description"
					content="Free file storage. You can drop your file and get a link."
				/>
				<meta
					name="keywords"
					content="link, bitly, link shortener, shortener, dzajlopment, LordPrinz, dzajco, dzajcarz, bubr, dżajco, dżajcarz, zip file, Oskar Płaziński, short, short link, zsti, lordprinzteam, team, lpt, best link, best, best link shortener, de, dzajde, dzaj.de, dzaj de, dzaj de link, dzajde link, dzaj.de link, dzaj.de link short, dzajde link short, dzaj de link short, drop, dzajdrop, file, storage"
				/>
				<meta name="robots" content="all" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="language" content="English" />
				<meta name="author" content="LordPrinz" />
				<meta property="og:image" content="logo.svg" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
