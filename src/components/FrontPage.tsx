import { useState, useEffect, useRef } from 'preact/hooks';
import { NewspaperHeroCanvas } from './NewspaperHero';
import profilePicture from '../data/images/profilePicture.jpg';

const TODAY = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
});

const ROLE_TITLES = [
  'Software Engineer',
  'AI Engineer',
  'Full-Stack Developer',
  'Mobile Developer',
  'FinTech Builder',
];

const TYPE_SPEED_MS = 75;
const ROLE_HOLD_MS = 11000;
const INK_FADE_MS = 950;

function StatCounter({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || triggered.current) return;
      triggered.current = true;
      obs.disconnect();
      const duration = 1100;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setCount(Math.round(eased * target));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-item">
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function FrontPage() {
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [inkFading, setInkFading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeout: number | undefined;

    const queue = (callback: () => void, delay: number) => {
      timeout = window.setTimeout(callback, delay);
    };

    const beginInkFade = (currentIndex: number) => {
      setInkFading(true);
      queue(() => {
        if (cancelled) return;
        const nextIndex = (currentIndex + 1) % ROLE_TITLES.length;
        setRoleIndex(nextIndex);
        typeRole(nextIndex);
      }, INK_FADE_MS);
    };

    const typeRole = (index: number) => {
      const title = ROLE_TITLES[index];
      let i = 0;

      setDisplayed('');
      setTyping(true);
      setInkFading(false);

      const typeNext = () => {
        if (cancelled) return;
        i += 1;
        setDisplayed(title.slice(0, i));

        if (i < title.length) {
          queue(typeNext, TYPE_SPEED_MS);
          return;
        }

        setTyping(false);
        queue(() => beginInkFade(index), ROLE_HOLD_MS);
      };

      queue(typeNext, TYPE_SPEED_MS);
    };

    typeRole(0);

    return () => {
      cancelled = true;
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="front-page">
      <NewspaperHeroCanvas />

      <div className="front-content">

        {/* ── Masthead ── */}
        <div className="front-masthead-block" aria-label="Newspaper masthead">
          <div className="front-thick-rule" />
          <p className="front-masthead-title">Nicholas Rebello</p>
          <p
            className={`front-masthead-role${inkFading ? ' front-masthead-role--fading' : ''}`}
            aria-live="polite"
          >
            <span className="front-title-type" aria-label={ROLE_TITLES[roleIndex]}>
              <span className="front-title-text">{displayed}</span>
              {typing && <span className="typewriter-cursor" aria-hidden="true" />}
            </span>
          </p>
          <div className="front-thick-rule" />
          <div className="front-gold-rule" />
          <div className="front-dateline">
            <span>Mississauga, Ontario · Canada</span>
            <span>{TODAY}</span>
            {/* <span>Est. 2002</span> */}
          </div>
          <div className="front-gold-rule" />
        </div>

        {/* ── Main story ── */}
        <div className="front-story">
          {/* Photo column */}
          <div className="front-story-photo">
            <img src={profilePicture} alt="Nicholas Rebello" className="front-photo-img" />
            <p className="front-photo-caption">N. Rebello · ON, Canada</p>
          </div>

          {/* Article column */}
          <div className="front-story-text">

            <p className="front-body">
              Hi, I'm Nick.
              I'm a Computer Science and Business student passionate about building technology that is practical, intelligent, and user-focused.
              I'm especially interested in AI, machine learning, fintech, and software engineering,
              with experience developing full-stack apps, mobile features, data-driven tools, and AI-powered products.
              Through internships, hackathons, and personal projects, I enjoy turning complex ideas into useful systems that solve real problems.
            </p>

            {/* <blockquote className="front-pull-quote">
              "Turning complex ideas into useful systems that solve real problems."
            </blockquote> */}

            <div className="front-stats">
              <StatCounter target={5} suffix="+" label="Years Coding" />
              <StatCounter target={3} label="Internship Terms" />
              <StatCounter target={9} label="Projects Shipped" />
              <StatCounter target={2} label="Degrees" />
            </div>

            <div className="front-contact">
              <a href="mailto:nicholas.rebello@gmail.com" className="front-contact-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="front-contact-icon" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                nicholas.rebello@gmail.com
              </a>
              <a href="https://github.com/nickr145" className="front-contact-link" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="front-contact-icon" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                github.com/nickr145
              </a>
              <a href="https://linkedin.com/in/nicholas-rebello-82609112b/" className="front-contact-link" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="front-contact-icon" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
