import { useEffect, useState } from 'react';
import { Game, getGames } from './services/gameService';

const App = (): JSX.Element => {

	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		const fetchGames = async () => {
			const result = await getGames();
			setGames(result);
		};
		fetchGames();
	}, []);

	return (
		<div>
			<div>HLTB Lite</div>
			<button onClick={() => console.log(games)}>Test</button>
			<input type="text"></input>
		</div>

	);
};

export default App;
