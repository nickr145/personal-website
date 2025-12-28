import Card from './Card';

export function Hobbies() {

  function navigateToGallery() {
    window.history.pushState({}, '', '/gallery');
    window.dispatchEvent(new CustomEvent('navigate-to-gallery'));
  }

  function navigateToSketchbook() {
    window.history.pushState({}, '', '/sketchbook');
    window.dispatchEvent(new CustomEvent('navigate-to-sketchbook'));
  }

  return (
    <Card title="Hobbies">
      <p>
        I love capturing the beauty of the natural world through both sketching and photography. 
        I sketch fauna and flora, bringing delicate details to life on paper. 
        With my camera, I explore animals, plants, landscapes, and the night sky—combining nature 
        photography with a touch of astrophotography.
      </p>
      <div className="hobbies-icons">
        <button className="hobby-icon-button" onClick={navigateToGallery} aria-label="View gallery">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <span>Gallery</span>
        </button>
        <button className="hobby-icon-button" onClick={navigateToSketchbook} aria-label="View sketchbook">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19l8.236-8.236a2 2 0 0 0 0-2.828L14.828 2.764a2 2 0 0 0-2.828 0L2 12m20-8l-8 8"/>
            <path d="M7 7h.01"/>
          </svg>
          <span>Sketchbook</span>
        </button>
      </div>
    </Card>
  );
}

export default Hobbies;
