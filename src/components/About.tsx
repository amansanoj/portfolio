import { HeadingShine } from './reactbits/HeadingShine';
export function About() {
  return <article className="about-page">
    <header className="about-intro">
      <p className="about-kicker">About</p>
      <h1><HeadingShine>I build software that connects to the physical world.</HeadingShine></h1>
      <p className="about-lead">I’m Aman, a Computer Science student in Dubai. I work across native apps, web services, and embedded systems, with most of my current projects sitting somewhere between software and hardware.</p>
    </header>

    <div className="about-content">
      <section aria-labelledby="about-now">
        <h2 id="about-now">Right Now</h2>
        <div>
          <p>I’m studying Cyber Security at the University of Wollongong in Dubai. Outside class, I’m working across Swift, Go, TypeScript, C++, and the ESP32 platform.</p>
          <p>Recent projects include <a href="/projects/macro-pad/">Macro Pad</a>, a Bluetooth controller with a native macOS app; <a href="/projects/tether/">Tether</a>, a synchronized watch-party server; and <a href="/projects/neon-os/">NeonOS</a>, firmware that connects a Bluetooth light to Apple Home.</p>
          <p>I also use the <a href="/blog/">blog</a> to document security issues, experiments, and the parts of a build that are worth explaining properly.</p>
        </div>
      </section>

      <section aria-labelledby="about-background">
        <h2 id="about-background">Background</h2>
        <div>
          <p>I’m from Kerala and now live in the UAE. I started programming at 12 through web development, then moved into backend systems, native apps, and electronics as the projects became more ambitious.</p>
          <p>At school, a classmate and I built <a href="/projects/gardenx/">GardenX</a> to replace the farm’s paper-based sales records, and I built <a href="/projects/falak-academy/">Falak Academy</a> for student-led courses. They taught me to understand the actual workflow before deciding what the software should look like.</p>
          <p>Away from a screen, I play chess and listen to music.</p>
        </div>
      </section>

      <section aria-labelledby="about-education">
        <h2 id="about-education">Education</h2>
        <div className="education-list">
          <article>
            <p className="education-period"><time dateTime="2026">2026</time> - 2029</p>
            <h3>University of Wollongong in Dubai</h3>
            <p>Bachelor of Computer Science, Cyber Security</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="about-links">
        <h2 id="about-links">Elsewhere</h2>
        <div className="about-links">
          <a href="https://github.com/amansanoj">GitHub</a>
          <a href="https://www.linkedin.com/in/amansanoj">LinkedIn</a>
          <a href="mailto:me@amansanoj.com">me@amansanoj.com</a>
        </div>
      </section>
    </div>
  </article>;
}
