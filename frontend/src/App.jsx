import { ImageUploader } from './components/ImageUploader';
import './styles/index.css';

function App() {
  return (
    <div className="app">
      <h1>Image Rotator 90°</h1>
      <p>Envie uma imagem para rotacionar 90 graus</p>
      <ImageUploader />
    </div>
  );
}

export default App;