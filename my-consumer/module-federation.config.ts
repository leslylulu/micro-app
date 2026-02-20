import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'consumer',
  remotes: {
    // 'provider': 'rslib_provider@https://unpkg.com/module-federation-rslib-provider@latest/dist/mf/mf-manifest.json',
    'provider': 'rslib_provider@http://localhost:3001/mf-manifest.json',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
