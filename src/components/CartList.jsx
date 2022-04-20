import { useContext } from 'react';
import { ShopContext } from '../context';
import { CartItem } from './CartItem';

function CartList() {
	const { 
		order =[], 
		handleCartShow = Function.prototype,
	} = useContext(ShopContext);

	const totalPrice = order.reduce((sum, el) => {
		return (
			sum + el.price * el.quantity
		);
	}, 0);

	return (
		<ul className="collection cart-list">
			<li className="collection-item active cart-list-name">
				Корзина
				<i className='material-icons cart-list-close' onClick={handleCartShow}>close</i>
			</li>
			{
				order.length ? order.map((item, index) => (
					<CartItem 
						key={index} 
						{...item}
					/>
				)) : <li className="collection-item">Корзина пуста</li>
			}
			<li className="collection-item active">
				Общая стоимость: {totalPrice} руб.
			</li>
			<li className="collection-item active">
				<button className="btn">Оформить</button>
			</li>
			
		</ul>
	)
}

export {
	CartList
}