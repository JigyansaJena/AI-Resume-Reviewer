import React from "react";
import "./Hero.css";
import { Clipboard, Upload, FileSearch, Sparkles } from "lucide-react";

const Hero = ({setActiveTab}) => {
  return (
    <div className="hero">
      <div className="hero-top">
        <div className="text-line">
          <Sparkles size={13} color="#6c63ff" />
          <p>Powered by AI</p>
        </div>
        <h1>
          Get your resume <br />
          <span>reviewed instantly</span>
        </h1>
        <h5>
          Paste your resume or upload a PDF and get detailed AI <br /> feedback
          in seconds. Land more interviews.
        </h5>
        <div className="btns">
          <button onClick={() => setActiveTab("Paste")}><Clipboard size={16} />Paste Resume</button>
          <button onClick={() => setActiveTab("Upload")}><Upload size={16} />Upload PDF</button>
        </div>
      </div>
      <hr />
      <div className="hero-bottom">
        <div className="hero-bottom-div">
          <p className="text">10k+</p>
          <p className="text-btm">Resume Reviewed</p>
        </div>
        <div className="hero-bottom-div">
          <p className="text">95%</p>
          <p className="text-btm">User satisfaction</p>
        </div>
        <div className="hero-bottom-div">
          <p className="text">3x</p>
          <p className="text-btm">user interactions</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;