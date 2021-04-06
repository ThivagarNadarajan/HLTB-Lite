import './App.css';
import { useEffect, useState } from 'react';
import { Game, getDefaultGames } from './services/gameService';

import SearchBar from './components/SearchBar';
import GameChart from './components/GameChart';

const App = (): JSX.Element => {

	const [games, setGames] = useState<Game[]>([]);

	const fetchDefaultGames = async () => {
		const result = await getDefaultGames();
		setGames(result);
	};

	useEffect(() => {
		fetchDefaultGames();
	}, []);

	return (
		<div className="container">
			<h1>HLTB Lite</h1>
			<SearchBar games={games} setGames={setGames} />
			{games.length ? <GameChart games={games} setGames={setGames} /> : <></>}
		</div>
	);
};

export default App;
