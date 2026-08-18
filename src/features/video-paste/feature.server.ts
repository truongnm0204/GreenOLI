import { createServerFeature } from "@payloadcms/richtext-lexical";

/**
 * Server feature: đăng ký client plugin paste URL YouTube/Vimeo → block videoEmbed.
 * Không thêm node mới — dùng BlockNode từ BlocksFeature (cần bật BlocksFeature kèm videoEmbed).
 */
export const VideoPasteFeature = createServerFeature({
  key: "videoPaste",
  feature: {
    ClientFeature: "/src/features/video-paste/feature.client#VideoPasteFeatureClient",
  },
});
