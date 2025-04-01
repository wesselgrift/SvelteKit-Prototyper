import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$src: path.resolve(__dirname, './src')
		}
	},
    // server: {
	// 	host: '0.0.0.0',
	// 	allowedHosts: ['b670-2a02-a461-1948-0-b025-5327-9a54-90c0.ngrok-free.app']
	// }
});
