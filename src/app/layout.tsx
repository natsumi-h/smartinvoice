import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

// const inter = Inter({ subsets: ["latin"] });
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
  title: "SmartInvoice",
  description: "Generated by create next app",
};

// https://mantine.dev/theming/default-theme/
const theme = createTheme({
  // fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md",
  cursorType: "pointer",
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
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications position="top-right" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
