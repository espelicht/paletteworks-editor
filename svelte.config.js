import path from 'node:path'
import vercelAdapter from '@sveltejs/adapter-vercel'
import staticAdapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    // adapter: process.env.TAURI_CONFIG ? staticAdapter() : vercelAdapter(),
    adapter: staticAdapter({
      // fallback: 'src/app.html',

      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true,
    }),

    // vite: {
    //   assetsInclude: ['**/*.fnt'],
    //   resolve: {
    //     alias: {
    //       $assets: path.resolve('./src/assets'),
    //       $i18n: path.resolve('./src/i18n'),
    //     },
    //   },
    //   define: {
    //     'process.env.PACKAGE_VERSION': JSON.stringify(
    //       process.env.npm_package_version
    //     ),
    //   },
    // },
  },
}

export default config
