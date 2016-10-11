(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const shops = require('../routes/shops');


    // *** register routes *** //
    app.use('/', routes);
    app.use('/shops', shops);


  };

})(module.exports);
