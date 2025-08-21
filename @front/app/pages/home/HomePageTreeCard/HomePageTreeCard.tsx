import type { HomePageTreeCardProps } from "@types";
import { AddCartButton } from "~/components/shared/components/addCartButton";

function HomePageTreeCard({
	treeId,
	name,
	price,
	image,
	localization,
	project_name,
}: HomePageTreeCardProps) {
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
					<AddCartButton treeId={treeId} />
				</div>
			</div>
		</div>
	);
}

export default HomePageTreeCard;
