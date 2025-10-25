export default function Home() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#0070f3', marginBottom: '20px' }}>🛠 أدوات PDF المجانية</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
          مجموعة أدوات مجانية وسهلة لمعالجة ملفات PDF
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <a href="/merge-pdf" style={buttonStyle}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🌗</div>
            دمج PDF
          </a>
          <a href="/split-pdf" style={buttonStyle}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>✂️</div>
            تقسيم PDF
          </a>
          <a href="/compress-pdf" style={buttonStyle}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📦</div>
            ضغط PDF
          </a>
        </div>

        <div style={{ marginTop: '60px', padding: '30px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#333', marginBottom: '20px' }}>🚀 المميزات</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={featureStyle}>✅ مجاني بالكامل</div>
            <div style={featureStyle}>✅ لا حاجة للتسجيل</div>
            <div style={featureStyle}>✅ آمن وخاص</div>
            <div style={featureStyle}>✅ سهل الاستخدام</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  display: 'block',
  padding: '25px 20px',
  backgroundColor: '#0070f3',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  border: '2px solid #0070f3'
};

const featureStyle = {
  padding: '10px',
  backgroundColor: 'white',
  borderRadius: '5px',
  fontWeight: 'bold'
};