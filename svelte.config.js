import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    sveltePreprocess({
      scss: {
        // Optional: you can add SCSS options here
        prependData: ''
      }
    })
  ],
  kit: {
    adapter: adapter()
  }
};

export default config;