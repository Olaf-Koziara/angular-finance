
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/dashboard",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QL2VF7WJ.js",
      "chunk-M5NVJ4A5.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-U3FAMAZY.js",
      "chunk-M5NVJ4A5.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TWLGI3GP.js"
    ],
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VV5WYITU.js"
    ],
    "route": "/unauthorized"
  },
  {
    "renderMode": 2,
    "redirectTo": "/dashboard",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 8754, hash: 'a5f562f6ef98382fe66cc748238fc189b2b244e34191d392789d22833d6af2bd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1207, hash: '675c7301606e60f585192f6e1a29e1c9ff662b0a666ae9c27f81502b1aed8bae', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 76498, hash: '83f5105a010455c249ad4b12d44f1155bdd51f376c216478695a8a261b2b81fe', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 309, hash: '3983a94f489cd8ff89c7da9a885dc0188f9ba5d058c8809d15bf19728249e5e8', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 78302, hash: 'c071062c06b1ab9966e7f3a22af801a7c4d1a9e05bd32bababac3fb7038f1edf', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'unauthorized/index.html': {size: 70798, hash: 'cf3e7750fd7fea840d25e3fd389bbf576e630ff7982bb68ae9f1d9d38155e483', text: () => import('./assets-chunks/unauthorized_index_html.mjs').then(m => m.default)},
    'styles-PRPNPSJX.css': {size: 8100, hash: 'BFL5Q6BtY3E', text: () => import('./assets-chunks/styles-PRPNPSJX_css.mjs').then(m => m.default)}
  },
};
