import DOMPurify from 'dompurify';

const API_URL = import.meta.env.VITE_API_URL;

function LoginForm() {
  async function handleLogin(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const sanitizedEmail = DOMPurify.sanitize(email as string);

    const userData = { email: sanitizedEmail, password };

    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.error("Login failed");
      return;
    }

    const data = await response.json();
    console.log("Login successful:", data);
  }

	return (
		<form action={handleLogin}>
			<div>
				<label htmlFor="email">Email:</label>
				<input id="email" name="email" required />
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" required />
			</div>
			<button type="submit">Login</button>
		</form>
	);
}

export default LoginForm;
