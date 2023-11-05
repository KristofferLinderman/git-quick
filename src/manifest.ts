import packageJson from '../package.json';
import { ManifestType } from '@src/manifest-type';

const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  permissions: ['storage'],
  description: packageJson.description,
  action: {
    default_popup: 'src/popup/index.html',
    default_icon: 'icon32.png',
  },
  icons: {
    '32': 'icon32.png',
    '128': 'icon128.png',
  },
  content_scripts: [
    {
      matches: ['https://*.github.com/*'],
      js: ['src/content/index.js'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['icon128.png', 'icon32.png'],
      matches: [],
    },
  ],
};

export default manifest;
