import { Link } from "react-router";

function NavbarDesktop({ className }: { className?: string }) {
	const navLinks = [
		{ to: "/home", label: "Accueil" },
		{
			to: "/catalog",
			label: "Catalogue",
			subLinks: [
				{ to: "/catalog/afrique", label: "Afrique" },
				{ to: "/catalog/asie", label: "Asie" },
				{ to: "/catalog/europe", label: "Europe" },
				{ to: "/catalog/amerique", label: "Amérique" },
				{ to: "/catalog/oceanie", label: "Océanie" },
			],
		},
		{ to: "/about", label: "À propos" },
	];

	return (
		<nav className="header-nav-desktop">
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
