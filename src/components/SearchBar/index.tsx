import './SearchBar.css';

import { useState, ChangeEvent, useCallback } from 'react';
import { Game, getSearchedGames } from '../../services/gameService';
import _ from 'lodash';

const SearchBar = (): JSX.Element => {
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

	return (
		<div className="search-container">
			<input className="search-bar" type="text" onChange={(event) => handleSearchChange(event)} />
			{
				searchResults.length
					? <div className="search-results">
						{searchResults.map(game =>
							<div key={game.id} className="search-result">{game.name}</div>
						)}
					</div>
					: <></>
			}
		</div>

	);
};

export default SearchBar;
