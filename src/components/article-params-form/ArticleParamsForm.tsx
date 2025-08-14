import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
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
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply?: (state: ArticleStateType) => void;
};

const createFontSizeOption = (value: string, title: string) => ({
	value,
	title,
	className: '',
});

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleReset = () => {
		const initialState = defaultArticleState;
		setFormState(initialState);
		if (onApply) {
			onApply(initialState);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (onApply) {
			onApply(formState);
		}
	};

	const handleChange = (type: string, newOption: OptionType) => {
		setFormState((prev) => ({ ...prev, [type]: newOption }));
	};

	const handleFontSizeClick = (size: string) => {
		const newOption = createFontSizeOption(size, size);
		handleChange('fontSizeOption', newOption);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={
					styles.container + (isOpen ? ' ' + styles.container_open : '')
				}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.formSection}>
						<label>Шрифт</label>
						<Select
							options={fontFamilyOptions}
							value={formState.fontFamilyOption}
							onChange={(option) => handleChange('fontFamilyOption', option)}
						/>
					</div>
					<Separator />
					<div className={styles.formSection}>
						<label>Размер шрифта</label>
						<div className={styles.buttonGroup}>
							<Button
								title='18px'
								htmlType='button'
								type='apply'
								onClick={() => handleFontSizeClick('18px')}
								className={
									formState.fontSizeOption.value === '18px'
										? styles.activeButton
										: ''
								}
							/>
							<Button
								title='25px'
								htmlType='button'
								type='apply'
								onClick={() => handleFontSizeClick('25px')}
								className={
									formState.fontSizeOption.value === '25px'
										? styles.activeButton
										: ''
								}
							/>
							<Button
								title='38px'
								htmlType='button'
								type='apply'
								onClick={() => handleFontSizeClick('38px')}
								className={
									formState.fontSizeOption.value === '38px'
										? styles.activeButton
										: ''
								}
							/>
						</div>
					</div>
					<Separator />
					<div className={styles.formSection}>
						<label>Цвет текста</label>
						<Select
							options={fontColors}
							value={formState.fontColor}
							onChange={(option) => handleChange('fontColor', option)}
						/>
					</div>
					<Separator />
					<div className={styles.formSection}>
						<label>Цвет фона</label>
						<Select
							options={backgroundColors}
							value={formState.backgroundColor}
							onChange={(option) => handleChange('backgroundColor', option)}
						/>
					</div>
					<Separator />
					<div className={styles.formSection}>
						<label>Ширина контента</label>
						<Select
							options={contentWidthArr}
							value={formState.contentWidth}
							onChange={(option) => handleChange('contentWidth', option)}
						/>
					</div>
					<Separator />
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
