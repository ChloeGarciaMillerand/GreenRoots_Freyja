import { Link, redirect, useSubmit } from "react-router";
import { cartService } from "~/services/cartService";
import { getSession } from "~/services/sessions.server";

import type { Route } from "./+types/shoppingCart";
import "./shoppingCart.css";
import { QuantitySelector } from "~/components/shared/components/quantitySelector/quantitySelector";
import { useState } from "react";

import type { Item } from "@types";

import iconTrash from "~/../assets/icons/iconTrash.svg";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
	style: "currency",
	currency: "EUR",
});

const Currency = ({ value }: CurrencyProps) => {
	return <>{priceFormatter.format(value)}</>;
};

type CurrencyProps = { value: number };

const API_URL = import.meta.env.VITE_API_URL;

export async function action(args: Route.ActionArgs) {
	// check if a user is logged in
	const session = await getSession(args.request.headers.get("Cookie"));
	const token = session.get("token");
	console.log("Token:", token);
	// if not, redirect to the login page
	if (!token) {
		return redirect("/login");
	}
	// if yes, retrieve the formData

	// to test after reset db
	//const formData = await args.request.json();
	//const items = formData.items;
	const formData = await args.request.formData();
	const rawItems = formData.get("items");
	if (!rawItems) {
		return new Response("Panier vide ou invalide", { status: 400 });
	}
	let items: Item;
	try {
		const parsedItems = JSON.parse(rawItems.toString());

		// On filtre chaque item pour ne garder que les 3 champs requis
		items = parsedItems.map((item: Item) => ({
			tree_id: item.tree_id,
			quantity: item.quantity,
			price: item.price,
		}));
	} catch (e) {
		return new Response("Erreur de parsing JSON", { status: 400 });
	}

	console.log(items);

	// save the cart to the backend
	const response = await fetch(`${API_URL}/api/orders`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ items }),
	});

	if (!response.ok) {
		const result = await response.json().catch(() => null);
		const message =
			result?.message || "Erreur lors de l'enregistrement de la commande.";
		return new Response(message, { status: 500 });
	}

	const order = await response.json();
	// redirect to Stripe Url
	return redirect("/result.url");
}

export default function ShoppingCart() {
	return (
		<main className="shopping-cart">
			<div>
				<h2>Panier</h2>
				<Link to="/catalog">&lt; Poursuivre mes achats</Link>
			</div>

			<ShoppingCartList />
		</main>
	);
}

const ShoppingCartList = () => {
	const [shoppingCart, setShoppingCart] = useState(() => cartService.getCart());

	const submit = useSubmit();

	return (
		<>
			<table className="cart-container">
				<thead>
					<tr>
						<th>Produit</th>
						<th>Quantité</th>
						<th>Prix</th>
					</tr>
				</thead>
				<tbody>
					{shoppingCart.items.map((item: Item) => (
						<ShoppingCartItem
							key={item.tree_id}
							item={item}
							onUpdate={() => {
								setShoppingCart(cartService.getCart());
							}}
						/>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={2} className="cart-total-text">
							TOTAL prévisionnel
						</td>
						<td className="cart-total-value">
							<Currency value={shoppingCart.total} />
						</td>
					</tr>
				</tfoot>
			</table>
			<div className="validation-button-container">
				<button
					className="validation-button"
					type="button"
					onClick={() => {
						const formData = new FormData();
						formData.append("items", JSON.stringify(shoppingCart.items));
						submit(formData, { method: "post" });
						//submit({ items: shoppingCart.items }, { method: "post" });
					}}
				>
					Valider mon panier
				</button>
			</div>
		</>
	);
};

const ShoppingCartItem = ({
	item,
	onUpdate,
}: { item: any; onUpdate: () => void }) => {
	return (
		<tr>
			<td className="item-description">
				<img className="item-image" src={item.image} alt={item.name} />
				<span className="item-name">{item.name}</span>
			</td>
			<td className="item-quantity">
				<div className="container-quantity">
					<QuantitySelector
						value={item.quantity}
						onChange={async (value) => {
							await cartService.updateItem(item.tree_id, value);
							onUpdate();
						}}
					/>
					<button
						type="button"
						className="icon-button"
						onClick={async () => {
							await cartService.removeItem(item.tree_id);
							onUpdate();
						}}
					>
						<img src={iconTrash} alt="supprimer" className="icon-trash" />
					</button>
				</div>
			</td>
			<td>
				<Currency value={item.quantity * item.price} />
			</td>
		</tr>
	);
};
