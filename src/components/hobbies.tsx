import Card from './Card';
import HobbiesDropdowns from './HobbiesDropdowns';

export function Hobbies() {

  return (
    <Card title="Hobbies">
      <p>
        I love capturing the beauty of the natural world through both sketching and photography. 
        I sketch fauna and flora, bringing delicate details to life on paper. 
        With my camera, I explore animals, plants, landscapes, and the night sky—combining nature 
        photography with a touch of astrophotography.
      </p>
      <div style={{ marginTop: 12 }}>
        <HobbiesDropdowns />
      </div>
    </Card>
  );
}

export default Hobbies;
