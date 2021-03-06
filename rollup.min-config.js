import typescript from "rollup-plugin-typescript2";
import uglify from "rollup-plugin-uglify";

export default {
	input: "src/index.ts",
	output: {
		file: "index.min.js",
		format: "cjs"
	},
	plugins: [typescript(), uglify()]
};
