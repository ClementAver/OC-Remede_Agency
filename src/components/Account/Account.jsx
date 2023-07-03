import Button from "../Button/Button";

export default function Account() {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
        <p className="account-amount">$2,082.79</p>
        <p className="account-amount-description">Available Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <Button
          type="button"
          className="transaction-button"
          text="View transactions"
        />
      </div>
    </section>
  );
}
