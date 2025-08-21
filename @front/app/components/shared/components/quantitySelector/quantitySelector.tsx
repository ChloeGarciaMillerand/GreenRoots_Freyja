import { useState } from "react";
import "./quantitySelector.css";

export const QuantitySelector = () => {
	const [count, setCount] = useState(1);

	const increment = () => {
		setCount(count + 1);
	};

	const decrement = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	return (
		<div className="quantity-selector">
			<button type="button" onClick={decrement} disabled={count === 1}>
				-
			</button>
			<span className="quantity-count">{count}</span>
			<button type="button" onClick={increment}>
				+
			</button>
		</div>
	);
};
