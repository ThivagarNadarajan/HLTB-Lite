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
			<h3>Visualize game completion data from {' '}
				<a href="https://howlongtobeat.com" target='_blank' rel="noreferrer">HowLongToBeat</a>
			</h3>
			{
				loading
					?
					<div className="loading-container">
						<div className="loader"></div>
						<div className="loading-text">Waiting for Heroku Server...</div>
					</div>
					:
					<div>
						<SearchBar games={games} setGames={setGames} />
						{games.length ? <GameChart games={games} setGames={setGames} /> : <></>}
					</div>

			}
			<footer>
				<div>
					Made by {' '}
					<a href="https://thivagar.com"
						target='_blank' rel='noopener noreferrer'>
						Thivagar Nadarajan
				</a>
				</div>
			</footer>
		</div>
	);
};

export default App;
