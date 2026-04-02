import { Content, Margins } from 'pdfmake/interfaces';
import { createHeader, createSubHeader } from '../../../shared/PDF-functions';
import { Adres } from '../../types/fa3.types';
import { generateAdres } from './Adres';
import { t } from '../../../shared/i18n';

export function generatePodmiotAdres(
  podmiotAdres: Adres | undefined,
  headerTitle = t('podmiotAdres.adres'),
  isSubheader = false,
  headerMargin?: Margins
): Content[] {
  if (!podmiotAdres) {
    return [];
  }
  return [
    ...(isSubheader ? createSubHeader(headerTitle, headerMargin) : createHeader(headerTitle, headerMargin)),
    ...generateAdres(podmiotAdres),
  ];
}
