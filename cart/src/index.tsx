import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	//index root에 전역으로 사용하기위해서 useReducer 선언한다.
	<AppProvider>
		<App />
	</AppProvider>
);
