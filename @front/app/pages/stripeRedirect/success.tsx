import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { cartService } from "~/services/cartService";

export default function SuccessPage() {
	const [searchParams] = useSearchParams();
	const isSuccess = searchParams.get("success");
	const isError = searchParams.get("error");

	useEffect(() => {
		if (isSuccess === "true") {
			// if payment successfull -> delete cart
			cartService.clearCart();
		}
	}, [isSuccess]);

	return (
		<div>
			{/* if payment successfull */}
			{isSuccess === "true" && (
				<>
					<h2>Commande confirmée!</h2>
					<p>
						Merci pour votre commande. Vous recevrez un mail de confirmation
						avec les détails de votre commande.
					</p>
					<Link to="/">Retour à l'accueil</Link>
				</>
			)}
			{/* if payment failed */}
			{isError === "true" && (
				<>
					<h2>Une erreur est survenue</h2>
					<p>
						Une erreur est survenue lors du traitement de votre paiement.
						Veuillez réessayer.
					</p>
					<Link to="/">Retour à l'accueil</Link>
				</>
			)}
			u
		</div>
	);
}
