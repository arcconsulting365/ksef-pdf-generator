import { generateInvoice } from '../lib-public';
import { AdditionalDataTypes } from '../lib-public/types/common.types';

export interface GeneratePdfData {
  xmlContent: string;
  nrKSeF?: string;
  qrCode?: string;
  qrCode2?: string;
  isMobile?: boolean;
}

export async function generatePdfFromData(data: GeneratePdfData): Promise<Buffer> {
  const { xmlContent, nrKSeF, qrCode, qrCode2, isMobile } = data;

  if (!xmlContent) {
    throw new Error('Missing XML content');
  }

  const file = new File([xmlContent], 'invoice.xml', {
    type: 'application/xml'
  });

  const additionalData: AdditionalDataTypes = {
    nrKSeF,
    qrCode,
    qrCode2,
    isMobile
  };

  const pdfBlob = await generateInvoice(file, additionalData, 'blob');
  const buffer = Buffer.from(await pdfBlob.arrayBuffer());

  return buffer;
}
