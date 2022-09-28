const compressor = require('node-minify');

compressor.minify({
    compressor:'gcc',
    input:'sharepoint/SiteAssets/angular-loader-src.js',
    output:'sharepoint/SiteAssets/angular_loader.js',
    callback:function(err,min) {}
});