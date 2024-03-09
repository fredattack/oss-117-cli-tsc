# Oss117-cli-ts

This CLI tool is designed for fans and enthusiasts of the OSS 117 series, providing a simple and interactive way to fetch memorable quotes from the beloved French spy comedy films. Built with TypeScript, it offers various options for users to explore quotes, including fetching random quotes, filtering by specific characters, or searching by keywords.

## Features
+ Random Quotes: Get a random OSS 117 quote with a simple command.
+ Character Filter: Retrieve quotes from your favorite characters.
+ Keyword Search: Find quotes containing specific keywords.
+ Flexible: Supports multiple parameters for tailored quote retrieval.

## Installation

Provide instructions on how to install your CLI tool. Typically, this will involve cloning the repository and installing dependencies. If your project is published to npm, include those instructions as well.

```bash
git clone https://github.com/fredattack/oss-117-cli-tsc.git
cd oss-117-cli-tsc
npm install
npx tsc
```

## Usage 

### Random Quote
```bash
npm start
```

### Fetch X Random Quotes
number attribute is an integer, default is 1
```bash
npm start -- --number=X
```

### Fetch Random Quote of Character Hubert Bonisseur de La Bath

use character alias in lowercase
```bash
npm start -- --character=hubert
```

### Fetch List of Characters
```bash
npm start -- --characters
```

## Contribution

If you would like to contribute to this project, please open an issue or a pull request. We welcome any feedback or suggestions for improvement.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
