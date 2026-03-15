"use client";

const steps = [
  {
    step: "01",
    title: "The Arrival",
    description:
      "A handcrafted wooden box arrives at their door — no ordinary package. The weight and warmth of real wood sets the tone before it's even opened.",
  },
  {
    step: "02",
    title: "The Reveal",
    description:
      "Three bottles of Rutherford Ranch wine nestled in a bed of dark crinkle fill, each chosen for its story and character. The copper ribbon catches the light.",
  },
  {
    step: "03",
    title: "The Letters",
    description:
      "Wax-sealed envelopes hold personal tasting notes for each wine — a guide to savoring each pour. Break the seal, read the story, taste the craft.",
  },
  {
    step: "04",
    title: "The Moment",
    description:
      "Whether it's a quiet evening alone or a gathering with friends, each bottle becomes a conversation. Three wines, three stories, countless memories.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-gold/60 text-xs tracking-[0.35em] uppercase mb-4">
            The Journey
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-cream mb-8">
            From Vine to
            <br />
            <span className="text-gold">Living Room</span>
          </h2>
          <div className="w-16 h-px bg-gold/30 mx-auto" />
        </div>

        {/* Timeline steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gold/10 -translate-x-1/2" />

          <div className="space-y-20">
            {steps.map((item, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step number */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-burgundy-dark border-2 border-gold/40 z-10" />

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    i % 2 === 1 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <span className="text-gold/30 font-serif text-4xl">
                    {item.step}
                  </span>
                  <h3 className="font-serif text-2xl text-cream mt-2 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-cream/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
