/**
 * Created by Sif on 3/24/17.
 */

require('babel-register');
const router = require('./router').default;
const Sitemap = require('react-router-sitemap').default;


(
  new Sitemap(router)
    .build('https://motofixes.com')
    .save('./static/sitemap.xml')
);
