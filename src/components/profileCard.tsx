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
        and Wilfrid Laurier University. Hi, I’m Nick - a Computer Science and Business student 
        passionate about building technology that is practical, intelligent, and user-focused. 
        I’m especially interested in AI, machine learning, fintech, and software engineering, 
        with experience developing full-stack apps, mobile features, data-driven tools, and AI-powered products. 
        Through internships, hackathons, and personal projects, I enjoy turning complex ideas into useful systems 
        that solve real problems.
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
