import './Dropdown.css';
import { FC, useState } from 'react';

const Dropdown: FC<{
	options: string[];
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}>
	= ({ options, selected, setSelected }) => {
		const [dropdownOpen, setdropdownOpen] = useState(false);

		return (
			<div className="dropdown-container" onClick={() => setdropdownOpen(!dropdownOpen)}>
				<div className="dropdown-selection">
					{
						selected.map((s, idx) =>
							<div key={idx} className='selected'>
								<span className='selected-label'>{s}</span>
								<span className='remove'
									onClick={
										() => setSelected(selected.filter(r => s !== r))
									}
								>
									x
								</span>
							</div>
						)
					}
				</div>
				{
					dropdownOpen
						?
						<div className="dropdown-options" >
							<li onClick={() => setSelected(options)}>All</li>
							{
								options
									.filter(option => !selected.includes(option))
									.map((option, idx) =>
										<li key={idx}
											onClick={
												() => setSelected(selected.concat(option))
											}
										>
											{option}
										</li>
									)
							}
						</div>
						: <></>
				}
			</div>
		);
	};

export default Dropdown;