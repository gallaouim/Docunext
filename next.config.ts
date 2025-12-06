import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx"],
  turbopack: {
    root: __dirname,
  },
};
export default nextConfig;
