import './App.css';
import Rutas from './routes/routes';
import './App.css';
import { Header } from './componets/header/header';
import { Footer } from './componets/footer/footer';

function App() {
  return (
    <div className='main'>
      <Header />
      <div className='container-p'>
        <Rutas />
      </div>
      <Footer />
    </div>
  );
}

export default App;
