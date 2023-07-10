import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EditProfile from "../../components/EditProfile/EditProfile";
import Account from "../../components/Account/Account";

export default function Profile() {
  const token = useSelector((state) => state.signIn.data.body.token);
  const user = useSelector((state) => state.profile.data.body);

  if (token === null) {
    return (
      <Navigate
        to="/"
        replace={true}
      />
    );
  } else {
    return (
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user.firstName} {user.lastName}
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
}
