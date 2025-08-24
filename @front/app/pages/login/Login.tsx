import type { Route } from "./+types/Login"
import LoginForm from "~/components/features/forms/login/LoginForm";
import {
  getSession,
  commitSession,
} from "~/services/sessions.server";
import { redirect } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;


export async function action({
  request,
}: Route.ActionArgs) {

	const session = await getSession(
    	request.headers.get("Cookie"),
	);
  
  let formData = await request.formData();
  const email = formData.get("email");
  
    const password = formData.get("password");

    const userData = { email, password };

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
	const token = data.data.token;

	session.set("token", token);

  // Login succeeded, send them to the home page.
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
	return (
		<div>
			<h1>Login Page</h1>
      <LoginForm />
		</div>
	);
}
