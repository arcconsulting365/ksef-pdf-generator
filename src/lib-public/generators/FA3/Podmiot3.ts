import { Content } from 'pdfmake/interfaces';
import {
  createHeader,
  createLabelText,
  formatText,
  generateLine,
  generateTwoColumns,
} from '../../../shared/PDF-functions';
import FormatTyp from '../../../shared/enums/common.enum';
import { Podmiot3 } from '../../types/fa3.types';
import { generateDaneIdentyfikacyjneTPodmiot3Dto } from './PodmiotDaneIdentyfikacyjneTPodmiot3Dto';
import { generateDaneKontaktowe } from './PodmiotDaneKontaktowe';
import { getRolaString } from '../../../shared/generators/common/functions';
import { generateAdres } from '../FA2/Adres';
import { t } from '../../../shared/i18n';

export function generatePodmiot3(podmiot: Podmiot3, index: number): Content[] {
  const result: Content[] = [];

  result.push(generateLine());
  const column1: Content[] = [
    ...createHeader(t('podmiot3.header', { index: index + 1 })),
    createLabelText(t('podmiot3.identyfikatorNabywcy'), podmiot.IDNabywcy),
    createLabelText(t('podmiot3.numerEori'), podmiot.NrEORI),
    ...generateDaneIdentyfikacyjneTPodmiot3Dto(podmiot.DaneIdentyfikacyjne),
    createLabelText(t('podmiot3.rola'), getRolaString(podmiot.Rola, 3)),
    createLabelText(t('podmiot3.rolaInna'), podmiot.OpisRoli),
    createLabelText(t('podmiot3.udzial'), podmiot.Udzial, [FormatTyp.Percentage]),
  ];

  const column2: Content[] = [];

  if (podmiot.Adres) {
    column2.push(formatText(t('podmiot3.adres'), [FormatTyp.Label, FormatTyp.LabelMargin]), generateAdres(podmiot.Adres));
  }
  if (podmiot.AdresKoresp) {
    column2.push(
      formatText(t('podmiot3.adresKorespondencyjny'), [FormatTyp.Label, FormatTyp.LabelMargin]),
      ...generateAdres(podmiot.AdresKoresp)
    );
  }
  if (podmiot.DaneKontaktowe || podmiot.NrKlienta) {
    column2.push(formatText(t('podmiot3.daneKontaktowe'), [FormatTyp.Label, FormatTyp.LabelMargin]));
    if (podmiot.DaneKontaktowe) {
      column2.push(...generateDaneKontaktowe(podmiot.DaneKontaktowe));
    }
    if (podmiot.NrKlienta) {
      column2.push(createLabelText(t('podmiot3.numerKlienta'), podmiot.NrKlienta));
    }
  }
  result.push(generateTwoColumns(column1, column2));
  return result;
}
