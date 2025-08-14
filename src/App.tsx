import { useState, useEffect } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import styles from './styles/index.module.scss';

const App = () => {
	const [pageState, setPageState] =
		useState<ArticleStateType>(defaultArticleState);

	const applySettings = (newState: ArticleStateType) => {
		setPageState(newState);
	};

	const updateStyles = () => {
		const mainElement = document.querySelector('main');
		if (mainElement) {
			mainElement.style.setProperty(
				'--font-family',
				pageState.fontFamilyOption.value
			);
			mainElement.style.setProperty(
				'--font-size',
				pageState.fontSizeOption.value
			);
			mainElement.style.setProperty('--font-color', pageState.fontColor.value);
			mainElement.style.setProperty(
				'--container-width',
				pageState.contentWidth.value
			);
			mainElement.style.setProperty(
				'--bg-color',
				pageState.backgroundColor.value
			);
		}
	};

	useEffect(() => {
		updateStyles();
	}, [pageState]);

	return (
		<main className={styles.main}>
			<ArticleParamsForm onApply={applySettings} value={pageState} />
			<Article />
		</main>
	);
};

export default App;
