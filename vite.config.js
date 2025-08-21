import { defineConfig } from 'vite';

export default defineConfig({
	root: 'src',
	base: '/to-do-list/',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
	},
});
