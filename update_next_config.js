const fs = require('fs');

let config = fs.readFileSync('next.config.ts', 'utf8');

config = config.replace(
  /const nextConfig: NextConfig = {/,
  `const nextConfig: NextConfig = {\n  experimental: {\n    sri: {\n      algorithm: 'sha256',\n    },\n  },`
);

const oldCsp = `    const cspHeader = \`
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data:;
      font-src 'self' data:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      connect-src 'self' https://vercel.live wss://ws-us3.pusher.com;
    \`.replace(/\\n/g, '').replace(/\\s+/g, ' ').trim();`;

const newCsp = `    const isDev = process.env.NODE_ENV === 'development';
    const cspHeader = \`
      default-src 'none';
      script-src 'self' https://vercel.live\${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ""};
      style-src 'self'\${isDev ? " 'unsafe-inline'" : ""};
      img-src 'self' blob: data:;
      font-src 'self' data:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      connect-src 'self' https://vercel.live wss://ws-us3.pusher.com;
      manifest-src 'self';
      media-src 'self';
      worker-src 'self';
      upgrade-insecure-requests;
    \`.replace(/\\n/g, '').replace(/\\s+/g, ' ').trim();`;

config = config.replace(oldCsp, newCsp);

fs.writeFileSync('next.config.ts', config);
