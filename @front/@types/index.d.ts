import type { Key } from "react";

export type HomePageTreeCardProps = {
	treeId: number;
	name: string;
	price: number;
	image: string;
	localization: string;
	project_name: string;
};

export type TreeHomePage = {
	tree_id: Key;
	name: string;
	price: number;
	image: string;
	localization: string;
	project_name: string;
};
