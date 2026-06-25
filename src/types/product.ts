export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductSection = {
  heading: string;
  body: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  galleryImages: string[];
  specs: ProductSpec[];
  composition: string;
  usage: string;
  warning: string;
  packaging: string;
  certifications: string[];
  tags: string[];
};
