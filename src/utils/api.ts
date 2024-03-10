import axios from 'axios';
import { Character, FetchQuotesParams, Quote } from '../types';
import { getEnvVar } from './helpers';

import { displayUnknownCharacters, displayError } from './display';

export const fetchQuotes = async (
  params: FetchQuotesParams,
): Promise<Quote[]> => {
  try {
    const apiUrl: string = getEnvVar('API_URL') || 'defaultAPIURL';
    let { number: argsNumber, keyword, character } = params;

    // Adjust the number of fetched items if keyword is present.
    const effectiveNumber = keyword ? 1000 : argsNumber;

    // Construct URL with adjusted params for keyword search.
    const requestUrl =
      apiUrl + constructURLPath({ ...params, number: effectiveNumber });

    // Fetch data.
    const response = await axios.get<Quote[]>(requestUrl);

    let data = response.data;

    // Filter by keyword if necessary.
    if (keyword) {
      data = filterResponsesByKeyword(data, keyword);

      // Apply original number limit after keyword filtering if specified.
      if (argsNumber) {
        data = data.slice(0, argsNumber);
      }
    }

    // Handle case when character is specified but no data is returned.
    if (character && !data.length) {
      const characters = await fetchCharacters();
      displayUnknownCharacters(characters);
    }

    return data;
  } catch (error) {
    // @ts-ignore
    displayError('Error fetching quotes:', error.message);
    return [];
  }
};

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    let base_url: string = getEnvVar('API_URL') || 'defaultAPIURL';
    const response = await axios.get(`${base_url}/characters`);

    return response.data;
  } catch (error) {
    // @ts-ignore
    displayError('Error fetching characters:', error.message);
    return [];
  }
};

function constructURLPath(params: {
  character?: string;
  number?: number;
}): string {
  const character: string = params.character ?? '';
  const number: number = params.number ?? 1;

  if (character) {
    return `/author/${character}/${number}`;
  }

  return number > 1 ? `/random/${number}` : '/random';
}

function filterResponsesByKeyword(
  responses: Quote[],
  keyword: string,
): Quote[] {
  return responses.filter(response => response.sentence.includes(keyword));
}
