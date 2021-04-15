import './GameChart.css';
import { FC, useState } from 'react';
import { Game } from '../../services/gameService';
import { BarChart, XAxis, Tooltip, YAxis, Bar } from 'recharts';

import Dropdown from '../Dropdown';

const GameChart: FC<{ games: Game[]; setGames: React.Dispatch<React.SetStateAction<Game[]>> }>
	= ({ games, setGames }): JSX.Element => {
		const [completionTypes, setCompletionTypes] = useState<string[]>(['Main', 'Extra', 'Complete']);

		const chartData = games.map(game => ({
			title: game.name,
			...(completionTypes.includes('Main') ? { ['Main']: game.gameplayMain } : {}),
			...(completionTypes.includes('Extra') ? { ['Extra']: game.gameplayMainExtra } : {}),
			...(completionTypes.includes('Complete') ? { ['Complete']: game.gameplayCompletionist } : {}),

		}));

		return (
			<div className="chart-container">
				<div className="chart-options">
					<button onClick={() => setGames([])}>Clear Games</button>
					<Dropdown
						options={['Main', 'Extra', 'Complete']}
						selected={completionTypes}
						setSelected={setCompletionTypes}
					/>
				</div>
				{
					completionTypes.length
						? <BarChart
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
							<Bar dataKey="Main" fill="#abcfec" />
							<Bar dataKey="Extra" fill="#6697c2" />
							<Bar dataKey="Complete" fill="#106ec0" />
						</BarChart>
						: <div>No completion types selected...</div>
				}

			</div>
		);
	};

export default GameChart;