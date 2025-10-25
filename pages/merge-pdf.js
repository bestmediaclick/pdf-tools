import { useState } from 'react';

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log('Selected files:', selectedFiles.length);
    setFiles(selectedFiles);
  };

  const handleMerge = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);

    try {
      // إذا ملف واحد، حمله مباشرة
      if (files.length === 1) {
        downloadFile(files[0], files[0].name);
        return;
      }

      // تحويل الملفات إلى base64
      const filesBase64 = await Promise.all(
        files.map(file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve({
            name: file.name,
            base64: e.target.result.split(',')[1]
          });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }))
      );

      // استدعاء API الدمج
      const response = await fetch('/api/merge-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: filesBase64 })
      });

      const result = await response.json();
      
      if (result.success) {
        // تنزيل الملف المدمج
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${result.pdf}`;
        link.download = `merged-${Date.now()}.pdf`;
        link.click();
        alert(result.message);
      } else {
        alert('❌ ' + result.error);
      }

    } catch (error) {
      alert('❌ حدث خطأ: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (file, filename) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', direction: 'rtl', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#0070f3', textAlign: 'center' }}>🌗 دمج ملفات PDF</h1>
      
      <div style={{ border: '3px dashed #0070f3', padding: '40px', textAlign: 'center', borderRadius: '15px', backgroundColor: '#f8faff', marginBottom: '30px' }}>
        <input 
          id="file-input"
          type="file" 
          multiple
          accept=".pdf"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-input" style={{ cursor: 'pointer', display: 'block' }}>
          <div style={{ fontSize: '48px' }}>📁</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>انقر لاختيار ملفات PDF</div>
          <div style={{ color: '#666' }}>يمكنك اختيار عدة ملفات (Ctrl+Click)</div>
        </label>
      </div>

      {files.length > 0 && (
        <div style={{ marginBottom: '30px', backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
          <h3>📄 الملفات المختارة ({files.length})</h3>
          {files.map((file, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', margin: '5px 0' }}>
              <span>{file.name} ({(file.size/1024/1024).toFixed(1)}MB)</span>
              <button onClick={() => removeFile(index)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>
                إزالة
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={handleMerge}
          disabled={files.length === 0 || isProcessing}
          style={{
            padding: '15px 40px',
            backgroundColor: files.length > 0 ? '#0070f3' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: files.length > 0 ? 'pointer' : 'not-allowed',
            fontSize: '18px',
            minWidth: '200px'
          }}
        >
          {isProcessing ? '🔄 جاري الدمج...' : `🚀 دمج ${files.length} ملفات`}
        </button>
      </div>
    </div>
  );
}