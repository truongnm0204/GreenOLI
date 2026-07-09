import { Users } from "./users";
import { Media } from "./media";
import { Categories } from "./categories";
import { Products } from "./products";
import { Articles } from "./articles";
import { Services } from "./services";
import { Partners } from "./partners";
import { Gallery } from "./gallery";
import { Leads } from "./leads";
import { Brands } from "./brands";

/**
 * Danh sách toàn bộ collections nạp vào Payload.
 * Thứ tự: auth/media trước, rồi nội dung, cuối là leads.
 */
export const collections = [
  Users,
  Media,
  Categories,
  Products,
  Articles,
  Services,
  Partners,
  Gallery,
  Leads,
  Brands,
];
