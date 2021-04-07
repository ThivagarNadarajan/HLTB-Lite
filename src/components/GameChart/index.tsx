import './GameChart.css';
import React, { ChangeEvent, useState } from 'react';
import { Game } from '../../services/gameService';
import { BarChart, XAxis, Tooltip, YAxis, Bar } from 'recharts';

const GameChart: React.FC<{ games: Game[]; setGames: React.Dispatch<React.SetStateAction<Game[]>> }>
	= ({ games, setGames }): JSX.Element => {

		const [completionTypes, setCompletionTypes] = useState<string[]>(['Main', 'Extra', 'Complete']);
		console.log('completionTypes', completionTypes);

		const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
			const type = event.target.value;
			setCompletionTypes(type === 'All' ? ['Main', 'Extra', 'Complete'] : [type]);
		};

		const chartData = games.map(game => ({
			title: game.name,
			...(completionTypes.includes('Main') ? { ['Main']: game.gameplayMain } : {}),
			...(completionTypes.includes('Extra') ? { ['Extra']: game.gameplayMainExtra } : {}),
			...(completionTypes.includes('Complete') ? { ['Complete']: game.gameplayCompletionist } : {}),

		}));

		return (
			<div className="chart-container">
				<button onClick={() => setGames([])}>Clear Games</button>
				<select name="completion" onChange={event => handleTypeChange(event)}>
					<option value='Main'>Main</option>
					<option value='Extra'>Extra</option>
					<option value='Complete'>Complete</option>
					<option value='All'>All</option>
				</select>
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