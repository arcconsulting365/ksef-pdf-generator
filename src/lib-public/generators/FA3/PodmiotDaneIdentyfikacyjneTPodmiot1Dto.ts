import { Content } from 'pdfmake/interfaces';
import { createLabelText } from '../../../shared/PDF-functions';
import { DaneIdentyfikacyjne } from '../../types/fa3.types';
import { t } from '../../../shared/i18n';

export function generateDaneIdentyfikacyjneTPodmiot1Dto(daneIdentyfikacyjne: DaneIdentyfikacyjne): Content[] {
  return [
    createLabelText(t('daneIdentyfikacyjne.nip'), daneIdentyfikacyjne.NIP),
    createLabelText(t('daneIdentyfikacyjne.nazwa'), daneIdentyfikacyjne.Nazwa),
  ];
}
