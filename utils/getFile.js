const fs = require('fs');

function syncGetHtml(path) {
    return fs.readFileSync(path, 'utf-8');
}

async function asyncGetHtml(path) { // 异步函数
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}

module.exports = {
  syncGetHtml,
  asyncGetHtml,
};