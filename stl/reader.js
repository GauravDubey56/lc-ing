const readline = require("readline");

class Reader {
  reader;
  input;
  close () {
    this.reader.close();
  }
  constructor() {
    this.reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.input = () => new Promise((resolve) => this.reader.question("", resolve));
  }
}

module.exports.Reader = Reader;