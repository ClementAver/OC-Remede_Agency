import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="not-found">
      <Link
        className="main-nav-logo"
        to="/"
      >
        <img
          className="main-nav-logo-image"
          src="./assets/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <h1>Oups, cette page n'existe pas.</h1>
      <Link to="/">Revenir à l'accueil</Link>
    </main>
  );
}
