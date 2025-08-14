import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	let pageState = defaultArticleState;

	const applySettings = (newState: ArticleStateType) => {
		pageState = newState;
		updateStyles();
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

	updateStyles();

	return (
		<main className={clsx(styles.main)}>
			<ArticleParamsForm onApply={applySettings} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
