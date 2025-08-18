import { defineConfig } from 'vite';
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react(), reactRouter(), tsconfigPaths()],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true
			}
		}
	},
	resolve: {
		alias: {
			'@': '/src'
		}
	}
})
