import Card from "./Card";
import profilePicture from "../data/images/profilePicture.jpg";

export function ProfileCard() {
  return (
    <Card className="profile-card" title="">
      <img
        src={profilePicture}
        alt="Profile Picture"
        className="profile-avatar"
      />

      <h1 className="profile-name">Nicholas Rebello</h1>
      <p className="profile-subtitle">
        BCS + BBA @ University of Waterloo + Wilfrid Laurier University
      </p>

      <div className="profile-icons">
        <a
          href="mailto:nicholas.rebello@gmail.com"
          aria-label="Send email"
          className="icon-button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 6.5C2 5.67157 2.67157 5 3.5 5H20.5C21.3284 5 22 5.67157 22 6.5V17.5C22 18.3284 21.3284 19 20.5 19H3.5C2.67157 19 2 18.3284 2 17.5V6.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 6.5L12 13L2 6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <a
          href="https://github.com/nickr145"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          className="icon-button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        <a
          href="https://linkedin.com/in/nicholas-rebello-82609112b/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on LinkedIn"
          className="icon-button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M4.98 3.5C4.98 4.60457 4.06457 5.52 2.96 5.52C1.85543 5.52 0.94 4.60457 0.94 3.5C0.94 2.39543 1.85543 1.48 2.96 1.48C4.06457 1.48 4.98 2.39543 4.98 3.5Z" />
            <path d="M0.5 8.5H4.42V23H0.5V8.5Z" />
            <path d="M8.5 8.5H12.12V10.12H12.18C12.78 9.08 14.12 7.98 16.34 7.98C20.18 7.98 20.5 10.9 20.5 14.48V23H16.58V15.56C16.58 13.76 16.54 11.36 14.06 11.36C11.56 11.36 11.16 13.28 11.16 15.4V23H7.24V8.5H8.5Z" />
          </svg>
        </a>
      </div>

    </Card>
  );
}
