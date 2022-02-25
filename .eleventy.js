const esbuild = require("esbuild");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [640, 800],
    formats: ["avif", "webp", "jpeg"],
		sizes: ["(max-width: 480px) 100vw", "(max-width: 961px) 50vw", "33vw"],
		outputDir: "./public/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}


module.exports = function (eleventyConfig) {

	//PASSTHROUGH COPY
	eleventyConfig.addPassthroughCopy("./src/img/");

	//SHORTCODE
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

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
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		dir: {
			input: 'src',
			output: 'public'
		}
	};
};