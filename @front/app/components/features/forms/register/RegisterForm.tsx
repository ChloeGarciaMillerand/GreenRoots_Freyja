import { Form, useActionData } from "react-router";
import "./RegisterForm.css";

function RegisterForm() {
	const actionData = useActionData();

	return (
		<Form method="POST">
			{actionData?.errors?.form ? (
				<p role="alert">{actionData?.errors?.form}</p>
			) : null}
			<div className="form-container">
				<div className="field">
					<label htmlFor="first_name">Prénom</label>
					<input
						id="first_name"
						name="first_name"
						aria-describedby={
							actionData?.errors?.first_name ? "first_name-error" : undefined
						}
					/>
					{actionData?.errors?.first_name ? (
						<p id="first_name-error">{actionData?.errors?.first_name}</p>
					) : null}
				</div>
				<div className="field">
					<label htmlFor="last_name">Nom</label>
					<input
						id="last_name"
						name="last_name"
						aria-describedby={
							actionData?.errors?.last_name ? "last_name-error" : undefined
						}
					/>
					{actionData?.errors?.last_name ? (
						<p id="last_name-error">{actionData?.errors?.last_name}</p>
					) : null}
				</div>
				<div className="field">
					<label htmlFor="email">* Email:</label>
					<input
						id="email"
						name="email"
						required
						aria-describedby={
							actionData?.errors?.email ? "email-error" : undefined
						}
					/>
					{actionData?.errors?.email ? (
						<p id="email-error">{actionData?.errors?.email}</p>
					) : null}
				</div>
				<div className="field">
					<label htmlFor="phone_number">Numéro de téléphone</label>
					<input
						id="phone_number"
						name="phone_number"
						aria-describedby={
							actionData?.errors?.phone_number
								? "phone_number-error"
								: undefined
						}
					/>
					{actionData?.errors?.phone_number ? (
						<p id="phone_number-error">{actionData?.errors?.phone_number}</p>
					) : null}
				</div>
				<div className="field">
					<label htmlFor="password">* Mot de passe:</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						aria-describedby={
							actionData?.errors?.password ? "password-error" : undefined
						}
					/>
					{actionData?.errors?.password ? (
						<p id="password-error">{actionData?.errors?.password}</p>
					) : null}
				</div>
				<div className="field">
					<label htmlFor="confirm-password">* Confirmer le mot de passe:</label>
					<input
						type="password"
						id="confirm-password"
						name="confirm-password"
						required
					/>
				</div>
				<button type="submit" className="button-submission">
					Créer un compte
				</button>
			</div>
		</Form>
	);
}

export default RegisterForm;
