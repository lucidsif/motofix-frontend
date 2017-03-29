/**
 * Created by Sif on 3/24/17.
 */

require('babel-register');
const router = require('./router').default;
const Sitemap = require('react-router-sitemap').default;

// TODO: create script to generate routes from react-router and includes dynamic urls
// NOTE: if you need to regen sitemap, set babel presets latest so to include modules temporarily

(
  new Sitemap(router)
    .build('https://motofixes.com')
    .save('./static/sitemap.xml')
);
