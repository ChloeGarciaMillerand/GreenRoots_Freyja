import { Link } from "react-router";
import "./navbarDesktop.css";

function NavbarDesktop({ className }: { className?: string }) {
	const navLinks = [
		{ to: "/home", label: "Accueil" },
		{
			to: "/catalog",
			label: "Catalogue",
			subLinks: [
				{ to: "/catalog/Africa", label: "Afrique" },
				{ to: "/catalog/Asia", label: "Asie" },
				{ to: "/catalog/Europe", label: "Europe" },
				{ to: "/catalog/North America", label: "Amérique du nord" },
				{ to: "/catalog/South America", label: "Amérique du sud" },
				{ to: "/catalog/Australia", label: "Australie" },
			],
		},
		{ to: "/about", label: "À propos" },
	];

	return (
		<nav className={className}>
			<ul className="navlinks">
				{navLinks.map((link) =>
					link.subLinks ? (
						<li key={link.to} className="has-submenu">
							<details>
								<summary className="summary">{link.label}</summary>
								<ul className="submenu">
									{link.subLinks.map((subLink) => (
										<li key={subLink.to}>
											<Link to={subLink.to}>{subLink.label}</Link>
										</li>
									))}
								</ul>
							</details>
						</li>
					) : (
						<li key={link.to}>
							<Link to={link.to}>{link.label}</Link>
						</li>
					),
				)}
			</ul>
		</nav>
	);
}

export default NavbarDesktop;
