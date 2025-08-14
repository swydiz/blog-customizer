import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply?: (state: ArticleStateType) => void;
	value: ArticleStateType;
};

const fontSizeOptions: OptionType[] = [
	{ value: '18px', title: '18px', className: '' },
	{ value: '25px', title: '25px', className: '' },
	{ value: '38px', title: '38px', className: '' },
];

export const ArticleParamsForm = ({
	onApply,
	value,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(value);
	const formRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setFormState(value);
	}, [value]);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onClose: () => setIsMenuOpen(false),
		onChange: (newValue) => setIsMenuOpen(newValue),
	});

	const handleToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleReset = () => {
		const initialState = defaultArticleState;
		setFormState(initialState);
		if (onApply) onApply(initialState);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (onApply) onApply(formState);
	};

	const handleChange = (type: string, newOption: OptionType) => {
		setFormState((prev) => ({ ...prev, [type]: newOption }));
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				ref={formRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.formSection}>
						<Text weight={800} size={12} uppercase>
							Шрифт
						</Text>
						<Select
							options={fontFamilyOptions}
							value={formState.fontFamilyOption}
							onChange={(option) => handleChange('fontFamilyOption', option)}
						/>
					</div>
					<div className={styles.formSection}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) => handleChange('fontSizeOption', option)}
							title='Размер шрифта'
						/>
					</div>
					<div className={styles.formSection}>
						<Text weight={800} size={12} uppercase>
							Цвет текста
						</Text>
						<Select
							options={fontColors}
							value={formState.fontColor}
							onChange={(option) => handleChange('fontColor', option)}
						/>
					</div>
					<Separator />
					<div className={styles.formSection}>
						<Text weight={800} size={12} uppercase>
							Цвет фона
						</Text>
						<Select
							options={backgroundColors}
							value={formState.backgroundColor}
							onChange={(option) => handleChange('backgroundColor', option)}
						/>
					</div>
					<div className={styles.formSection}>
						<Text weight={800} size={12} uppercase>
							Ширина контента
						</Text>
						<Select
							options={contentWidthArr}
							value={formState.contentWidth}
							onChange={(option) => handleChange('contentWidth', option)}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
