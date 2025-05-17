const getBackendPath = (serviceName) => `${main_host}/backend/${serviceName}`;

// const main_host = "http://109.188.135.85:5001";
const main_host = "https://api.statanly.com:5001";

export const covergan_backend_host = getBackendPath('covergan');
export const vector_style_transfer_backend_host = getBackendPath('vector_style_transfer');
export const vector_weaver_backend_path = getBackendPath('vector_weaver');

export const config = {
  "main_host": main_host,
  "covergan_backend_host": covergan_backend_host,
  "vector_style_transfer_backend_host": vector_style_transfer_backend_host,
  "vector_weaver_backend_path": vector_weaver_backend_path,
  "MainPage_href": "/",
  "CoverGAN_href": "/covergan",
  "SVGEditor_href": "/edit",
  "VectorNST_href": "/vector_style_transfer",
  "VectorWeaver_href": "/vector_weaver",
  "Changelog_href": "/changelog",
  "Mantine_href": "https://mantine.dev",
  "frontend_tag_version": "v1.1.5",
  "startYear": "2022",
  "endYear": "2025",
}