// Download Stitch-rendered HTML references for visual fidelity comparison.
// These are NOT used at runtime — they live under references/stitch-html/.
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const SCREENS = [
  {
    slug: "trang-chu",
    title: "Green Oli - Trang Chủ",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2VhNzE1ZjdhOGQ3ODQwODc5MDllNzNkNjAxZDQ0MWMxEgsSBxCFxtz88xAYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzgyNDg4NjgwMzkwMTQ3NDUyOA&filename=&opi=89354086",
  },
  {
    slug: "gioi-thieu",
    title: "Green Oli - Giới Thiệu",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzU0MjhiMWM1MGI1NDQ5ZmZhZWE5YmFkZTJhOTQ2OTA1EgsSBxCFxtz88xAYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzgyNDg4NjgwMzkwMTQ3NDUyOA&filename=&opi=89354086",
  },
  {
    slug: "cua-hang",
    title: "Green Oli - Cửa Hàng",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzM5OWQwYTYzNmJjMjQ0NGI4MjBmN2IxYjI2ODRhYjUyEgsSBxCFxtz88xAYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzgyNDg4NjgwMzkwMTQ3NDUyOA&filename=&opi=89354086",
  },
  {
    slug: "danh-muc-hoa-chat-diet-con-trung",
    title: "Green Oli - Danh Mục Hóa Chất Diệt Côn Trùng",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2M1ZGU5ODM2ZDE3ODRmNzk5M2YwMWQzYjM3Njc3MWEzEgsSBxCFxtz88xAYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzgyNDg4NjgwMzkwMTQ3NDUyOA&filename=&opi=89354086",
  },
  {
    slug: "san-pham-sumipro-ew",
    title: "Green Oli - Chi Tiết Sản Phẩm Sumipro EW",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzk2ZmM1YWYyZWRmOTQ0MzBhZTVmZThhNTYzYzVjNzYwEgsSBxCFxtz88xAYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzgyNDg4NjgwMzkwMTQ3NDUyOA&filename=&opi=89354086",
  },
  {
    slug: "tin-tuc",
    title: "Green Oli - Tin Tức",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2Q2Y2ZkMjc0Mzc4NjRkOGJhMDdkZDYzZWVhMDAyZGZmEgsSBxCFxtz88xAYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzgyNDg4NjgwMzkwMTQ3NDUyOA&filename=&opi=89354086",
  },
  {
    slug: "lien-he",
    title: "Green Oli - Liên Hệ",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2I1ZTBiMDYxMDg0ZjQ5MTNhYzNlZjJlNDA4OGQzNzc5EgsSBxCFxtz88xAYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzgyNDg4NjgwMzkwMTQ3NDUyOA&filename=&opi=89354086",
  },
];

const OUT_DIR = "references/stitch-html";

async function fetchOne({ slug, title, url }) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  const html = await res.text();
  const path = `${OUT_DIR}/${slug}.html`;
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, html, "utf8");
  console.log(`OK  ${slug.padEnd(36)} ${(html.length / 1024).toFixed(1)} KB  ${title}`);
}

const results = await Promise.allSettled(SCREENS.map(fetchOne));
const failed = results.filter((r) => r.status === "rejected");
if (failed.length) {
  console.error(`\n${failed.length} failed:`);
  failed.forEach((r) => console.error("  -", r.reason.message));
  process.exit(1);
}
console.log(`\nAll ${SCREENS.length} files downloaded into ${OUT_DIR}/`);
