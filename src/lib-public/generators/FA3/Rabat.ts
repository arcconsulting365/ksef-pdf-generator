import { Content } from 'pdfmake/interfaces';
import {
  createHeader,
  createLabelText,
  createSection,
  formatText,
  generateTwoColumns,
  getContentTable,
  getTable,
} from '../../../shared/PDF-functions';
import { HeaderDefine } from '../../../shared/types/pdf-types';
import { Fa } from '../../types/fa3.types';
import FormatTyp, { Position } from '../../../shared/enums/common.enum';
import { t } from '../../../shared/i18n';

export function generateRabat(invoice: Fa): Content[] {
  const faRows = getTable(invoice!.FaWiersz);
  const result: Content[] = [];
  const definedHeader: HeaderDefine[] = [
    { name: 'NrWierszaFa', title: t('rabat.lp'), format: FormatTyp.Default },
    { name: 'P_7', title: t('rabat.nazwaTowaru'), format: FormatTyp.Default },
    { name: 'P_8B', title: t('rabat.ilosc'), format: FormatTyp.Default },
    { name: 'P_8A', title: t('rabat.miara'), format: FormatTyp.Default },
  ];
  const tabRabat = getContentTable<(typeof faRows)[0]>(definedHeader, faRows, '*');

  const isNrWierszaFa = tabRabat.fieldsWithValue.includes('NrWierszaFa');

  result.push(
    ...createHeader(t('rabat.header')),
    ...createLabelText(t('rabat.wartoscRabatuOgolem'), invoice.P_15, FormatTyp.Currency, {
      alignment: Position.RIGHT,
    }),
    generateTwoColumns(
      formatText(
        isNrWierszaFa ? t('rabat.nieDotyczyWszystkich') : t('rabat.dotyczyWszystkich'),
        FormatTyp.Default
      ),
      ''
    )
  );
  if (tabRabat.fieldsWithValue.length > 0 && tabRabat.content) {
    result.push(tabRabat.content);
  }

  return createSection(result, true);
}
