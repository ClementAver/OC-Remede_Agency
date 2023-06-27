import Feature from "../Feature/Feature";

export default function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <Feature
        src="./assets/icon-chat.png"
        alt="Chat Icon"
        h3="You are our #1 priority"
        p="Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes."
      />
      <Feature
        src="./assets/icon-money.png"
        alt="Money Icon"
        h3="More savings means higher rates"
        p="The more you save with us, the higher your interest rate will be!"
      />
      <Feature
        src="./assets/icon-security.png"
        alt="Security Icon"
        h3="Security you can trust"
        p="We use top of the line encryption to make sure your data and money
            is always safe."
      />
    </section>
  );
}
