import './App.css';

import { useEffect, useState, ChangeEvent } from 'react';
import { Game, getDefaultGames, getSearchedGames } from './services/gameService';

const App = (): JSX.Element => {

	const [games, setGames] = useState<Game[]>([]);

	const fetchGames = async (search?: string) => {
		const result = search ? await getSearchedGames(search) : await getDefaultGames();
		setGames(result);
	};

	const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		fetchGames(event.target.value);
	};

	useEffect(() => {
		fetchGames();
	}, []);

	return (
		<div className="container">
			<div>HLTB Lite</div>
			<button onClick={() => console.log(games)}>Test</button>
			<input type="text" onChange={(evt) => onSearchChange(evt)} />
		</div>

	);
};

export default App;
