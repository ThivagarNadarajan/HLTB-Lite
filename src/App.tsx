import './App.css';

import { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { Game, getDefaultGames, getSearchedGames } from './services/gameService';
import _ from 'lodash';

const App = (): JSX.Element => {

	const [games, setGames] = useState<Game[]>([]);

	const fetchDefaultGames = async () => {
		const result = await getDefaultGames();
		setGames(result);
	};

	const fetchSearchedGames = async (search: string) => {
		const result = search ? await getSearchedGames(search) : [];
		setGames(result);
	};

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		debounce(event.target.value.trim());
	};

	const debounce = useCallback(
		_.debounce((_searchVal: string) => {
			fetchSearchedGames(_searchVal);
		}, 400),
		[]
	);

	useEffect(() => {
		fetchDefaultGames();
	}, []);

	return (
		<div className="container">
			<div>HLTB Lite</div>
			<input type="text" onChange={(event) => handleSearchChange(event)} />
			{games.map(game => <div key={game.id}>{game.name}</div>)}
		</div>

	);
};

export default App;
