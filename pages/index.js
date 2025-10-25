export default function Home() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl'
    }}>
      <h1 style={{ color: '#0070f3' }}>🛠 أدوات PDF المجانية</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        أدوات PDF مجانية وسهلة - الإصدار الجديد
      </p>
      
      <div style={{ marginTop: '50px' }}>
        <a href="/merge-pdf" style={buttonStyle}>
          🌗 دمج PDF
        </a>
        <a href="/split-pdf" style={buttonStyle}>
          ✂️ تقسيم PDF
        </a>
        <a href="/compress-pdf" style={buttonStyle}>
          📦 ضغط PDF
        </a>
      </div>

      <div style={{ marginTop: '60px', padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h3>🚀 المميزات</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✅ مجاني بالكامل</li>
          <li>✅ لا حاجة للتسجيل</li>
          <li>✅ آمن وخاص</li>
          <li>✅ سهل الاستخدام</li>
        </ul>
      </div>
    </div>
  );
}

const buttonStyle = {
  display: 'inline-block',
  margin: '15px',
  padding: '15px 30px',
  backgroundColor: '#0070f3',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  minWidth: '150px'
};
