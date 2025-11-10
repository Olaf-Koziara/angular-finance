
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-SWWWRI2I.js",
      "chunk-HHNGV5JG.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YILT2Y46.js",
      "chunk-HHNGV5JG.js"
    ],
    "route": "/transactions"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 700, hash: '29fb26f5e36ed10a7a541223af90b9638ca953c76a0191dec9121f905c80c285', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1240, hash: 'd403b36633a5de35e79adbf3cac6fdbf2110ede45e9dad70ab5b8eddadf3d81c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 139078, hash: 'a7119ca807a3f56dddf71a8f71010dd8c50004702a0e21e25d1320a6b997e456', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'transactions/index.html': {size: 144007, hash: '62e1a4ee28c710816f30ed8eb3c7d06ad8cf30d0cc184cba123c90d5f01dad5a', text: () => import('./assets-chunks/transactions_index_html.mjs').then(m => m.default)}
  },
};
