import './GameChart.css';
import React from 'react';
import { Game } from '../../services/gameService';
import { BarChart, XAxis, Tooltip, YAxis, Bar } from 'recharts';

const GameChart: React.FC<{ games: Game[]; setGames: React.Dispatch<React.SetStateAction<Game[]>> }>
	= ({ games, setGames }): JSX.Element =>
		<div className="chart-container">
			<button onClick={() => setGames([])}>Clear Games</button>
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
					angle={50}
					textAnchor="start"
					height={300}
					width={300}
					interval={0}
				/>
				<YAxis />
				<Tooltip />
				<Bar dataKey="value" fill="black" />
			</BarChart>
		</div>;

export default GameChart;