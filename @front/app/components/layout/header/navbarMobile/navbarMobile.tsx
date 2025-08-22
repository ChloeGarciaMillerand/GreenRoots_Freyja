import { useState } from "react";
import { Link } from "react-router";
import { continents } from "~/continents";

import "./navbarMobile.css";

function NavbarMobile({ className }: { className?: string }) {
	const [open, setOpen] = useState(false);

	const navLinks = [
		{ to: "/home", label: "Accueil" },
		{
			to: "/catalog",
			label: "Catalogue",
			subLinks: continents.map((continent) => ({
				label: continent.label,
				to: `/catalog/${continent.value}`,
			})),
		},
		{ to: "/about", label: "À propos / Contact" },
	];

	return (
		<nav className={className}>
			<button
				type="button"
				onClick={() => {
					setOpen((previousOpen) => !previousOpen);
				}}
				aria-label="Ouvrir le menu"
				className="toggle-btn"
			>
				<span className="menu-icon">{open ? "✖" : "☰"}</span>
			</button>
			{open ? (
				<ul style={{ listStyle: "none", paddingLeft: 0 }}>
					{navLinks.map((link) => (
						<li key={link.to}>
							{link.subLinks ? (
								<details>
									<summary>{link.label}</summary>
									<ul style={{ listStyle: "none", paddingLeft: "1rem" }}>
										{link.subLinks.map((sub) => (
											<li key={sub.to}>
												<Link to={sub.to} onClick={() => setOpen(false)}>
													{sub.label}
												</Link>
											</li>
										))}
									</ul>
								</details>
							) : (
								<Link to={link.to} onClick={() => setOpen(false)}>
									{link.label}
								</Link>
							)}
						</li>
					))}
				</ul>
			) : null}
		</nav>
	);
}

export default NavbarMobile;
