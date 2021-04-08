import './SearchBar.css';

import React, { useState, ChangeEvent, useCallback } from 'react';
import { Game, getSearchedGames } from '../../services/gameService';
import _ from 'lodash';

const SearchBar:
	React.FC<{ games: Game[]; setGames: React.Dispatch<React.SetStateAction<Game[]>> }>
	= ({ games, setGames }): JSX.Element => {
		const [searchResults, setSearchResults] = useState<Game[]>([]);

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
			setGames(games.concat(game));
		};

		return (
			<div className="search-container">
				<input
					type="text"
					className="search-bar"
					onChange={(event) => handleSearchChange(event)}
					placeholder={'Search for games'}
				/>
				{
					searchResults.length
						? <div className="search-results">
							{searchResults.map(game =>
								<div
									key={game.id}
									className="search-result"
									onClick={() => addGame(game)}
								>
									{game.name}
								</div>
							)}
						</div>
						: <></>
				}
			</div>

		);
	};

export default SearchBar;
