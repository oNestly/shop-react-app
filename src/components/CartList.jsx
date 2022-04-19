import { CartItem } from './CartItem';

function CartList(props) {
	const { order =[], handleCartShow = Function.prototype } = props;

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
					<CartItem key={index} {...item}/>
				)) : <li className="collection-item">Корзина пуста</li>
			}
			<li className="collection-item active">Общая стоимость: {totalPrice} руб.</li>
			
		</ul>
	)
}

export {
	CartList
}