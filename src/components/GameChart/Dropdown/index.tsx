import './Dropdown.css';
import { FC, useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import arrowdownAlt2 from '@iconify-icons/dashicons/arrow-down-alt2';
import closeIcon from '@iconify-icons/ion/close';

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
			>
				<div className={`dropdown-selection ${dropdownOpen ? 'selection-highlight' : ''}`}>
					{
						selected.length
							? selected.map((s, idx) =>
								<div key={idx} className='selected'>
									<span className='selected-chip'>{s}</span>
									<span className='remove'
										onClick={
											(event) => {
												event.stopPropagation();
												setSelected(selected.filter(r => s !== r));
											}
										}
									>
										<Icon icon={closeIcon} />
									</span>
								</div>
							)
							: <span className='placeholder'>Select...</span>
					}
					{
						selected.length !== options.length
							?
							<div onClick={() => setdropdownOpen(!dropdownOpen)} className="dropdown-toggle">
								<Icon icon={arrowdownAlt2} />
							</div>
							: <></>
					}

				</div>
				{
					dropdownOpen
						?
						<div className="options" >
							{selected.length !== options.length
								? <li onClick={() => setSelected(options)} className="option">All</li>
								: <>...</>
							}
							{
								options
									.filter(option => !selected.includes(option))
									.map((option, idx) =>
										<li key={idx}
											onClick={
												() => setSelected(selected.concat(option))
											}
											className="option"
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