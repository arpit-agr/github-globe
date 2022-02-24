const esbuild = require("esbuild");

module.exports = function (eleventyConfig) {

	//PASSTHROUGH COPY
	eleventyConfig.addPassthroughCopy("./src/img/");


	//WATCH TARGET
	eleventyConfig.addWatchTarget("./src/css/");
	eleventyConfig.addWatchTarget('./src/scripts/')

	//ELEVENTY AFTER EVENT
	eleventyConfig.on('eleventy.after', async () => {
    // Run me after the build ends
		return esbuild.build({
      entryPoints: ['src/scripts/globe.js'],
      bundle: true,
      outdir: 'public/scripts'
    });
  });


	return {
		dir: {
			input: 'src',
			output: 'public'
		}
	};
};