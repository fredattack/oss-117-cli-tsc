import { Quote, Character } from '../types';
import { consoleColors, consoleIcones } from './constant';

export const displayQuotes = (
  apiResponse: Quote[] | Quote,
  number: number | null,
) => {
  if (Array.isArray(apiResponse) && apiResponse.length > 0) {
    if (number && number > apiResponse.length) {
      console.log(
        consoleColors.red,
        `${consoleIcones.warning} Il n'y a que ${apiResponse.length} citations disponibles.`,
      );
      console.log(`\nVoici les ${apiResponse.length} citations disponibles:`);
    }

    apiResponse.forEach(quote => {
      console.log(
        consoleColors.green,
        `\n"${quote.sentence}"`,
        `\n${quote.character?.name}\n`,
      );
    });
  } else if (typeof apiResponse === 'object' && 'sentence' in apiResponse) {
    // console.log( 'This text is green!');
    console.log(
      consoleColors.green,
      `\n"${apiResponse.sentence}"`,
      `\n${apiResponse.character?.name}\n`,
    );
  }
};

export const displayCharacters = (apiResponse: Character[] | Character) => {
  if (Array.isArray(apiResponse) && apiResponse.length > 0) {
    apiResponse.forEach(character => {
      console.log(
        consoleColors.blue,
        `"${character.name}" - alias ${character.slug}`,
      );
    });
  } else if (typeof apiResponse === 'object' && 'name' in apiResponse) {
    console.log(
      consoleColors.blue,
      `"${apiResponse.name}" - alias ${apiResponse.slug}`,
    );
  }
};

export const displayUnknownCharacters = (characters: Character[]) => {
  console.log(
    consoleColors.red,
    `${consoleIcones.warning} Ce personnage n'existe pas.\n`,
  );
  console.log('Voici la liste des personnages disponibles:');

  characters.forEach(character => {
    console.log(
      consoleColors.blue,
      `"${character.name}" - alias ${character.slug}`,
    );
  });
};

export const displayError = (error: string) => {
  console.log(consoleColors.red, `${consoleIcones.warning} ${error}`);
};
