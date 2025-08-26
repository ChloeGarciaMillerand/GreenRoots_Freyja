import type { Route } from "./+types/register";
import { redirect, useFetcher, data } from "react-router";
import RegisterForm from "~/components/features/forms/register/RegisterForm";
import "./register.css";

const API_URL = import.meta.env.VITE_API_URL;

type Errors = {
	email?: string;
	confirmPassword?: string;
};

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const email = String(formData.get("email"));
	const password = String(formData.get("password"));
	const confirmPassword = String(formData.get("confirm-password"));
	const userData = { email, password };

	const errors: Errors = {};

	if (!email.includes("@")) {
		errors.email = "Adresse mail invalide";
	}

	if (password !== confirmPassword) {
		errors.confirmPassword = "Les mots de passe ne sont pas identiques";
	}
	/*
	if (Object.keys(errors).length > 0) {
		return data({ errors }, { status: 400 });
	}
    */

	const response = await fetch(`${API_URL}/user/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	if (!response.ok) {
		console.error("Register failed");
		return;
	}

	return redirect("/login");
}

export default function Register() {
	return (
		<main className="login-container">
			<h1>Créer un compte</h1>
			<RegisterForm />
		</main>
	);
}
