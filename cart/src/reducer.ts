//reducer 함수는 2가지 인자를 받는다.
//여기서 예외처리를 해서 state 원하는 값을 만들수있다.
//이벤트가 일어날때 dispatch로 값을 전달해서 action활용하면 된다.
const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'CLEAR_CART':
			// 초기화
			return { ...state, cart: [] };
		case 'REMOVE':
			//filter 함수로 cart id화 playload id 맞지 않는것들만 새로운 배열로 반환 받는다.
			return { ...state, cart: state.cart.filter((item: any) => item.id !== action.payload) };
		case 'GET_TOTAL':
			//reduce 함수를 활용해서 total 개수와 값을 구한다.
			let { total, amount } = state.cart.reduce(
				// 첫번째 인자는 누적값, 두번째 인자는 현잿값
				(total: any, item: any) => {
					const { price, amount } = item;
					//누적값과 현재 값을 곱해서 총값을 구한다
					const itemTotal = price * amount;
					total.total += itemTotal; //total.total = total.total + itemTotal 같은뜻
					total.amount += amount; // total.amount = total.amount + amount 같은뜻
					return total;
				},
				//초기값 설정
				{
					total: 0,
					amount: 0,
				}
			);
			total = parseFloat(total.toFixed(2));
			return { ...state, total, amount };
		case 'LOADING':
			return { ...state, loading: true };
		case 'DISPLAY_ITEMS':
			return { ...state, cart: action.payload, loading: false };
		case 'TOGGLE_AMOUNT':
			let tempCart = state.cart
				.map((val: any) => {
					if (val.id === action.payload.id) {
						if (action.payload.type === 'inc') {
							return { ...val, amount: val.amount + 1 };
						} else {
							return { ...val, amount: val.amount - 1 };
						}
					}

					return val;
				})
				.filter((item: any) => item.amount !== 0);
			return { ...state, cart: tempCart };
	}
	throw new Error('no action type');
};

export default reducer;
