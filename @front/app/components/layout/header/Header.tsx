import "./Header.css";
import ToggleMenu from "./toggleMenu/toggleMenu";
import NavbarDesktop from "./navbarDesktop/navbarDesktop";
import { Link } from "react-router";

import logo from "../../../../assets/icons/logo.svg";
import iconAccount from "../../../../assets/icons/iconAccount.svg";
import iconCart from "../../../../assets/icons/iconCart.svg";

export function Header() {
	return (
		<div>
			<header>
				{/* burger menu, only for mobile*/}
				<ToggleMenu className="header-burger-menu" />

				{/* logo */}
				<Link to="/" className="header-logo">
					<img src={logo} alt="logo greenroots" />
				</Link>

				{/* navbar, only for tablet and desktop*/}
				<NavbarDesktop className="header-nav-desktop" />

				{/* account and cart */}
				<div className="header-account-cart">
					<Link to="/">
						<img src={iconCart} alt="Panier" />
					</Link>
					<Link to="/">
						<img src={iconAccount} alt="Compte personnel" />
					</Link>
				</div>
			</header>
		</div>
	);
}
