import './App.css';
import SearchBar from './components/SearchBar';

import { useEffect, useState } from 'react';
import { Game, getDefaultGames } from './services/gameService';

const App = (): JSX.Element => {

	const [games, setGames] = useState<Game[]>([]);

	const fetchDefaultGames = async () => {
		const result = await getDefaultGames();
		setGames(result);
		console.log(games);
	};

	useEffect(() => {
		fetchDefaultGames();
	}, []);

	return (
		<div className="container">
			<h1>HLTB Lite</h1>
			<SearchBar />
		</div>
	);
};

export default App;
