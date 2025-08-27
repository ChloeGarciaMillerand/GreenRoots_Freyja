export type TreeCardProps = {
	tree_id: number;
	name: string;
	price: number;
	image: string;
	localization: string;
	project_name: string;
};

export type User = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	role: string;
};

export type Item = {
	tree_id: number;
	quantity: string;
	price: number;
};
