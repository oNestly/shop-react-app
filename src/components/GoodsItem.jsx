import { useContext } from "react";
import { ShopContext } from "../context";

function GoodsItem(props) {
	const {
		mainId: id,
		displayName: name,
		displayDescription: description,
		price: {
			regularPrice: price
		},
		displayAssets: [
			{
				background: img
			}
		],
	} = props;

	const {addToCart} = useContext(ShopContext);

	return (
		<div className="card">
			<div className="card-image">
				<img src={img} alt={name} />
			</div>
			<div className="card-content">
				<span className="card-title">{name}</span>
				<p>{description}</p>
			</div>
			<div className="card-action">
				<button className="btn" onClick={() => addToCart({
					id,
					name,
					price,
				})}>Купить</button>
				<span className="right" style={{fontSize: '1.8rem'}}>{price} руб.</span>
			</div>
		</div>
	)
}

export {
	GoodsItem
}