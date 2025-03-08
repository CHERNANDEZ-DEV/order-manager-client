import "./globals.css";

import { ConfigProvider } from "antd";
import theme from "../antd.config";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-albert-sans" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={albertSans.className}>
        <ConfigProvider theme={theme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}

