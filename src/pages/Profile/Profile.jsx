import Button from "../../components/Button/Button";
import Account from "../../components/Account/Account";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.header.data.body);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user.firstName}
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
