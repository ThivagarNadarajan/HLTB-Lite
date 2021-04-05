import './App.css';
import { useEffect, useState } from 'react';
import { BarChart, XAxis, Tooltip, YAxis, Bar } from 'recharts';
import { Game, getDefaultGames } from './services/gameService';

import SearchBar from './components/SearchBar';

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
			<SearchBar />
			<div className="chart-container">
				<BarChart
					width={500}
					height={500}
					margin={{ right: 100 }}
					data={games.map(game => ({
						tite: game.name,
						value: game.gameplayMain
					}))}
				>
					<XAxis
						dataKey="tite"
						angle={60}
						textAnchor="start"
						height={300}
						width={300}
						interval={0}
					/>
					<YAxis />
					<Tooltip />
					<Bar dataKey="value" fill="black" />
				</BarChart>
			</div>
		</div>
	);
};

export default App;
