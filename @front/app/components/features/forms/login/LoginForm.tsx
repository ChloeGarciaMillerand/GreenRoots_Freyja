import { Form } from "react-router";

function LoginForm() {

	return (
		<Form method='POST'>
			<div>
				<label htmlFor="email">Email:</label>
				<input id="email" name="email" required />
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" required />
			</div>
			<button type="submit">Login</button>
		</Form>
	);
}

export default LoginForm;
