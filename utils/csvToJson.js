var _ = require('lodash');
var csvtojson = require('csvtojson');

function csvToJson(path) {
  return new Promise((resolve, reject) => {
    csvtojson()
      .fromFile(path)
      .then((json) => {
        resolve(json);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

module.exports = csvToJson;
