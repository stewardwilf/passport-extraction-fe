import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_LAMBDA_ENDPOINT: process.env.NEXT_PUBLIC_LAMBDA_ENDPOINT
  }
  /* config options here */
};

export default nextConfig;
