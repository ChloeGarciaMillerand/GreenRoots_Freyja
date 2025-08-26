import { Form } from "react-router";
import "./RegisterForm.css";

function RegisterForm() {
	return (
		<Form method="POST">
			<div className="form-container">
				<div className="field">
					<label htmlFor="email">Email:</label>
					<input id="email" name="email" required />
				</div>
				<div className="field">
					<label htmlFor="password">Mot de passe:</label>
					<input type="password" id="password" name="password" required />
				</div>
				<div className="field">
					<label htmlFor="password">Confirmer le mot de passe:</label>
					<input
						type="password"
						id="confirm-password"
						name="confirm-password"
						required
					/>
				</div>
				<button type="submit" className="button-connexion">
					Créer un compte
				</button>
			</div>
		</Form>
	);
}

export default RegisterForm;
