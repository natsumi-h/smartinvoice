import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartInvoice",
  description: "Generated by create next app",
};

// https://mantine.dev/theming/default-theme/
const theme = createTheme({
  // fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md",
  cursorType: "pointer",
  // breakpoints: {
  //   xs: "36em",
  //   sm: "48em",
  //   md: "62em",
  //   lg: "75em",
  //   xl: "88em",
  // },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications position="top-right" />
          <main style={{ position: "relative", minHeight: "100vh" }}>
            {children}
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
