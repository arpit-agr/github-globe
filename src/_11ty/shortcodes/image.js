const Image = require("@11ty/eleventy-img");

//Add default value for size attr https://github.com/AleksandrHovhannisyan/11ty-sass-images-seo/blob/master/11ty/shortcodes/image.js

async function imageShortcode(src, alt, sizes = '(max-width: 480px) 100vw, (max-width: 961px) 50vw, 33vw', loading) {
  let metadata = await Image(src, {
    widths: [640, 800],
    formats: ["avif", "webp", "jpeg"],
		outputDir: "./public/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading,
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode;