// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import './GameChart.css';
import { FC, useState, useEffect } from 'react';
import { Game } from '../../services/gameService';
import { BarChart, XAxis, Tooltip, YAxis, Bar, Rectangle } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { Icon } from '@iconify/react';
import closeIcon from '@iconify-icons/ion/close';
import pencilOutline from '@iconify-icons/ion/pencil-outline';

import Dropdown from './Dropdown';

enum CompletionTypes {
	Main = 'Main',
	Extra = 'Extra',
	Complete = 'Complete'
}

const GameChart: FC<{ games: Game[]; setGames: React.Dispatch<React.SetStateAction<Game[]>> }>
	= ({ games, setGames }): JSX.Element => {
		const [completionTypes, setCompletionTypes] = useState<string[]>(Object.values(CompletionTypes));
		const [isMobile, setIsMobile] = useState(false);
		const [editMode, setEditMode] = useState(false);

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
			...(completionTypes.includes(CompletionTypes.Main) ? { [CompletionTypes.Main]: game.gameplayMain } : {}),
			...(completionTypes.includes(CompletionTypes.Extra) ? { [CompletionTypes.Extra]: game.gameplayMainExtra } : {}),
			...(completionTypes.includes(CompletionTypes.Complete) ? { [CompletionTypes.Complete]: game.gameplayCompletionist } : {}),

		}));


		return (
			<div className="chart-container">
				<div className="chart-options">
					<Dropdown
						options={Object.values(CompletionTypes)}
						selected={completionTypes}
						setSelected={setCompletionTypes}
					/>
					<div className="chart-controls">
						<button className={`chart-control edit-chart ${editMode && 'edit-enabled'}`} onClick={() => setEditMode(!editMode)}>
							<Icon icon={pencilOutline} />
						</button>
						<button className={'chart-control clear-chart'} onClick={() => setGames([])}>
							<Icon icon={closeIcon} />
						</button>
					</div>
				</div>
				{
					completionTypes.length
						?
						<div>
							<ResponsiveContainer width="100%" height={isMobile ? 500 : 600}>
								<BarChart
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
									<Tooltip
										cursor={<CustomCursor games={games} setGames={setGames} editMode={editMode} />}
										content={editMode && CustomTooltip}
									/>
									<Bar dataKey={CompletionTypes.Main} fill="#e15127" />
									<Bar dataKey={CompletionTypes.Extra} fill="#c4b693" />
									<Bar dataKey={CompletionTypes.Complete} fill="#1e5982" />

								</BarChart>
							</ResponsiveContainer>
						</div>
						: <div>No completion types selected...</div>
				}

			</div>
		);
	};


const CustomCursor = (props) => {
	const { x, y, width, height, payload, games, setGames, editMode } = props;
	return <Rectangle
		strokeWidth="2px"
		fill={editMode ? '#fa9696' : '#bde0ff'}
		x={x} y={y}
		width={width}
		height={height}
		onClick={
			editMode
				? (() => setGames(games.filter(game => game.name != payload[0].payload.title)))
				: () => null
		}
		style={editMode ? { cursor: 'pointer' } : {}}
	/>;
};

const CustomTooltip = () => {
	return <div className="removal-tooltip">Remove game from chart</div>;
};

export default GameChart;