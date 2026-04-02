import { Content, ContentTable, TableCell } from 'pdfmake/interfaces';
import {
  createHeader,
  createLabelText,
  formatText,
  generateColumns,
  getTable,
  getValue,
  hasValue,
  verticalSpacing,
} from '../../../shared/PDF-functions';
import FormatTyp from '../../../shared/enums/common.enum';
import { Adnotacje, NoweSrodkiTransportu } from '../../types/fa3.types';
import { t } from '../../../shared/i18n';

export function generateAdnotacje(adnotacje?: Adnotacje): Content[] {
  const result: Content[] = [];
  const firstColumn: Content[] = [];
  const secondColumn: Content[] = [];

  if (adnotacje) {
    const zwolnienie = adnotacje.Zwolnienie;

    if (zwolnienie?.P_19?._text === '1') {
      addToColumn(
        firstColumn,
        secondColumn,
        {
          text: t('adnotacje.dostawaZwolniona'),
        },
        true
      );
      if (zwolnienie.P_19A?._text) {
        addToColumn(
          firstColumn,
          secondColumn,
          createLabelText(
            t('adnotacje.podstawaZwolnienia'),
            t('adnotacje.przepisUstawy')
          ),
          true
        );
        addToColumn(
          firstColumn,
          secondColumn,
          createLabelText(t('adnotacje.przepisUstawyWartosc'), zwolnienie.P_19A._text),
          true
        );
      }
      if (zwolnienie.P_19B?._text) {
        addToColumn(
          firstColumn,
          secondColumn,
          createLabelText(
            t('adnotacje.podstawaZwolnienia'),
            t('adnotacje.przepisDyrektywy')
          ),
          true
        );
        addToColumn(
          firstColumn,
          secondColumn,
          createLabelText(t('adnotacje.przepisDyrektywyWartosc'), zwolnienie.P_19B._text),
          true
        );
      }
      if (zwolnienie.P_19C?._text) {
        addToColumn(
          firstColumn,
          secondColumn,
          createLabelText(
            t('adnotacje.podstawaZwolnienia'),
            t('adnotacje.innaPodstawaPrawna')
          ),
          true
        );
        addToColumn(
          firstColumn,
          secondColumn,
          createLabelText(t('adnotacje.innaPodstawaPrawnaWartosc'), zwolnienie.P_19C._text),
          true
        );
      }
    }

    if (
      adnotacje.NoweSrodkiTransportu?.P_42_5?._text === '1' ||
      adnotacje.NoweSrodkiTransportu?.P_42_5?._text === '2'
    ) {
      let obowiazekVAT: Content[] = [];
      let value = ' ';

      if (adnotacje.NoweSrodkiTransportu.P_42_5?._text === '1') {
        value = t('adnotacje.obowiazekVAT22Tak');
      } else if (adnotacje.NoweSrodkiTransportu.P_42_5?._text === '2') {
        value = t('adnotacje.obowiazekVAT22Nie');
      }
      obowiazekVAT = [
        ...createLabelText(t('adnotacje.wewnatrzwspolnotoweDostawy'), value ?? ''),
      ];
      if (obowiazekVAT) {
        addToColumn(firstColumn, secondColumn, obowiazekVAT, true);
      }
    }

    if (adnotacje.P_18A?._text === '1') {
      addToColumn(firstColumn, secondColumn, { text: t('adnotacje.mechanizmPodzielonejPlatnosci') });
    }
    if (adnotacje.P_16?._text === '1') {
      addToColumn(firstColumn, secondColumn, { text: t('adnotacje.metodaKasowa') });
    }
    if (adnotacje.P_18?._text === '1') {
      addToColumn(firstColumn, secondColumn, { text: t('adnotacje.odwrotneObciazenie') });
    }
    if (adnotacje.P_23?._text === '1') {
      addToColumn(firstColumn, secondColumn, { text: t('adnotacje.proceduraTrojstronna') });
    }
    if (adnotacje.PMarzy?.P_PMarzy?._text === '1') {
      let valueMarzy = '';

      if (adnotacje.PMarzy.P_PMarzy_3_1?._text === '1') {
        valueMarzy = t('adnotacje.towaryUzywane');
      } else if (adnotacje.PMarzy.P_PMarzy_3_2?._text === '1') {
        valueMarzy = t('adnotacje.dzielaSztuki');
      } else if (adnotacje.PMarzy.P_PMarzy_2?._text === '1') {
        valueMarzy = t('adnotacje.biuraPodrozy');
      } else if (adnotacje.PMarzy.P_PMarzy_3_3?._text === '1') {
        valueMarzy = t('adnotacje.przedmiotyKolekcjonerskie');
      }
      addToColumn(firstColumn, secondColumn, createLabelText(t('adnotacje.proceduraMarzy'), valueMarzy));
    }
    if (adnotacje.P_17?._text === '1') {
      addToColumn(firstColumn, secondColumn, { text: t('adnotacje.samofakturowanie') });
    }
    if (firstColumn.length || secondColumn.length) {
      result.push(generateColumns([firstColumn, secondColumn]));
    }

    if (result.length) {
      result.unshift(verticalSpacing(1));
      result.unshift(createHeader(t('adnotacje.header')));
      result.unshift(verticalSpacing(1));
      result.push(verticalSpacing(1));
    }

    if (
      adnotacje.NoweSrodkiTransportu?.P_42_5?._text === '1' ||
      adnotacje.NoweSrodkiTransportu?.P_42_5?._text === '2'
    ) {
      result.push(generateDostawy(adnotacje.NoweSrodkiTransportu));
    }
  }
  return result;
}

export function generateDostawy(noweSrodkiTransportu: NoweSrodkiTransportu): Content[] {
  const nowySrodekTransportu = getTable(noweSrodkiTransportu.NowySrodekTransportu);
  let tableBody: TableCell[] = [];
  const table: ContentTable = {
    table: {
      headerRows: 1,
      widths: [100, '*'],
      body: [] as TableCell[][],
    },
    layout: {
      hLineWidth: () => 1,
      hLineColor: () => '#BABABA',
      vLineWidth: () => 1,
      vLineColor: () => '#BABABA',
    },
    marginTop: 4,
  };

  if (nowySrodekTransportu?.length) {
    const definedHeader: Content[] = [
      { text: t('adnotacje.dataDopuszczenia'), style: FormatTyp.GrayBoldTitle },
      { text: t('adnotacje.opis'), style: FormatTyp.GrayBoldTitle },
    ];

    tableBody = nowySrodekTransportu.map((item) => {
      const value: string[] = [];
      const anyP22B =
        hasValue(item.P_22B) ||
        hasValue(item.P_22BT) ||
        hasValue(item.P_22B1) ||
        hasValue(item.P_22B2) ||
        hasValue(item.P_22B3) ||
        hasValue(item.P_22B4);
      const anyP22C = hasValue(item.P_22C) || hasValue(item.P_22C1);
      const anyP22D = hasValue(item.P_22D) || hasValue(item.P_22D1);
      const anyP22N =
        hasValue(item.P_22B1) || hasValue(item.P_22B2) || hasValue(item.P_22B3) || hasValue(item.P_22B4);

      if (item.P_NrWierszaNST?._text) {
        value.push(item.P_NrWierszaNST._text);
      }
      if (anyP22B) {
        value.push(t('adnotacje.dostawaPojazdow'));
      } else if (anyP22C) {
        value.push(t('adnotacje.dostawaJednostekPlywajacych'));
      } else if (anyP22D) {
        value.push(t('adnotacje.dostawaStatkowPowietrznych'));
      }

      const transportProperties = [
        getValue(item.P_22BMK),
        getValue(item.P_22BMD),
        getValue(item.P_22BK),
        getValue(item.P_22BNR),
        getValue(item.P_22BRP),
      ].filter((prop) => !!prop);

      if (transportProperties.length) {
        value.push(transportProperties.join(', '));
      }

      if (item.DetailsString?._text) {
        value.push(item.DetailsString._text);
      }
      if (anyP22B || anyP22C || anyP22D) {
        value.push(item.P_22B?._text ?? item.P_22C?._text ?? item.P_22D?._text ?? '');
      }
      if (item.P_22C1?._text) {
        value.push(`${t('adnotacje.numerKadluba')}${item.P_22C1._text}`);
      }
      if (item.P_22D1?._text) {
        value.push(`${t('adnotacje.numerFabryczny')}${item.P_22D1._text}`);
      }
      if (anyP22N) {
        if (item.P_22B1?._text) {
          value.push(`${t('adnotacje.numerVIN')}${item.P_22B1._text}`);
        }
        if (item.P_22B2?._text) {
          value.push(`${t('adnotacje.numerNadwozia')}${item.P_22B2._text}`);
        }
        if (item.P_22B3?._text) {
          value.push(`${t('adnotacje.numerPodwozia')}${item.P_22B3._text}`);
        }
        if (item.P_22B4?._text) {
          value.push(`${t('adnotacje.numerRamy')}${item.P_22B4._text}`);
        }
      }
      if (item.P_22BT?._text) {
        value.push(item.P_22BT._text);
      }
      return [formatText(item.P_22A?._text), { text: value.join('\n') }];
    });
    table.table.body = [[...definedHeader], ...tableBody] as TableCell[][];
  }

  return tableBody.length ? [table, verticalSpacing(1)] : [];
}

function addToColumn(
  firstColumn: Content[],
  secondColumn: Content[],
  content: Content,
  isFirstColumn?: boolean
): void {
  if (firstColumn.length > secondColumn.length && isFirstColumn) {
    secondColumn.push(content);
    return;
  }
  firstColumn.push(content);
}
