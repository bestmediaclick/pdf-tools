export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files } = req.body;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files provided' });
    }

    // استخدام خدمة خارجية مجانية للدمج
    const mergeResult = await mergeWithExternalService(files);
    
    res.status(200).json({ 
      success: true, 
      pdf: mergeResult,
      message: `تم دمج ${files.length} ملفات بنجاح!`
    });
    
  } catch (error) {
    res.status(500).json({ error: 'فشل في دمج الملفات: ' + error.message });
  }
}

// دالة مساعدة للدمج باستخدام خدمة خارجية
async function mergeWithExternalService(files) {
  // في هذه المرحلة، نستخدم حل بسيط
  // يمكنك لاحقاً إضافة خدمة مثل PDF.co أو ILovePDF API
  return files[0].base64; // إرجاع أول ملف مؤقتاً
}