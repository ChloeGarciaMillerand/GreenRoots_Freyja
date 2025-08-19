import { useState } from "react";
import { Link } from "react-router";
import "./toggleMenu.css";

function ToggleMenu({ className }: { className?: string }) {
	console.log("ToggleMenu monté");
	const [open, setOpen] = useState(false);

	const navLinks = [
		{ to: "/home", label: "Accueil" },
		{ to: "/about", label: "À propos" },
		{ to: "/services", label: "Services" },
		{ to: "/contact", label: "Contact" },
	];

	return (
		<nav>
			<button
				type="button"
				onClick={() => {
					console.log("clic");
					setOpen(!open);
				}}
				aria-label="Ouvrir le menu"
				className="toggle-btn"
			>
				<span className="menu-icon">{open ? "✖" : "☰"}</span>
			</button>
			{open && (
				<ul style={{ listStyle: "none", paddingLeft: 0 }}>
					{navLinks.map((link) => (
						<li key={link.to}>
							<Link to={link.to} onClick={() => setOpen(false)}>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
}

export default ToggleMenu;
