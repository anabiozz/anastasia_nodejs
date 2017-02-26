import path from 'path';
import fs from 'fs';

module.exports = function (request, response, next) {
  // app.use(function(req, res, next) {
  //  var filePath = path.join(__dirname, "static", req.url);
  //  fs.stat(filePath, function(err, fileInfo) {
  //    if (err) {
  //      next();
  //      return;
  //    }
  //  if (fileInfo.isFile()) {
  //    res.sendFile(filePath);
  //    } else {
  //      next();
  //    }
  //  });
  // });
}
