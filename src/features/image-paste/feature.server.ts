import { createServerFeature } from "@payloadcms/richtext-lexical";

/**
 * Server feature: paste ảnh (file / remote URL) → Media + UploadNode.
 * Bổ sung UploadFeature — tránh browser fetch CORS gây "Failed to fetch".
 */
export const ImagePasteFeature = createServerFeature({
  key: "imagePaste",
  feature: {
    ClientFeature:
      "/src/features/image-paste/feature.client#ImagePasteFeatureClient",
  },
});
