var _ = require('lodash');
var https = require('https');
var http = require('http');

https.globalAgent.maxSockets = 50;
http.globalAgent.maxSockets = 50;

var csvToJson = require('./utils/csvToJson');
var downloadImage = require('./utils/imageDownloader');


async function dowloadMultiImages(images, name) {
  _.each(images, async (item, i) => {
    try {
      await downloadImage(item['Photo name'], `./images/${encodeURIComponent(`${name}-${(i + 1)}`)}.jpg`);
    } catch (e) {
      console.log(`./images/${name}-${(i + 1)}.jpg`);
      // console.log(e);
    }
  })
}

async function downloadImages() {
  const data = await csvToJson('./static/images.csv');
  const cleanData = _.filter(data, item => _.get(item, 'Photo name'));
  const group = _.groupBy(cleanData, 'Product');
  for (const property in group) {
    dowloadMultiImages(group[property], property);
  }

}

downloadImages();