'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const axios_1 = __importDefault(require('axios'));
const yargs_1 = __importDefault(require('yargs'));
const helpers_1 = require('yargs/helpers');
const fetchQuotes = params =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const response = yield axios_1.default.get(
        'https://oss-117-quotes-api.herokuapp.com/quotes',
        { params },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching quotes:', error);
      return [];
    }
  });
const displayQuotes = quotes => {
  quotes.forEach(quote => {
    console.log(`"${quote.quote}" - ${quote.character}`);
  });
};
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
  .command({
    command: '$0',
    describe: 'Fetch random OSS 117 quotes',
    builder: {
      number: {
        describe: 'Number of quotes to fetch',
        type: 'number',
      },
      character: {
        describe: 'Fetch quotes by character',
        type: 'string',
      },
      keyword: {
        describe: 'Fetch quotes containing a keyword',
        type: 'string',
      },
    },
    handler: argv =>
      __awaiter(void 0, void 0, void 0, function* () {
        const params = {};
        if (argv.number) params.number = argv.number;
        if (argv.character) params.character = argv.character;
        if (argv.keyword) params.keyword = argv.keyword;
        const quotes = yield fetchQuotes(params);
        displayQuotes(quotes);
      }),
  })
  .help()
  .alias('help', 'h')
  .parse();
