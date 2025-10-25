import { PDFDocument } from 'pdf-lib';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files } = req.body;
    
    const mergedPdf = await PDFDocument.create();
    
    for (const fileData of files) {
      const pdfBytes = Buffer.from(fileData.base64, 'base64');
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }
    
    const mergedPdfBytes = await mergedPdf.save();
    const base64 = Buffer.from(mergedPdfBytes).toString('base64');
    
    res.status(200).json({ 
      success: true, 
      pdf: base64 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to merge PDFs' });
  }
}