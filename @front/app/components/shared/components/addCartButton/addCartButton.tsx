import { useState } from "react";
import "./addCartButton.css";

type AddCartButtonProps = {
	treeId: number;
};

export const AddCartButton = ({ treeId }: AddCartButtonProps) => {
	const [isAdded, setIsAdded] = useState(false);

	// handleAddToCart to be modified when the API is ready
	const handleAddToCart = () => {
		console.log(`Arbre ${treeId} ajouté au panier`);

		setIsAdded(true);

		// State reset after 3 seconds
		setTimeout(() => {
			setIsAdded(false);
		}, 3000);
	};

	return (
		<button
			type="button"
			onClick={handleAddToCart}
			disabled={isAdded} // after adding to the cart, the button is disabled according to the timeout
			className={`add-cart-button ${isAdded ? "added" : ""}`}
		>
			{/* after adding to the cart, the text of the button is changed according to the timeout*/}
			{isAdded ? "Ajouté" : "Ajouter au panier"}
		</button>
	);
};
