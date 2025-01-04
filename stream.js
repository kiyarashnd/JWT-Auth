/*const fs = require('fs');

const rs = fs.createReadStream('./file/lorem.txt', { encoding: 'utf8' });

const ws = fs.createWriteStream('./file/new-lorem.txt');

// rs.on('data', (dataChunk) => {
//   ws.write(dataChunk);
// });

rs.pipe(ws);

fs.open('mynewfile2.js', 'w', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
*/
const fsPromise = require('fs').promises;
const path = require('path');
const fs = require('fs');

const fileOps = async () => {
  try {
    if (!fs.existsSync('./new')) {
      await fs.mkdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory created ');
      });
      await fs.open('./new/mynewfile2.js', 'w', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      await fsPromise.writeFile(
        path.join(__dirname, 'new', 'mynewfile2.js'),
        'console.log(3)'
      );
    }

    // if (fs.existsSync('./new')) {
    //   await fs.rmdir('./new', (err) => {
    //     if (err) throw err;
    //     console.log('Directory removed');
    //   });
    // }
  } catch (err) {
    console.log(err);
  }
};

fileOps();
