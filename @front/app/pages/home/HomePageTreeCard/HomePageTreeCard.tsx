import { useState } from "react";
import type { HomePageTreeCardProps } from "@types";
import { AddCartButton } from "~/components/shared/components/addCartButton/addCartButton";
import { QuantitySelector } from "~/components/shared/components/quantitySelector/quantitySelector";

function HomePageTreeCard({
	treeId,
	name,
	price,
	image,
	localization,
	project_name,
}: HomePageTreeCardProps) {
	const [quantity, setQuantity] = useState(1);
	return (
		<div className="tree-card">
			<img src={image} alt={name} />
			<div className="tree-card-text-content">
				<div className="tree-card-name-price">
					<h3>{name}</h3>
					<p>Prix : {price} €</p>
				</div>
				<div className="tree-card-localization-project">
					<p>Localisation : {localization}</p>
					<p>Projet : {project_name}</p>
				</div>
				<div className="tree-card-add-cart">
					<QuantitySelector value={quantity} onChange={setQuantity} />
					<AddCartButton treeId={treeId} quantity={quantity} />
				</div>
			</div>
		</div>
	);
}

export default HomePageTreeCard;
