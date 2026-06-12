const fs = require('fs');

let config = fs.readFileSync('next.config.ts', 'utf8');

const newCsp = `    const isDev = process.env.NODE_ENV === 'development';
    const cspHeader = \`
      default-src 'none';
      script-src 'self' https://vercel.live https://www.googletagmanager.com https://www.google-analytics.com\${isDev ? " 'unsafe-eval' 'unsafe-inline'" : " 'unsafe-inline'"};
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://www.google-analytics.com https://www.googletagmanager.com;
      font-src 'self' data:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      connect-src 'self' https://vercel.live wss://ws-us3.pusher.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
      manifest-src 'self';
      media-src 'self';
      worker-src 'self';
      upgrade-insecure-requests;
    \`.replace(/\\n/g, '').replace(/\\s+/g, ' ').trim();`;

const oldCspRegex = /const isDev = process\.env\.NODE_ENV === 'development';\s*const cspHeader = `[\s\S]*?`\.replace\(\/\\n\/g, ''\)\.replace\(\/\\s\+\/g, ' '\)\.trim\(\);/;

config = config.replace(oldCspRegex, newCsp);

fs.writeFileSync('next.config.ts', config);
