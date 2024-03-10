import axios from 'axios';
import { Character, Quote } from '../types';
import { getEnvVar } from './helpers';

import { displayUnknownCharacters, displayError } from './display';

export const fetchQuotes = async (
  params: Record<string, any>,
): Promise<Quote[]> => {
  try {
    let base_url: string = getEnvVar('API_URL') || 'defaultAPIURL';

    base_url += constructURLPath(params);

    const response = await axios.get(base_url, { params });

    if (params.character && !response.data) {
      let characters = await fetchCharacters();
      displayUnknownCharacters(characters);
    }
    return response.data;
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
