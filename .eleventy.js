const esbuild = require("esbuild");
const imageShortcode = require("./src/_11ty/shortcodes/image");


module.exports = function (eleventyConfig) {

	//PASSTHROUGH COPY
	eleventyConfig.addPassthroughCopy("./src/img");
	eleventyConfig.addPassthroughCopy("./src/scripts");

	//SHORTCODE
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

	//WATCH TARGET
	eleventyConfig.addWatchTarget("./src/css/");
	eleventyConfig.addWatchTarget('./src/build-scripts/');
	eleventyConfig.addWatchTarget('./src/scripts/');

	//ELEVENTY AFTER EVENT
	eleventyConfig.on('eleventy.after', async () => {
    // Run me after the build ends
		return esbuild.build({
      entryPoints: ['src/build-scripts/globe.js'],
      bundle: true,
      outdir: 'public/scripts'
    });
  });


	return {
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		dir: {
			input: 'src',
			output: 'public'
		}
	};
};