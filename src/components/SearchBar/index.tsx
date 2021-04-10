import './SearchBar.css';

import React, { useState, ChangeEvent, useCallback, useRef, useEffect } from 'react';
import { Game, getSearchedGames } from '../../services/gameService';
import _ from 'lodash';

const SearchBar:
	React.FC<{ games: Game[]; setGames: React.Dispatch<React.SetStateAction<Game[]>> }>
	= ({ games, setGames }): JSX.Element => {
		const [searchOpen, setSearchOpen] = useState(false);
		const [searchResults, setSearchResults] = useState<Game[]>([]);

		const node = useRef<HTMLDivElement>(null);

		useEffect(() => {
			document.addEventListener('mousedown', handleClick);
		}, []);

		const handleClick = (event: MouseEvent) => {
			if (node.current && !node.current.contains(event.target as Node)) {
				setSearchOpen(false);
			}
		};

		const fetchSearchedGames = async (search: string) => {
			const results = search ? await getSearchedGames(search) : [];
			setSearchResults(results);
		};

		const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
			debounce(event.target.value.trim());
		};

		const debounce = useCallback(
			_.debounce((_searchVal: string) => {
				fetchSearchedGames(_searchVal);
			}, 100),
			[]
		);

		const addGame = (game: Game) => {
			if (!games.some(currentGame => currentGame.name === game.name)) {
				setGames(games.concat(game));
			}
		};

		return (
			<div className="search-container" ref={node}>
				<input
					type="text"
					className="search-bar"
					onClick={() => setSearchOpen(true)}
					onChange={(event) => handleSearchChange(event)}
					placeholder={'Search for games'}
				/>
				{
					searchResults.length && searchOpen
						?
						<>
							<hr />
							<div className="results-container">
								{searchResults.map(game =>
									<div
										key={game.id}
										className="result-entry"
										onClick={() => addGame(game)}
									>
										<div className='result-info'>
											<span className="result-title">{game.name}</span>
											<div className='completion-tags'>
												<span>{`Main Story: ${game.gameplayMain}`}</span>
												<span>{`Main + Extras: ${game.gameplayMainExtra}`}</span>
												<span>{`Main Story: ${game.gameplayCompletionist}`}</span>
											</div>
										</div>
										<span>+</span>
									</div>
								)}
							</div>
						</>
						: <></>
				}
			</div>

		);
	};

export default SearchBar;
