import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Samples from './components/Samples';
import BuilderForm from './components/BuilderForm';

function App() {
  return (
    <div className="app-container">
      <Hero />
      <Samples />
      <BuilderForm />
    </div>
  );
}

export default App;
