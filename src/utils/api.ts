import axios
    from 'axios';
import {
    Character,
    Quote
} from '../types';
import {
    getEnvVar
} from './helpers';


import {
    displayUnknownCharacters,
    displayError
} from "./display";

export const fetchQuotes = async (params: Record<string, any>): Promise<Quote[]> => {
    try {
        let base_url: string  = getEnvVar('API_URL') || 'defaultAPIURL';

        base_url += constructURLPath(params);

        const response = await axios.get(base_url , { params });

        if(params.character && !response.data){
            let characters = await fetchCharacters();
            displayUnknownCharacters(characters);
        }
        return response.data;
    } catch (error) {
        // @ts-ignore
        displayError('Error fetching quotes:', error.message)
        return [];
    }
};

export const fetchCharacters = async (): Promise<Character[]> => {
    try {
        let base_url: string  = getEnvVar('API_URL') || 'defaultAPIURL';
        const response = await axios.get(`${base_url}/characters` );

        return response.data;
    } catch (error) {
        // @ts-ignore
        displayError('Error fetching characters:', error.message)
        return [];
    }
};


function constructURLPath(params: Record<string, any>): string {
    if (params.character && params.number) {
        return `/author/${params.character}/${params.number}`;
    } else if (params.character) {
        return `/author/${params.character}/1`;
    } else if (params.number) {
        return `/random/${params.number}`;
    }

    return "/random";
}
