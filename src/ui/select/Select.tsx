import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import styles from './Select.module.scss';

type SelectProps = {
	options: OptionType[];
	value: OptionType;
	onChange: (option: OptionType) => void;
	placeholder?: string;
	title?: string;
};

export const Select = ({
	options,
	value,
	onChange,
	placeholder = 'Выберите опцию',
	title,
}: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);
	const optionClassName = value?.optionClassName ?? '';

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false);
		onChange(option);
	};

	const handlePlaceholderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.container}>
			{title && (
				<Text size={12} weight={800} uppercase>
					{title}
				</Text>
			)}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen}>
				<img src={arrowDown} alt='иконка стрелочки' className={styles.arrow} />
				<div
					className={clsx(
						styles.placeholder,
						(styles as Record<string, string>)[optionClassName]
					)}
					data-selected={!!value.value}
					onClick={handlePlaceholderClick}
					role='button'
					tabIndex={0}
					ref={placeholderRef}>
					<Text
						family={
							isFontFamilyClass(value.className) ? value.className : undefined
						}>
						{value.title || placeholder}
					</Text>
				</div>
				{isOpen && (
					<ul className={styles.select}>
						{options.map((option) => (
							<Option
								key={option.value}
								option={option}
								onClick={() => handleOptionClick(option)}
							/>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
