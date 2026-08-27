import { Hero } from "@/components/hero";
import { WorkGrid } from "@/components/work-grid";
import { Testimonials } from "@/components/testimonials";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

// The home page is a SEQUENCE, not a dump of every section. It shows three projects and sends
// people to /work for the rest, because a portfolio home page that shows everything gives a
// visitor no reason to go anywhere and no sense of what the studio thinks is its best.
export default function Home() {
    return (
            <main id="main">
                <Hero />
                <WorkGrid limit={3} />
                <Testimonials />
                <About />
                <Contact />
            </main>
    );
}
