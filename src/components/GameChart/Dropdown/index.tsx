import './Dropdown.css';
import { FC, useState, useEffect, useRef } from 'react';

const Dropdown: FC<{
	options: string[];
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}>
	= ({ options, selected, setSelected }) => {
		const [dropdownOpen, setdropdownOpen] = useState(false);
		const node = useRef<HTMLDivElement>(null);

		useEffect(() => {
			document.addEventListener('mousedown', handleClick);
		}, []);

		const handleClick = (event: MouseEvent) => {
			if (node.current && !node.current.contains(event.target as Node)) {
				setdropdownOpen(false);
			}
		};

		return (
			<div className="dropdown-container"
				ref={node}
				onClick={() => setdropdownOpen(true)}
			>
				<div className="dropdown-selection">
					{
						selected.length
							? selected.map((s, idx) =>
								<div key={idx} className='selected'>
									<span className='selected-label'>{s}</span>
									<span className='remove'
										onClick={
											(event) => {
												event.stopPropagation();
												setSelected(selected.filter(r => s !== r));
											}
										}
									>
										x
								</span>
								</div>
							)
							: <span className='placeholder'>Select...</span>
					}
				</div>
				{
					dropdownOpen
						?
						<div className="dropdown-options" >
							{selected.length !== options.length
								? <li onClick={() => setSelected(options)}>All</li>
								: <li>...</li>
							}
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