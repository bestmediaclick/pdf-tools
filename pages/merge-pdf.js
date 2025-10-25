import { useState } from 'react';

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

const handleFileUpload = (event) => {
  const selectedFiles = Array.from(event.target.files);
  console.log('Selected files:', selectedFiles.length); // للتصحيح
  setFiles(selectedFiles);
};

const handleMerge = async () => {
  if (files.length === 0) return;
  
  setIsProcessing(true);

  try {
    // حل مؤقت: دمج يدوي بسيط
    if (files.length === 1) {
      // إذا كان ملف واحد، حمله مباشرة
      const link = document.createElement('a');
      link.href = URL.createObjectURL(files[0]);
      link.download = 'merged.pdf';
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      // إذا كان أكثر من ملف، استخدم API
      const filesBase64 = await Promise.all(
        files.map(file => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve({
            name: file.name,
            base64: e.target.result.split(',')[1]
          });
          reader.readAsDataURL(file);
        }))
      );

      const response = await fetch('/api/merge-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: filesBase64 })
      });

      const result = await response.json();
      
      if (result.success) {
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${result.pdf}`;
        link.download = `merged-${Date.now()}.pdf`;
        link.click();
        alert(result.message || 'تم الدمج بنجاح!');
      }
    }
  } catch (error) {
    alert('❌ حدث خطأ: ' + error.message);
  } finally {
    setIsProcessing(false);
    setFiles([]);
    document.getElementById('file-input').value = '';
  }
};

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      direction: 'rtl'
    }}>
      <h1 style={{ color: '#0070f3' }}>🌗 دمج ملفات PDF</h1>
      <p style={{ color: '#666' }}>اختر عدة ملفات PDF لدمجها في ملف واحد</p>
      
      <div style={{ 
        border: '2px dashed #ccc', 
        padding: '40px', 
        textAlign: 'center',
        borderRadius: '10px',
        margin: '30px 0'
      }}>
<input 
  id="file-input"
  type="file" 
  multiple  // ⬅️ هذا مهم لاختيار multiple files
  accept=".pdf" 
  onChange={handleFileUpload}
  style={{ marginBottom: '20px' }}
  disabled={isProcessing}
/>
        <p>اسحب وأفلت الملفات أو انقر للاختيار</p>
        <p style={{ fontSize: '14px', color: '#999' }}>حد أقصى 5 ملفات - 10MB لكل ملف</p>
      </div>

      {files.length > 0 && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <h3>📄 الملفات المختارة ({files.length}):</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index} style={{ margin: '8px 0' }}>
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        </div>
      )}

      <button 
        onClick={handleMerge}
        disabled={files.length === 0 || isProcessing}
        style={{
          padding: '15px 30px',
          backgroundColor: files.length > 0 && !isProcessing ? '#0070f3' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: files.length > 0 && !isProcessing ? 'pointer' : 'not-allowed',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '20px'
        }}
      >
        {isProcessing ? '🔄 جاري معالجة الملفات...' : '🚀 دمج الملفات'}
      </button>
    </div>
  );
}
