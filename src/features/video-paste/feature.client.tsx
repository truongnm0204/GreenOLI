"use client";

import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import { VideoPastePlugin } from "./plugin";

/**
 * Client feature: đăng ký plugin paste URL → videoEmbed block.
 */
export const VideoPasteFeatureClient = createClientFeature({
  plugins: [
    {
      Component: VideoPastePlugin,
      position: "normal",
    },
  ],
});
