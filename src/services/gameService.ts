import axios from 'axios';

const baseUrl = 'https://hltb-wrapper.herokuapp.com';

export interface Game {
	description: string;
	gameplayCompletionist: number;
	gameplayMain: number;
	gameplayMainExtra: number;
	id: string;
	imageUrl: string;
	name: string;
	platforms: string[];
	playableOn: string[];
	similarity: number;
	timeLabels: string[][];
}


export const getGames = async (): Promise<Game[]> => {
	const games = await axios.get(`${baseUrl}/games`);
	return games.data as Game[];
};