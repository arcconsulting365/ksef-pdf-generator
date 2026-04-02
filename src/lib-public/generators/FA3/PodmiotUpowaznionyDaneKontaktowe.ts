import { Content } from 'pdfmake/interfaces';
import {
  createLabelText,
  formatText,
  getTable,
  hasValue,
  verticalSpacing,
} from '../../../shared/PDF-functions';
import FormatTyp from '../../../shared/enums/common.enum';
import { PodmiotUpowaznionyDaneKontaktowe } from '../../types/fa3.types';
import { t } from '../../../shared/i18n';

export function generatePodmiotUpowaznionyDaneKontaktowe(
  daneKontaktoweSource: PodmiotUpowaznionyDaneKontaktowe[] | undefined
): Content[] {
  if (!daneKontaktoweSource) {
    return [];
  }
  const result: Content[] = [formatText(t('podmiotUpowazniony.daneKontaktowe'), FormatTyp.Description)];
  const daneKontaktowe = getTable(daneKontaktoweSource);

  if (daneKontaktowe.length === 0) {
    return [];
  }
  daneKontaktowe.forEach((kontakt) => {
    if (hasValue(kontakt.EmailPU)) {
      result.push(createLabelText(t('daneKontaktowe.email'), kontakt.EmailPU));
    }
    if (hasValue(kontakt.TelefonPU)) {
      result.push(createLabelText(t('daneKontaktowe.telefon'), kontakt.TelefonPU));
    }
    result.push(verticalSpacing(1));
  });
  return result;
}
