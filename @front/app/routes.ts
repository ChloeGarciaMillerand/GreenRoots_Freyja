import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("pages/home/home.tsx"),
	route("add-to-shopping-cart", "pages/addToShoppingCart.tsx"),
	route("catalog", "pages/catalog/catalog.tsx"),
] satisfies RouteConfig;
