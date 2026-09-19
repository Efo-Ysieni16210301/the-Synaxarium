/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> the whole app is a folder of files.
  // This is what lets the SAME build be:
  //   - hosted on the web
  //   - wrapped by Capacitor into an Android app (loads from local files)
  //   - wrapped by Tauri (or just installed as a PWA) on desktop
  output: 'export',
  images: {
    unoptimized: true, // next/image optimization needs a server; static export has none
  },
  trailingSlash: true, // makes routes resolve cleanly as folder/index.html on-device
};

module.exports = nextConfig;
