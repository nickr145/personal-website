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
    <div className="hobbies-newspaper">
      <p className="about-bio" style={{ maxWidth: '640px', marginBottom: '1.5rem' }}>
        Between lectures and pull requests, I capture the natural world through pencil
        and lens — sketching fauna and flora in ink, and photographing everything from
        bison herds at Yellowstone to the Milky Way arching over dark skies.
      </p>
      <div className="hobbies-buttons">
        <button className="newspaper-button" onClick={navigateToGallery}>
          Photography Gallery →
        </button>
        <button className="newspaper-button" onClick={navigateToSketchbook}>
          Sketchbook →
        </button>
      </div>
    </div>
  );
}

export default Hobbies;
