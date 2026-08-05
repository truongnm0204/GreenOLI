import { Users } from "./users";
import { Media } from "./media";
import { Documents } from "./documents";
import { Categories } from "./categories";
import { PackagingUnits } from "./packaging-units";
import { Products } from "./products";
import { Articles } from "./articles";
import { Services } from "./services";
import { Partners } from "./partners";
import { Gallery } from "./gallery";
import { Leads } from "./leads";
import { Brands } from "./brands";

/**
 * Danh sách toàn bộ collections nạp vào Payload.
 * Media = kho file ảnh/video local (ẩn menu). Không còn documents/attachments.
 */
export const collections = [
  Users,
  Media,
  Documents,
  Categories,
  PackagingUnits,
  Products,
  Articles,
  Services,
  Partners,
  Gallery,
  Leads,
  Brands,
];
