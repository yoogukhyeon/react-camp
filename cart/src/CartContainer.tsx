import React from 'react';
import CartItem from './Cartitem';
import { useGlobalContext } from './context';

const CartContainer = () => {
	const { cart, total, clearCart } = useGlobalContext();

	if (cart.length === 0) {
		return (
			<section className="cart">
				{/* cart header */}
				<header>
					<h2>your bag</h2>
					<h4 className="empty-cart">is currently empty</h4>
				</header>
			</section>
		);
	}
	return (
		<section className="cart">
			{/* cart header */}
			<header>
				<h2>나의 장바구니</h2>
			</header>
			{/* cart items */}
			<div>
				{cart.map((item: any) => {
					return <CartItem key={item.id} {...item} />;
				})}
			</div>
			{/* cart footer */}
			<footer>
				<hr />
				<div className="cart-total">
					<h4>
						총금액 <span>${total}</span>
					</h4>
				</div>
				<button className="btn clear-btn" onClick={clearCart}>
					장바구니 전체 삭제
				</button>
			</footer>
		</section>
	);
};

export default CartContainer;
