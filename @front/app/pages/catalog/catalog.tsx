import { Link } from "react-router";
import type { Route } from "./+types/catalog";

import HomePageTreeCard from "../home/HomePageTreeCard/HomePageTreeCard";
import type { TreeHomePage } from "@types";

export function meta() {
	return [
		{
			title:
				"GreenRoots - plantez des arbres pour lutter contre la déforestation",
		},
		{
			name: "description",
			content:
				"Parrainez un arbre dans un de nos projets de notre reforestation à travers le monde",
		},
	];
}

export async function loader(params: Route.LoaderArgs) {
	const apiUrl = "http://localhost:3000";

	const url = new URL(params.request.url);

	const limitParam = url.searchParams.get("limit");
	const limit = limitParam ? Number.parseInt(limitParam) : 6;

	const pageParam = url.searchParams.get("page");
	const page = pageParam ? Number.parseInt(pageParam) : 1;

	const response = await fetch(
		`${apiUrl}/api/trees?limit=${limit}&page=${page}`,
	);

	const json = await response.json();
	const trees = json.data;

	const pages = json.pagination.pages;

	return { trees, pages, page, limit };
}

export default function Catalog(props: Route.ComponentProps) {
	const { loaderData } = props;
	return (
		<main>
			<h1>Nos arbres</h1>
			<div className="tree-card-container">
				<ul>
					{loaderData.trees.map((tree: TreeHomePage) => (
						<li key={tree.tree_id}>
							<HomePageTreeCard
								treeId={tree.tree_id}
								name={tree.name}
								price={tree.price}
								image={tree.image}
								localization={tree.localization}
								project_name={tree.project_name}
							/>
						</li>
					))}
				</ul>
				<div>
					{loaderData.page > 1 ? (
						<Link to={`?page=${loaderData.page - 1}&limit=${loaderData.limit}`}>
							Page précédente
						</Link>
					) : null}
				</div>
				<div>
					{loaderData.page < loaderData.pages ? (
						<Link to={`?page=${loaderData.page + 1}&limit=${loaderData.limit}`}>
							Page suivante
						</Link>
					) : null}
				</div>
			</div>
		</main>
	);
}
