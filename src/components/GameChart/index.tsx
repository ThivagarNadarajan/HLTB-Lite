import './GameChart.css';
import { FC, useState, useEffect } from 'react';
import { Game } from '../../services/gameService';
import { BarChart, XAxis, Tooltip, YAxis, Bar } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { Icon } from '@iconify/react';
import closeIcon from '@iconify-icons/ion/close';

import Dropdown from './Dropdown';

const GameChart: FC<{ games: Game[]; setGames: React.Dispatch<React.SetStateAction<Game[]>> }>
	= ({ games, setGames }): JSX.Element => {
		const [completionTypes, setCompletionTypes] = useState<string[]>(['Main', 'Extra', 'Complete']);
		const [isMobile, setIsMobile] = useState(false);

		useEffect(() => {
			window.addEventListener('resize', () => {
				if (window.innerWidth <= 600) {
					setIsMobile(true);
				} else {
					setIsMobile(false);
				}
			});
		});

		const chartData = games.map(game => ({
			title: game.name,
			...(completionTypes.includes('Main') ? { ['Main']: game.gameplayMain } : {}),
			...(completionTypes.includes('Extra') ? { ['Extra']: game.gameplayMainExtra } : {}),
			...(completionTypes.includes('Complete') ? { ['Complete']: game.gameplayCompletionist } : {}),

		}));

		return (
			<div className="chart-container">
				<div className="chart-options">
					<Dropdown
						options={['Main', 'Extra', 'Complete']}
						selected={completionTypes}
						setSelected={setCompletionTypes}
					/>
					<button className="clear-chart" onClick={() => setGames([])}>
						<Icon icon={closeIcon} />
					</button>
				</div>
				{
					completionTypes.length
						?
						<div>
							<ResponsiveContainer width="100%" aspect={isMobile ? 1.0 / 1.7 : 1.0 / 1.0}>
								<BarChart
									width={500}
									height={500}
									margin={{ right: 50 }}
									data={chartData}
									className="chart"
								>
									<XAxis
										dataKey="title"
										angle={50}
										textAnchor="start"
										height={300}
										width={300}
										interval={0}
										stroke={'#b4bdc3'}
									/>
									<YAxis stroke={'#b4bdc3'} />
									<Tooltip />
									<Bar dataKey="Main" fill="#abcfec" />
									<Bar dataKey="Extra" fill="#6697c2" />
									<Bar dataKey="Complete" fill="#106ec0" />
								</BarChart>
							</ResponsiveContainer>
						</div>
						: <div>No completion types selected...</div>
				}

			</div>
		);
	};

export default GameChart;