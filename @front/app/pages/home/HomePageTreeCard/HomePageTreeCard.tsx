import type { HomePageTreeCardProps } from "@types";

function HomePageTreeCard({
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
		</div>
	);
}

export default HomePageTreeCard;
