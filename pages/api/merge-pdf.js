import { PDFDocument } from 'pdf-lib';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files } = req.body;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files provided' });
    }

    const mergedPdf = await PDFDocument.create();
    
    for (const fileData of files) {
      try {
        const pdfBytes = Buffer.from(fileData.base64, 'base64');
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pageIndices = pdfDoc.getPageIndices();
        const pages = await mergedPdf.copyPages(pdfDoc, pageIndices);
        
        pages.forEach(page => {
          mergedPdf.addPage(page);
        });
      } catch (error) {
        console.error('Error processing file:', error);
        continue;
      }
    }

    // تأكد أن هناك صفحات مدمجة
    if (mergedPdf.getPageCount() === 0) {
      return res.status(400).json({ error: 'No valid PDF pages to merge' });
    }

    const mergedPdfBytes = await mergedPdf.save();
    const base64 = Buffer.from(mergedPdfBytes).toString('base64');
    
    res.status(200).json({ 
      success: true, 
      pdf: base64,
      pageCount: mergedPdf.getPageCount()
    });
    
  } catch (error) {
    console.error('Merge error:', error);
    res.status(500).json({ error: 'Failed to merge PDFs: ' + error.message });
  }
}