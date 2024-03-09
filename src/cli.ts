import yargs
    from 'yargs';

import {
    hideBin
} from 'yargs/helpers';

import {
    fetchQuotes,
    fetchCharacters
} from './utils/api';

import {
    displayQuotes,
    displayCharacters
} from './utils/display';

import dotenv
    from 'dotenv';

dotenv.config();

yargs(hideBin(process.argv))
    .command({
        command: '$0',
        describe: 'Fetch random OSS 117 quotes',
        builder: {
            number: {
                describe: 'Le nombre de citations à afficher',
                type: 'number',
            },
            character: {
                describe: 'Le personnage dont on veut afficher les citations',
                type: 'string',
            },
            characters: {
                describe: 'Afficher la liste des personnages disponibles',
                type: 'boolean',
                default: false,
            },
        },
        handler: async (argv) => {

            const params: Record<string, any> = {};

            if (argv.characters) {
                const apiResponse = await fetchCharacters();
               displayCharacters(apiResponse);
                return;
            }

            if (argv.number) params.number = argv.number;
            if (argv.character) params.character = argv.character;
            const apiResponse = await fetchQuotes(params);
            displayQuotes(apiResponse,argv.number);

        },
    })
    .help()
    .alias('help', 'h')
    .strict()
    .parse();


