import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { cartService } from "~/services/cartService";

export default function SuccessPage() {
	const [searchParams] = useSearchParams();
	const isSuccess = searchParams.get("success");
	const isCanceled = searchParams.get("canceled");

	useEffect(() => {
		if (isSuccess) {
			// if payment successfull -> delete cart
			cartService.clearCart();
		}
	}, [isSuccess]);

	return (
		<div>
			{/* if payment successfull */}
			{isSuccess && <h2>Commande confirmée!</h2>}
			{isSuccess && (
				<p>
					Merci pour votre commande. Vous recevrez un mail de confirmation avec
					les détails de votre commande.
				</p>
			)}
			<Link to="/">Retour à l'accueil</Link>

			{/* if payment failed */}
			{isCanceled && <h2>Commande non confirmée...</h2>}
			{isCanceled && (
				<p>Nous sommes désolés, le paiement n'a pas été validé.</p>
			)}
			<Link to="/shopping-cart">Retour au panier</Link>
		</div>
	);
}
