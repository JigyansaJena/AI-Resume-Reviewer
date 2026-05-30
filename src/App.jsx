import { useState } from 'react';
import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar';
import './index.css'
import PasteResume from './Components/PasteResume/PasteResume';
import UploadResume from './Components/UploadResume/UploadResume';

function App() {

  const [activeTab, setActiveTab] = useState("Paste");
  
  return (
    <>
      <Navbar />
      <Hero setActiveTab={setActiveTab} />
      {activeTab === "Paste" ? <PasteResume /> : <UploadResume /> }
    </>
  )
}

export default App;