import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'provider',
  exposes: {
    '.': './src/components/ProviderComponent.tsx',
    './Button': './src/components/IsolatedButton/Button.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
