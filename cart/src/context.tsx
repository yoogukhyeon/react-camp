import React, { useState, useContext, useReducer, useEffect, ReactNode } from 'react';
import cartItems from './data';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';

interface IProps {
	children: ReactNode;
}

interface Cart {
	id: number;
	img: string;
	title: string;
	price: number;
	amount: number;
}

interface InitialState {
	loading: boolean;
	cart: Cart[];
	total: number;
	amount: number;
	clearCart?: () => void;
	remove?: ((key: number) => void) | any;
	toggleAmount?: ((key: string | number) => void) | any;
}

//초기값 셋팅
const initialState: InitialState = {
	loading: false,
	cart: [],
	total: 0,
	amount: 0,
};

const AppContext = React.createContext(initialState);

const AppProvider = ({ children }: IProps) => {
	//useReducer로 새로운 state 생성
	//useState처럼 첫번째는 state 가진다.
	//두번쨰 요소는 useReducer가 만들어준 dispatch가 들어있다.
	//useReducer 인자를 2가지를 받는다. 두번째는 state 들어갈 초기값을 받는다.
	const [state, dispatch] = useReducer(reducer, initialState);

	const clearCart = () => {
		dispatch({ type: 'CLEAR_CART' });
	};
	const remove = (id: number) => {
		dispatch({ type: 'REMOVE', payload: id });
	};

	const toggleAmount = (id: number, type: string) => {
		dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } });
	};

	//state 변경될때마다 dispatch 실행
	useEffect(() => {
		dispatch({ type: 'GET_TOTAL' });
	}, [state.cart]);

	const fetchData = async () => {
		dispatch({ type: 'LOADING' });
		const response = await fetch(url);
		const cart = await response.json();
		dispatch({ type: 'DISPLAY_ITEMS', payload: cart });
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<AppContext.Provider
			value={{
				...state,
				clearCart,
				remove,
				toggleAmount,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
// 전역으로 쉽게 사용하기위해서 선언
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
