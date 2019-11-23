const fs = require("fs");
const csv = require("csvtojson");
const chalk = require("chalk");

const inFilePath = __dirname + "/../data/CaseDatawHeaders.csv";
const outFilePath = __dirname + "/../data/case-desc.json";

csv({
  delimiter: ","
})
  .fromFile(inFilePath)
  .then(jsonObj => {
    console.log(jsonObj);
    writeToFile(jsonObj);
  });

function writeToFile(json) {
  // write output file
  fs.writeFile(outFilePath, JSON.stringify(json), "utf-8", err => {
    if (err) throw err;

    console.log(chalk.green("done writing file"));
  });
}
