import packageJson from '../package.json';
import { ManifestType } from '@src/manifest-type';

const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  permissions: ['storage'],
  description: packageJson.description,
  options_page: 'src/options/index.html',
  background: { service_worker: 'src/background/index.js' },
  action: {
    default_popup: 'src/popup/index.html',
    default_icon: 'icon-34.png',
  },
  icons: {
    '128': 'icon-128.png',
  },
  content_scripts: [
    {
      matches: ['https://*.github.com/*'],
      js: ['src/content/index.js'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['icon-128.png', 'icon-34.png'],
      matches: [],
    },
  ],
};

export default manifest;
