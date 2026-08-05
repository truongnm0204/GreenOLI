import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import { Be_Vietnam_Pro } from "next/font/google";
import "@payloadcms/next/css";
import {
  RootLayout,
  handleServerFunctions,
} from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap.js";
import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

// Font Be Vietnam Pro — cùng font với site frontend.
// Biến --font-be-vietnam-pro giúp custom.scss/globals.css áp font cho admin.
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    importMap={importMap}
    serverFunction={serverFunction}
    htmlProps={{ className: beVietnamPro.variable }}
  >
    {children}
  </RootLayout>
);

export default Layout;
