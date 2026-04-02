import { Content } from 'pdfmake/interfaces';
import {
  createHeader,
  createLabelText,
  formatText,
  generateColumns,
  generateLine,
  getTable,
  verticalSpacing,
} from '../../../shared/PDF-functions';
import FormatTyp from '../../../shared/enums/common.enum';
import { Podmiot2, Podmiot2K } from '../../types/fa3.types';
import { generateDaneKontaktowe } from './PodmiotDaneKontaktowe';
import { generateCorrectedContent } from '../FA2/Podmiot2Podmiot2k';
import { generateAdres } from '../FA2/Adres';
import { generateDaneIdentyfikacyjneTPodmiot2Dto } from '../FA2/PodmiotDaneIdentyfikacyjneTPodmiot2Dto';
import { t } from '../../../shared/i18n';

export function generatePodmiot2Podmiot2K(podmiot2: Podmiot2, podmiot2K: Podmiot2K): Content[] {
  const result: Content[] = [];

  result.push(generateLine());
  result.push(createHeader(t('podmiot2.nabywca')));
  let firstColumn: Content[] = [];
  let secondColumn: Content[] = [];

  firstColumn.push(createHeader(t('podmiot2.daneIdentyfikacyjne')), createLabelText(t('podmiot2.numerEori'), podmiot2.NrEORI));
  if (podmiot2.DaneIdentyfikacyjne) {
    firstColumn.push(...generateDaneIdentyfikacyjneTPodmiot2Dto(podmiot2.DaneIdentyfikacyjne));
  }

  if (podmiot2.DaneKontaktowe) {
    firstColumn.push(formatText(t('podmiot2.daneKontaktowe'), [FormatTyp.Label, FormatTyp.LabelMargin]));
    if (podmiot2.NrKlienta) {
      firstColumn.push(createLabelText(t('podmiot2.numerKlienta'), podmiot2.NrKlienta));
    }
    firstColumn.push(generateDaneKontaktowe(getTable(podmiot2.DaneKontaktowe)));
  }

  if (firstColumn.length) {
    result.push({
      columns: [firstColumn, []],
      columnGap: 20,
    });
  }

  if (podmiot2K.DaneIdentyfikacyjne) {
    firstColumn = generateCorrectedContent(podmiot2K, t('podmiot2.trescKorygowana'));
    secondColumn = generateCorrectedContent(podmiot2, t('podmiot2.trescKorygujaca'));
  }

  if (podmiot2.AdresKoresp) {
    secondColumn.push(
      formatText(t('podmiot2.adresKorespondencyjny'), [FormatTyp.Label, FormatTyp.LabelMargin]),
      generateAdres(podmiot2.AdresKoresp)
    );
  }

  if (firstColumn.length || secondColumn.length) {
    result.push(generateColumns([firstColumn, secondColumn]));
  }
  if (result.length) {
    result.push(verticalSpacing(1));
  }
  return result;
}
