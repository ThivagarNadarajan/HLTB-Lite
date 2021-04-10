import './App.css';
import { useEffect, useState } from 'react';
import { Game, getDefaultGames } from './services/gameService';

import SearchBar from './components/SearchBar';
import GameChart from './components/GameChart';

const App = (): JSX.Element => {
	const [games, setGames] = useState<Game[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchDefaultGames = async () => {
		const result = await getDefaultGames();
		setGames(result);
		setLoading(false);
	};

	useEffect(() => {
		fetchDefaultGames();
	}, []);

	return (
		<div className="container">
			<h1>HLTB Lite</h1>
			<h3>Lightweight visualization of game completion data from howlongtobeat.com</h3>
			{
				loading
					?
					<div className="loader"></div>
					:
					<div>
						<SearchBar games={games} setGames={setGames} />
						{games.length ? <GameChart games={games} setGames={setGames} /> : <></>}
					</div>

			}
		</div>
	);
};

export default App;
