import { useEffect, useState } from "react";
import { H1 } from "../ui";

const Hero = () => {
  const [asciiArt, setAsciiArt] = useState("");

  useEffect(() => {
    fetch("/hand-reaching.txt")
      .then((res) => res.text())
      .then(setAsciiArt);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <pre className="absolute inset-0 text-[5px] leading-[5px] text-white/[0.06] whitespace-pre overflow-hidden pointer-events-none z-0 select-none">
        {asciiArt}
      </pre>
      <div className="relative z-10 text-center max-w-[700px] px-8">
        <H1>Open the Box</H1>
        <p className="text-base md:text-lg text-neutral-500 leading-relaxed">
          Visualize ASTs, HTTP networking, and virtual machines.
        </p>
      </div>
    </section>
  );
};

export default Hero;
