import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';
import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { CartList } from './CartList';

function Shop() {
	const [goods, setGoods] = useState([]);
	const [loading, setLoading] = useState(true);
	const [order, setOrder] = useState([])
	const [isCartShow, setCartShow] =useState(false);

	const addToCart = (item) => {
		const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);
		

		if (itemIndex < 0) {
			const newItem = {
				...item,
				quantity: 1,
			}
			setOrder([...order, newItem])
		} else {
			const newOrder = order.map((orderItem, index) => {
				if(index === itemIndex) {
					return {
						...orderItem,
						quantity: orderItem.quantity + 1,
					}
				} else {
					return orderItem;
				}
			})

			setOrder(newOrder);
		}
	};

	const handleCartShow = () => {
		setCartShow(!isCartShow);
	};

	useEffect(function getGoods() {
		fetch(API_URL, {
			headers: {
				'Authorization': API_KEY,
			},
		}).then(response => response.json()).then(data => {
			data.shop && setGoods(data.shop);
			setLoading(false);
		});
	}, []);

	return (
		<main className="content container">
			<Cart quantity={order.length} handleCartShow={handleCartShow}/>
			{
				loading ? <Preloader /> : <GoodsList goods={goods} addToCart={addToCart} />
			}
			{
				isCartShow && <CartList order={order} handleCartShow={handleCartShow} />
			}
		</main>
	)
}

export {
	Shop
}