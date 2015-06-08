'use strict';

module.exports = [{
  method: 'GET',
  path: '/',
  config: {
    handler: function (req, res) {
      res('Hello world!');
    }
  }
}];
