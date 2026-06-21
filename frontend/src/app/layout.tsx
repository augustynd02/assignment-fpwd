import type { Metadata } from "next";
import { Raleway } from 'next/font/google';

import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryWrapper/ReactQueryWrapper";

const raleway = Raleway({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-primary'
})

export const metadata: Metadata = {
	title: "FPWD zadanie rekrutacyjne - Dominik Augustyn",
	description: "EUR-PLN exchange app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${raleway.variable}`}>
			<body>
				<ReactQueryProvider>
					{children}
				</ReactQueryProvider>
			</body>
		</html>
	);
}
