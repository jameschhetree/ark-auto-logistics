import Image from "next/image";
const services = [
  {
    title: "Open Auto Transport",
    copy: "A cost-effective option for standard vehicles, with nationwide pickup and delivery.",
    image: "/hero-v2.jpg",
  },
  {
    title: "Enclosed Auto Transport",
    copy: "Additional protection in transit for luxury, classic, and exotic vehicles.",
    image: "/hero.jpg",
  },
  {
    title: "Dealer & Auction Transport",
    copy: "Inventory transfers between dealerships and vehicle pickup from Copart, IAA, Manheim, and other auctions.",
    image: "/hero-highway.jpg",
  },
];
export function Services() {
  return (
    <section id="services" className="ark-section ark-light">
      <div className="ark-container">
        <div className="ark-section-heading">
          <p className="ark-eyebrow">WHAT WE MOVE</p>
          <h2>
            A TRANSPORT OPTION
            <br />
            FOR <em>YOUR VEHICLE.</em>
          </h2>
          <p>
            One car or dealership inventory. Choose the service that fits your
            move.
          </p>
        </div>
        <div className="ark-services">
          {services.map((service, index) => (
            <article className="ark-service" key={service.title}>
              <div className="ark-service-image">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
                <span>0{index + 1}</span>
              </div>
              <div className="ark-service-copy">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <a href="#quote">
                  Request a Quote <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
