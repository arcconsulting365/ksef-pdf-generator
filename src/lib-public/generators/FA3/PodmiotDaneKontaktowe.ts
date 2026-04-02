import { Content } from 'pdfmake/interfaces';
import { createLabelText, getTable } from '../../../shared/PDF-functions';
import { Podmiot1DaneKontaktowe } from '../../types/fa3.types';
import { t } from '../../../shared/i18n';

export function generateDaneKontaktowe(daneKontaktowe: Podmiot1DaneKontaktowe[]): Content[] {
  return getTable(daneKontaktowe)?.map((daneKontaktowe) => {
    return [
      createLabelText(t('daneKontaktowe.email'), daneKontaktowe.Email),
      createLabelText(t('daneKontaktowe.telefon'), daneKontaktowe.Telefon),
    ];
  });
}
