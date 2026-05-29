import React, { useState } from "react";
import "./UploadResume.css";
import { Upload } from "lucide-react";
import * as pdfjsLib from 'pdfjs-dist';
import axios from "axios";

// Change 'pdf.worker.mjs' to 'pdf.worker.legacy.mjs'
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const UploadResume = () => {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractTextFromPDF = async(file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ");
    }
    return text;
  }

  const handleAnalyze = async() => {
    if (!file) {
      return alert("Please upload a PDF first!");
    }
    setLoading(true);

    try {
      const resumeText = await extractTextFromPDF(file);
      const response = await axios.post("http://localhost:5000/analyze", {
        resume: resumeText,
      });
      const raw = response.data.feedback;
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setResult(parsed);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };


  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please drop a valid PDF file.");
    }
  };
  
  return (
    <div className="uploadResume">
      <div className="upload">
        <h3>Upload PDF</h3>
        <input
          type="file"
          accept=".pdf"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="fileInput" 
          className="file-label"
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          <Upload size={32} color="#6c63ff" />
          <p>{file ? file.name : "Drag and drop your PDF here"}</p>
          <span>or click to browse</span>
        </label>
        <button onClick={handleAnalyze}>Analyze My Resume</button>
        {result && (
          <div className="results">
            <h2>Score: {result.score}/10</h2>
            <div className="result-card">
              <h3>✅ Strengths</h3>
              {result.strengths.map((s, i) => <p key={i}>{s}</p>)}
            </div>
            <div className="result-card">
              <h3>❌ Weaknesses</h3>
              {result.weaknesses.map((w, i) => <p key={i}>{w}</p>)}
            </div>
            <div className="result-card">
              <h3>💡 Suggestions</h3>
              {result.suggestions.map((s, i) => <p key={i}>{s}</p>)}
            </div>
            <div className="result-card">
              <h3>🎯 ATS Tips</h3>
              {result.ats_tips.map((a, i) => <p key={i}>{a}</p>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadResume;