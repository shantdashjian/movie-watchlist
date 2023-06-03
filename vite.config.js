import {defineConfig} from 'vite'
import { resolve } from 'path';

export default defineConfig({
	plugins: [],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				other: resolve(__dirname, 'watchlist.html')
			}
		}
	}
})
