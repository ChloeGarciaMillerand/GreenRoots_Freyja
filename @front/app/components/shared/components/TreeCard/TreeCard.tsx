import { useState } from "react";
import type { TreeCardProps } from "@types";
import { QuantitySelector } from "~/components/shared/components/quantitySelector/quantitySelector";
import "./TreeCard.css";
import { Form, useNavigation } from "react-router";
import localizationIcon from "./icons/localization.svg";
import projectIcon from "./icons/project.svg";

// Import your cart service
import { cartService } from "~/services/cartService";

function TreeCard({
					  tree_id,
					  name,
					  price,
					  image,
					  localization,
					  project_name,
				  }: TreeCardProps) {
	const [quantity, setQuantity] = useState(1);
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const [cartMessage, setCartMessage] = useState<string | null>(null);
	const [cartError, setCartError] = useState<string | null>(null);

	const navigation = useNavigation();
	const isSubmitting = navigation.formAction === "/add-to-shopping-cart";

	// Handle add to cart functionality
	const handleAddToCart = async (event: React.FormEvent) => {
		event.preventDefault(); // Prevent form submission

		setIsAddingToCart(true);
		setCartMessage(null);
		setCartError(null);

		try {
			const result = await cartService.addItem(tree_id, quantity);

			if (result.success) {
				setCartMessage(`${quantity} ${name}(s) ajouté(s) au panier !`);

				// Optional: Reset quantity after successful add
				// setQuantity(1);

				// Optional: Show success message for a few seconds then hide
				setTimeout(() => {
					setCartMessage(null);
				}, 3000);

			} else {
				setCartError(result.error || "Erreur lors de l'ajout au panier");
			}
		} catch (error) {
			console.error('Error adding to cart:', error);
			setCartError("Erreur de connexion. Veuillez réessayer.");
		} finally {
			setIsAddingToCart(false);
		}
	};

	return (
		<Form className="tree-card" onSubmit={handleAddToCart}>
			<img src={image} alt={name} />
			<div className="tree-card-text-content">
				<div className="tree-card-name-price">
					<h3>{name}</h3>
					<p>Prix : {price} €</p>
				</div>
				<div className="tree-card-localization-project">
					<div className="tree-card-localization">
						<img
							src={localizationIcon}
							alt="picto représentant la localisation"
						/>
						<p>Localisation : {localization}</p>
					</div>
					<div className="tree-card-project">
						<img src={projectIcon} alt="picto représentant le projet" />
						<p>Projet : {project_name}</p>
					</div>
				</div>

				{/* Cart messages */}
				{cartMessage && (
					<div className="cart-success-message" style={{ color: 'green', marginBottom: '10px', fontSize: '14px' }}>
						{cartMessage}
					</div>
				)}
				{cartError && (
					<div className="cart-error-message" style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>
						{cartError}
					</div>
				)}

				<div className="tree-card-add-cart">
					<QuantitySelector value={quantity} onChange={setQuantity} />
					<input name="quantity" value={quantity} type="hidden" />
					<input name="treeId" value={tree_id} type="hidden" />
					<button
						type="submit"
						className="add-cart-button"
						disabled={isSubmitting || isAddingToCart}
					>
						{isAddingToCart ? "Ajout..." : "Ajouter au panier"}
					</button>
				</div>
			</div>
		</Form>
	);
}

export default TreeCard;