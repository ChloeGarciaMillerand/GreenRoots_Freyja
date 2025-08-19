import { useState } from "react";
import { Link } from "react-router";

import "../../../../../styles/reset.css";
import "../../../../../styles/global.css";
import "./toggleMenu.css";

function ToggleMenu({ className }: { className?: string }) {
	const [open, setOpen] = useState(false);

	const navLinks = [
		{ to: "/home", label: "Accueil" },
		{ to: "/catalog", label: "Catlogue" },
		{ to: "/about", label: "À propos" },
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
							<Link to={link.to} onClick={() => setOpen(false)}>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			) : null}
		</nav>
	);
}

export default ToggleMenu;
