import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/index.ts',
	output: {
		file: 'index.js',
		format: 'cjs',
	},
	plugins: [
		typescript(),
		uglify(),
	]
};
