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
    this.input = (prompt = "") => new Promise((resolve) => this.reader.question(prompt, resolve));
  }
}

module.exports.Reader = Reader;