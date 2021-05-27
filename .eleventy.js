module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({"src/js" : "assets/js"});

    // Filter for sorting pagination by "survey_results.grosse_sorgen" frontmatter e.g. {% for item in collections.worry | sortByGreatWorries %}
    function sortByGreatestWorries(values) {
        let vals = [...values];
        return vals.sort((a, b) => Math.sign(a.survey_results.great_worries - b.survey_results.great_worries)).reverse();
    }
    eleventyConfig.addFilter('sortByGreatestWorries', sortByGreatestWorries);

    // markdownify filter
    const md = require('markdown-it')({
        html: false,
        breaks: true,
        linkify: true,
        typographer: true,
        quotes: '„“‚‘'
    });
    eleventyConfig.addNunjucksFilter("markdownify", (markdownString) => {
        if (typeof markdownString === 'string') {
            return md.render(markdownString);
        } else {
            return markdownString;
        }
    });

    // markdownifyinline filter (adds no <p> tags)
    const mdInline = require('markdown-it')({
        html: false,
        breaks: false,
        linkify: false,
        typographer: true,
        quotes: '„“‚‘'
    });
    eleventyConfig.addNunjucksFilter('markdownifyinline', (str) => {
        if (typeof str === 'string') {
            return mdInline.renderInline(str);
        } else {
            return str;
        }
    });

    eleventyConfig.addNunjucksFilter('toLocaleString', (value) => {
        if (typeof value === 'number') {
            return value.toLocaleString('de-DE');
        } else {
            return value;
        }
    });

    // trailing slash for urls | urlSlash
    eleventyConfig.addNunjucksFilter('urlSlash', (str) => {
        if (typeof str === 'string') {
            if (str.slice(-1) === '/') {
                return str;
            } else {
                return str + '/';
            }
        } else {
            return str;
        }
    });

    // Configure folders
    return {
        dir: {
            input: "src/eleventy",
            output: "dist",
        },
        templateFormats: [
            'md',
            'njk'
        ],
        markdownTemplateEngine: "njk"
    };
};