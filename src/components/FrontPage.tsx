import { NewspaperHeroCanvas } from './NewspaperHero';
import profilePicture from '../data/images/profilePicture.jpg';

const TODAY = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
});

export function FrontPage() {
  return (
    <div className="front-page">
      {/* Three.js floating newspaper pages — background layer */}
      <NewspaperHeroCanvas />

      {/* Newspaper front-page content — foreground layer */}
      <div className="front-content">

        {/* ── Masthead ── */}
        <div className="front-masthead-block" aria-label="Newspaper masthead">
          <div className="front-thick-rule" />
          <p className="front-masthead-title">The Nicholas Rebello Times</p>
          <div className="front-thick-rule" />
          <div className="front-gold-rule" />
          <div className="front-dateline">
            <span>Waterloo, Ontario · Canada</span>
            <span>{TODAY}</span>
            <span>Est. 2002</span>
          </div>
          <div className="front-gold-rule" />
        </div>

        {/* ── Main story ── */}
        <div className="front-story">
          {/* Photo column */}
          <div className="front-story-photo">
            <img
              src={profilePicture}
              alt="Nicholas Rebello"
              className="front-photo-img"
            />
            <p className="front-photo-caption">N. Rebello · Waterloo, ON, Canada</p>
          </div>

          {/* Article column */}
          <div className="front-story-text">
            <h1 className="front-headline">
              Computer Scientist &amp; Business Student Graduates This Spring
            </h1>
            <div className="front-byline-rule" />
            <p className="front-body">
              Nicholas Rebello is a Computer Science &amp; Business student at the
              University of Waterloo and Wilfrid Laurier University, combining rigorous
              engineering with strategic thinking. He has built iOS applications at CIBC
              using Swift and Core ML, developed machine learning frameworks for crop-yield
              prediction, and shipped full-stack Android platforms — always with a focus
              on clean architecture and delightful user experience.
            </p>
            <div className="front-contact">
              <a href="mailto:nicholas.rebello@gmail.com" className="front-contact-link">
                ✉ nicholas.rebello@gmail.com
              </a>
              <a
                href="https://github.com/nickr145"
                className="front-contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                ⊕ github.com/nickr145
              </a>
              <a
                href="https://linkedin.com/in/nicholas-rebello-82609112b/"
                className="front-contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                ⊕ LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* ── Index / teasers bar ── */}
        <div className="front-teasers">
          <div className="front-thick-rule" style={{ marginBottom: '0.4rem' }} />
          <div className="front-teasers-content">
            <span>Projects, p.2</span>
            <span className="front-teaser-dot">·</span>
            <span>Experience, p.3</span>
            <span className="front-teaser-dot">·</span>
            <span>Arts &amp; Leisure, p.4</span>
          </div>
          <div className="front-thick-rule" style={{ marginTop: '0.4rem' }} />
        </div>

      </div>
    </div>
  );
}
