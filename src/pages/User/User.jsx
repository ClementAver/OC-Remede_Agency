import Button from "../../components/Button/Button";
import Account from "../../components/Account/Account";

export default function User() {
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
        </h1>

        <Button
          className="edit-button"
          text="Edit Name"
        />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account />
      <Account />
      <Account />
    </main>
  );
}
