"use client";

import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import { ImagePastePlugin } from "./plugin";

/**
 * Client feature: paste ảnh file / remote URL an toàn hơn UploadFeature mặc định.
 */
export const ImagePasteFeatureClient = createClientFeature({
  plugins: [
    {
      Component: ImagePastePlugin,
      position: "normal",
    },
  ],
});
