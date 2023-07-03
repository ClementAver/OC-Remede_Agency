import Account from "../../components/Account/Account";
import { useSelector } from "react-redux";
import EditProfile from "../../components/EditProfile/EditProfile";

export default function Profile() {
  const user = useSelector((state) => state.profile.data.body);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user.firstName}
        </h1>

        <EditProfile />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account />
      <Account />
      <Account />
    </main>
  );
}
