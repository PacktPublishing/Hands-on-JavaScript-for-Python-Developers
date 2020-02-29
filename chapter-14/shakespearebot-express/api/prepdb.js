const fs = require('fs');
const CSV2SQL = require('csv2sql-lite');
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./shakespeare.sqlite');

const rstream = fs.createReadStream('./Shakespeare_data.csv');

const csv2sql = CSV2SQL({
  tableName: 'myTableName',
  dbName: 'myFancyDatabaseName',
});

//db.run();

function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

rstream.pipe(csv2sql).pipe()

streamToString(rstream.pipe(csv2sql)).then((data) => {
  console.log(data)
})