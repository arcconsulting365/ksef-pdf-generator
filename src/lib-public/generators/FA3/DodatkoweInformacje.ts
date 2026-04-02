import { Content } from 'pdfmake/interfaces';
import {
  createHeader,
  createSection,
  createSubHeader,
  formatText,
  getContentTable,
  getTable,
  getValue,
} from '../../../shared/PDF-functions';
import { HeaderDefine } from '../../../shared/types/pdf-types';
import { DodatkowyOpi, Fa } from '../../types/fa3.types';
import FormatTyp from '../../../shared/enums/common.enum';
import { t } from '../../../shared/i18n';

export function generateDodatkoweInformacje(faVat: Fa): Content[] {
  const tpLabel: Content[] = [];

  if (getValue(faVat.TP) === '1') {
    tpLabel.push(
      formatText(t('dodatkoweInformacje.powiazania'))
    );
  }

  const fpLabel: Content[] = [];
  
  if (getValue(faVat.FP) === '1') {
    fpLabel.push(formatText(t('dodatkoweInformacje.fakturaArt109')));
  }

  const zwrotAkcyzyLabel: Content[] = [];

  if (getValue(faVat.ZwrotAkcyzy) === '1') {
    zwrotAkcyzyLabel.push(
      formatText(
        t('dodatkoweInformacje.zwrotAkcyzy')
      )
    );
  }

  const labels = [tpLabel, fpLabel, zwrotAkcyzyLabel].filter((el) => el.length > 0);
  const table: Content[] = [
    ...createHeader(t('dodatkoweInformacje.header')),
    ...labels,
    ...generateDodatkowyOpis(faVat.DodatkowyOpis),
  ];

  return table.length > 1 ? createSection(table, true) : [];
}

function generateDodatkowyOpis(fakturaZaliczkowaData: DodatkowyOpi[] | undefined): Content[] {
  if (!fakturaZaliczkowaData) {
    return [];
  }
  const fakturaZaliczkowa = getTable(fakturaZaliczkowaData)?.map((item, index) => ({
    ...item,
    lp: { _text: index + 1 },
  }));
  const table: Content[] = createSubHeader(t('dodatkoweInformacje.dodatkowyOpis'));

  const fakturaZaliczkowaHeader: HeaderDefine[] = [
    {
      name: 'lp',
      title: t('dodatkoweInformacje.lp'),
      format: FormatTyp.Default,
      width: 'auto',
    },
    {
      name: 'NrWiersza',
      title: t('dodatkoweInformacje.numerWiersza'),
      format: FormatTyp.Default,
      width: 'auto',
    },
    {
      name: 'Klucz',
      title: t('dodatkoweInformacje.rodzajInformacji'),
      format: FormatTyp.Default,
      width: 'auto',
    },
    {
      name: 'Wartosc',
      title: t('dodatkoweInformacje.trescInformacji'),
      format: FormatTyp.Default,
      width: '*',
    },
  ];
  const tableFakturaZaliczkowa = getContentTable<(typeof fakturaZaliczkowa)[0]>(
    fakturaZaliczkowaHeader,
    fakturaZaliczkowa,
    '*',
    [0, 0, 0, 0]
  );

  if (tableFakturaZaliczkowa.content) {
    table.push(tableFakturaZaliczkowa.content);
  }
  return table;
}
