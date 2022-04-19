function CartItem(props) {
	const {
		id,
		name,
		price,
		quantity
	} = props;
	return (
		<li className="collection-item">
			{name} x{quantity} = {price}
			<span className="secondary-content">
				<i className="material-icons cartItem-close">close</i>
			</span>
		</li>
	)
}

export {
	CartItem
}