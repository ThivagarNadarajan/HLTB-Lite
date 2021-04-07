import './GameChart.css';
import React from 'react';
import { Game } from '../../services/gameService';
import { BarChart, XAxis, Tooltip, YAxis, Bar } from 'recharts';

const GameChart: React.FC<{ games: Game[]; setGames: React.Dispatch<React.SetStateAction<Game[]>> }>
	= ({ games, setGames }): JSX.Element => {

		const chartData = games.map(game => ({
			title: game.name,
			['Main']: game.gameplayMain,
			['Extra']: game.gameplayMainExtra,
			['Complete']: game.gameplayCompletionist
		}));

		return (
			<div className="chart-container">
				<button onClick={() => setGames([])}>Clear Games</button>
				<BarChart
					width={500}
					height={500}
					margin={{ right: 100 }}
					data={chartData}
				>
					<XAxis
						dataKey="title"
						angle={50}
						textAnchor="start"
						height={300}
						width={300}
						interval={0}
					/>
					<YAxis />
					<Tooltip />
					<Bar dataKey="Main" fill="black" />
					<Bar dataKey="Extra" fill="salmon" />
					<Bar dataKey="Complete" fill="lightblue" />
				</BarChart>
			</div>
		);
	};

export default GameChart;