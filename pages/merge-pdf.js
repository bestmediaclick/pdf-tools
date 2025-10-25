import { useState } from 'react';

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log('Selected files:', selectedFiles);
    setFiles(selectedFiles);
  };

  const handleMerge = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);

    try {
      if (files.length === 1) {
        // تنزيل ملف واحد
        downloadFile(files[0], files[0].name);
      } else {
        // محاكاة الدمج
        alert(`✅ تم اختيار ${files.length} ملفات للدمج\n⏳ جاري تطوير خاصية الدمج الكاملة...`);
        
        // تنزيل أول ملف كمثال
        setTimeout(() => {
          downloadFile(files[0], `merged-${Date.now()}.pdf`);
        }, 1000);
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
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      direction: 'rtl',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#0070f3', textAlign: 'center' }}>🌗 دمج ملفات PDF</h1>
      <p style={{ color: '#666', textAlign: 'center', marginBottom: '30px' }}>
        اختر عدة ملفات PDF لدمجها في ملف واحد
      </p>
      
      {/* منطقة رفع الملفات */}
      <div style={{ 
        border: '3px dashed #0070f3',
        padding: '40px 20px',
        textAlign: 'center',
        borderRadius: '15px',
        backgroundColor: '#f8faff',
        marginBottom: '30px',
        cursor: 'pointer'
      }}>
        <input 
          id="file-input"
          type="file" 
          multiple
          accept=".pdf"
          onChange={handleFileUpload}
          style={{ 
            display: 'none'
          }}
          disabled={isProcessing}
        />
        <label 
          htmlFor="file-input"
          style={{ 
            cursor: 'pointer',
            display: 'block'
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>📁</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
            انقر هنا لاختيار ملفات PDF
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>
            يمكنك اختيار عدة ملفات باستخدام Ctrl+Click
          </div>
          <div style={{ color: '#999', fontSize: '12px', marginTop: '10px' }}>
            حد أقصى 10 ملفات - 50MB لكل ملف
          </div>
        </label>
      </div>

      {/* عرض الملفات المختارة */}
      {files.length > 0 && (
        <div style={{ 
          marginBottom: '30px',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>
            📄 الملفات المختارة ({files.length})
          </h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {files.map((file, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>
                    {file.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  إزالة
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* زر الدمج */}
      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={handleMerge}
          disabled={files.length === 0 || isProcessing}
          style={{
            padding: '15px 40px',
            backgroundColor: files.length > 0 && !isProcessing ? '#0070f3' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: files.length > 0 && !isProcessing ? 'pointer' : 'not-allowed',
            fontSize: '18px',
            fontWeight: 'bold',
            minWidth: '200px',
            transition: 'all 0.3s ease'
          }}
        >
          {isProcessing ? '🔄 جاري المعالجة...' : `🚀 دمج ${files.length} ملفات`}
        </button>
      </div>

      {/* معلومات */}
      <div style={{ 
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        borderRadius: '8px',
        border: '1px solid #ffeaa7'
      }}>
        <h4 style={{ color: '#856404', marginBottom: '10px' }}>💡 ملاحظة</h4>
        <p style={{ color: '#856404', margin: 0, fontSize: '14px' }}>
          خاصية الدمج الكاملة قيد التطوير. حالياً يمكنك اختيار وعرض عدة ملفات.
        </p>
      </div>
    </div>
  );
}