import { useState } from 'react';

export default function SplitPDF() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      alert('⏳ خاصية التقسيم قيد التطوير وتكون جاهزة قريباً!');
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', direction: 'rtl', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#0070f3', textAlign: 'center' }}>✂️ تقسيم PDF</h1>
      
      <div style={{ border: '3px dashed #28a745', padding: '40px', textAlign: 'center', borderRadius: '15px', backgroundColor: '#f8fff9', marginBottom: '30px' }}>
        <input 
          type="file" 
          accept=".pdf"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="split-file"
        />
        <label htmlFor="split-file" style={{ cursor: 'pointer', display: 'block' }}>
          <div style={{ fontSize: '48px' }}>📄</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>اختر ملف PDF لتقسيمه</div>
        </label>
      </div>

      {file && (
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p>📁 الملف المختار: <strong>{file.name}</strong></p>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={handleSplit}
          disabled={!file || isProcessing}
          style={{
            padding: '15px 40px',
            backgroundColor: file ? '#28a745' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: file ? 'pointer' : 'not-allowed',
            fontSize: '18px'
          }}
        >
          {isProcessing ? '🔄 جاري التقسيم...' : '🚀 بدء التقسيم'}
        </button>
      </div>
    </div>
  );
}