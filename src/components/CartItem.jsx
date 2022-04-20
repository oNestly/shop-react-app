import { useContext } from 'react';
import { ShopContext } from '../context';

function CartItem(props) {
	const {
		id,
		name,
		price,
		quantity,
	} = props;

	const {
		removeFromCart,
		incrQuantity,
		decrQuantity,
	} = useContext(ShopContext);

	const checkNullQuantity = (id) => {
		if (quantity > 1) {
			decrQuantity(id);
		} else {
			removeFromCart(id);
		}
	};

	return (
		<li className="collection-item">
			{name} 
			<i className="material-icons cart-quantity" onClick={() => checkNullQuantity(id)}>remove</i>
			{' '}x{quantity} 
			<i className="material-icons cart-quantity" onClick={() => incrQuantity(id)}>add</i>
			{' '}= {price * quantity} руб.
				<span className="secondary-content" onClick={() => removeFromCart(id)}>
					<i className="material-icons cartItem-close">close</i>
				</span>
		</li>
	)
}

export {
	CartItem
}