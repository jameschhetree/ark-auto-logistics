import Image from "next/image";
import { QuoteForm } from "./QuoteForm";
export function Introduction() {
  return (
    <section id="about" className="ark-section ark-paper">
      <div className="ark-container">
        <div className="ark-section-heading">
          <p className="ark-eyebrow">WHO WE WORK WITH</p>
          <h2>
            DIFFERENT JOURNEYS.
            <br />
            <em>THE SAME COMMITMENT.</em>
          </h2>
          <p>
            Ark Auto Logistics connects people and businesses with vehicle
            transportation across the United States.
          </p>
        </div>
        <div className="ark-audiences">
          {["DEALERSHIPS", "AUTO AUCTIONS", "BUSINESSES", "INDIVIDUALS"].map(
            (item, i) => (
              <div key={item}>
                <span>
                  TRANSPORT FOR <b>0{i + 1}</b>
                </span>
                <h3>{item}</h3>
                <small>
                  ARK AUTO LOGISTICS <span aria-hidden="true">↗</span>
                </small>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
export function DealerStory() {
  return (
    <section id="dealers" className="ark-section ark-dark">
      <div className="ark-container ark-split">
        <div className="ark-story-image">
          <Image
            src="/hero-highway.jpg"
            alt="Transport truck on a highway"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span>FROM PICKUP TO DELIVERY</span>
        </div>
        <div>
          <p className="ark-eyebrow">FOR DEALERSHIPS</p>
          <h2>
            KEEP YOUR
            <br />
            INVENTORY <em>MOVING.</em>
          </h2>
          <p>
            Dealer-to-dealer transfers. Auction pickups. Open and enclosed
            transport. Ark helps coordinate the next move for your inventory.
          </p>
          <ul className="ark-checks">
            <li>Vetted, insured carrier network</li>
            <li>Nationwide vehicle transportation</li>
            <li>Shipment updates and dedicated support</li>
          </ul>
          <a className="ark-button" href="#quote">
            Request Dealer Pricing <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
export function Process() {
  const steps = [
    [
      "Tell Us About Your Move",
      "Share your pickup and delivery ZIP codes, vehicle details, and preferred pickup date.",
    ],
    [
      "Find the Right Option",
      "Talk with Ark about open or enclosed transport and the needs of your vehicle.",
    ],
    [
      "Coordinate Your Pickup",
      "Our team helps arrange transportation with a vetted, insured carrier.",
    ],
    ["Stay in Touch", "Receive shipment updates and support through delivery."],
  ];
  return (
    <section className="ark-section ark-light">
      <div className="ark-container">
        <div className="ark-section-heading">
          <p className="ark-eyebrow">HOW IT WORKS</p>
          <h2>
            YOUR NEXT MOVE.
            <br />
            <em>MADE SIMPLE.</em>
          </h2>
        </div>
        <div className="ark-process">
          {steps.map(([title, copy], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Questions() {
  const faqs = [
    [
      "Where does Ark transport vehicles?",
      "Ark arranges vehicle transportation across the United States. Share your pickup and delivery ZIP codes so the team can discuss your route.",
    ],
    [
      "Can I choose open or enclosed transport?",
      "Yes. Open transport is a cost-effective choice for standard vehicles. Enclosed transport offers additional protection for luxury, classic, and exotic vehicles.",
    ],
    [
      "Do you work with dealerships and auctions?",
      "Yes. Ark supports dealership inventory transfers and pickups from auctions including Copart, IAA, and Manheim.",
    ],
    [
      "What if my vehicle does not run?",
      "Select ‘No’ when the quote form asks if your vehicle is running. The team can review the vehicle’s needs with you.",
    ],
    [
      "How do I request a quote?",
      "Use the quote form below or call (301) 407-8822. Have your route, vehicle details, and preferred pickup date ready.",
    ],
  ];
  return (
    <section className="ark-section ark-paper">
      <div className="ark-container ark-faq">
        <div>
          <p className="ark-eyebrow">QUESTIONS</p>
          <h2>
            BEFORE YOUR
            <br />
            <em>VEHICLE MOVES.</em>
          </h2>
          <p>
            Have a question about your shipment?
            <br />
            Talk it through with our team.
          </p>
          <a className="ark-text-link" href="tel:3014078822">
            (301) 407-8822 ↗
          </a>
        </div>
        <div>
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function QuoteSection() {
  return (
    <section id="quote" className="ark-section ark-dark">
      <div className="ark-container ark-quote">
        <div>
          <p className="ark-eyebrow">GET A FREE QUOTE</p>
          <h2>
            TELL US ABOUT
            <br />
            <em>YOUR NEXT MOVE.</em>
          </h2>
          <p>A few details are all it takes to start the conversation.</p>
          <a className="ark-big-phone" href="tel:3014078822">
            (301) 407-8822
          </a>
          <a className="ark-email" href="mailto:arkautologistics@gmail.com">
            arkautologistics@gmail.com
          </a>
          <p className="ark-contact-hours">Mon–Sat · 8AM–11PM</p>
        </div>
        <div>
          <QuoteForm variant="stepped" />
        </div>
      </div>
    </section>
  );
}
