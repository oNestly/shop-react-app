import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';
import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { CartList } from './CartList';
import { Alert } from './Alert';

function Shop() {
	const [goods, setGoods] = useState([]);
	const [loading, setLoading] = useState(true);
	const [order, setOrder] = useState([])
	const [isCartShow, setCartShow] = useState(false);
	const [alertName, setAlertName] = useState('');

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
		setAlertName(item.name);
	};

	const removeFromCart = (itemId) => {
		const newOrder = order.filter(el => el.id !== itemId);
		setOrder(newOrder);
	};

	const incrQuantity = (itemId) => {
		const newOrder = order.map(el => {
			if (el.id === itemId) {
				const newQuantity = el.quantity + 1;
				return {
					...el,
					quantity: newQuantity < 100 ? newQuantity : 99,
				}
			} else {
				return el;
			}
		});
		setOrder(newOrder);
	};

	const decrQuantity = (itemId) => {
		const newOrder = order.map(el => {
			if (el.id === itemId) {
				const newQuantity = el.quantity - 1;
				return {
					...el,
					quantity: newQuantity >= 0 ? newQuantity : 0,
				}
			} else {
				return el;
			}

		});
		setOrder(newOrder);
	};

	const handleCartShow = () => {
		setCartShow(!isCartShow);
	};

	const closeAlert = () => {
		setAlertName('')
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
				isCartShow && 
				<CartList 
					order={order} 
					handleCartShow={handleCartShow} 
					removeFromCart={removeFromCart}
					incrQuantity={incrQuantity}
					decrQuantity={decrQuantity}
				/>
			}
			{
				alertName && <Alert name={alertName} closeAlert={closeAlert} />
			}
		</main>
	)
}

export {
	Shop
}