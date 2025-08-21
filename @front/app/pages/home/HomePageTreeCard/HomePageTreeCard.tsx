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
			<img src={image} alt={name} style={{ width: "100%", height: "auto" }} />
			<h3>{name}</h3>
			<p>Prix : {price} €</p>
			<p>Localisation : {localization}</p>
			<p>Projet : {project_name}</p>
			<AddCartButton treeId={treeId} />
		</div>
	);
}

export default HomePageTreeCard;
