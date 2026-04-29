import profilePicture from '../data/images/profilePicture.jpg';

export function ProfileCard() {
  return (
    <div className="newspaper-about">
      <div className="about-photo-wrap">
        <img
          src={profilePicture}
          alt="Nicholas Rebello"
          className="about-photo"
        />
        <p className="about-photo-caption">N. Rebello · Waterloo, ON, Canada</p>
      </div>

      <p className="about-bio">
        Computer Science &amp; Business student at the University of Waterloo
        and Wilfrid Laurier University. I build fast, delightful software
        across mobile, web, and systems — with a focus on clean architecture
        and user experience.
      </p>

      <div className="about-links">
        <a href="mailto:nicholas.rebello@gmail.com" className="about-link">
          ✉ nicholas.rebello@gmail.com
        </a>
        <a
          href="https://github.com/nickr145"
          className="about-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          ⊕ github.com/nickr145
        </a>
        <a
          href="https://linkedin.com/in/nicholas-rebello-82609112b/"
          className="about-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          ⊕ LinkedIn
        </a>
      </div>
    </div>
  );
}
