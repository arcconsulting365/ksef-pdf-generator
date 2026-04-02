import { Content } from 'pdfmake/interfaces';
import { createHeader, createLabelText, hasValue } from '../../../shared/PDF-functions';
import { PodmiotUpowazniony } from '../../types/fa3.types';
import { generatePodmiotAdres } from './PodmiotAdres';
import { generateDaneIdentyfikacyjneTPodmiot1Dto } from './PodmiotDaneIdentyfikacyjneTPodmiot1Dto';
import { generatePodmiotUpowaznionyDaneKontaktowe } from './PodmiotUpowaznionyDaneKontaktowe';
import { getRolaUpowaznionegoString } from '../../../shared/generators/common/functions';
import { t } from '../../../shared/i18n';

export function generatePodmiotUpowazniony(podmiotUpowazniony: PodmiotUpowazniony | undefined): Content[] {
  if (!podmiotUpowazniony) {
    return [];
  }
  const result: Content[] = createHeader(t('podmiotUpowazniony.header'));

  if (hasValue(podmiotUpowazniony.RolaPU)) {
    result.push(createLabelText(t('podmiotUpowazniony.rola'), getRolaUpowaznionegoString(podmiotUpowazniony.RolaPU, 3)));
  }
  if (hasValue(podmiotUpowazniony.NrEORI)) {
    result.push(createLabelText(t('podmiotUpowazniony.numerEori'), podmiotUpowazniony.NrEORI));
  }
  if (podmiotUpowazniony.DaneIdentyfikacyjne) {
    result.push(generateDaneIdentyfikacyjneTPodmiot1Dto(podmiotUpowazniony.DaneIdentyfikacyjne));
  }
  result.push([
    ...generatePodmiotAdres(podmiotUpowazniony.Adres),
    ...generatePodmiotAdres(podmiotUpowazniony.AdresKoresp, t('podmiotUpowazniony.adresKorespondencyjny')),
    ...generatePodmiotUpowaznionyDaneKontaktowe(podmiotUpowazniony.DaneKontaktowe),
  ]);

  return result;
}
