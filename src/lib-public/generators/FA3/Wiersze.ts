import { Content } from 'pdfmake/interfaces';
import {
  createHeader,
  createLabelTextArray,
  createSection,
  formatText,
  getContentTable,
  getDifferentColumnsValue,
  getTable,
  getTStawkaPodatku,
  getValue,
} from '../../../shared/PDF-functions';
import { HeaderDefine } from '../../../shared/types/pdf-types';
import { TRodzajFaktury } from '../../../shared/consts/const';
import { Fa, FP } from '../../types/fa3.types';
import FormatTyp, { Position } from '../../../shared/enums/common.enum';
import { addMarza } from '../common/Wiersze';
import { t } from '../../../shared/i18n';

export function generateWiersze(faVat: Fa): Content {
  const table: Content[] = [];
  const rodzajFaktury: string | number | undefined = getValue(faVat.RodzajFaktury);
  const isP_PMarzy = Boolean(Number(getValue(faVat.Adnotacje?.PMarzy?.P_PMarzy)));
  const faWiersze: Record<string, FP>[] = getTable(faVat.FaWiersz).map(
    (wiersz: Record<string, FP>): Record<string, FP> => {
      const marza: Record<string, FP> = addMarza(rodzajFaktury, isP_PMarzy, wiersz)!;

      if (getValue(wiersz.P_12)) {
        wiersz.P_12._text = getTStawkaPodatku(getValue(wiersz.P_12) as string, 3);
      }
      return { ...wiersz, ...marza };
    }
  );
  const definedHeaderLp: HeaderDefine[] = [
    { name: 'NrWierszaFa', title: t('wiersze.lp'), format: FormatTyp.Default, width: 'auto' },
  ];
  const definedHeader1: HeaderDefine[] = [
    { name: 'UU_ID', title: t('wiersze.unikalnyNumer'), format: FormatTyp.Default, width: 'auto' },
    { name: 'P_7', title: t('wiersze.nazwaTowaru'), format: FormatTyp.Default, width: '*' },
    { name: 'P_9A', title: t('wiersze.cenaJednostkaNetto'), format: FormatTyp.Currency, width: 'auto' },
    { name: 'P_9B', title: t('wiersze.cenaJednostkaBrutto'), format: FormatTyp.Currency, width: 'auto' },
    { name: 'P_8B', title: t('wiersze.ilosc'), format: FormatTyp.Number, width: 'auto' },
    { name: 'P_8A', title: t('wiersze.miara'), format: FormatTyp.Default, width: 'auto' },
    { name: 'P_10', title: t('wiersze.rabat'), format: FormatTyp.Currency, width: 'auto' },
    { name: 'P_12', title: t('wiersze.stawkaPodatku'), format: FormatTyp.Default, width: 'auto' },
    { name: 'P_12_XII', title: t('wiersze.stawkaPodatkuOSS'), format: FormatTyp.Percentage, width: 'auto' },
    {
      name: 'P_12_Zal_15',
      title: t('wiersze.znacznikZal15'),
      format: FormatTyp.Default,
      width: 'auto',
    },
    { name: 'P_11', title: t('wiersze.wartoscNetto'), format: FormatTyp.Currency, width: 'auto' },
    { name: 'P_11A', title: t('wiersze.wartoscBrutto'), format: FormatTyp.Currency, width: 'auto' },
    { name: 'P_11Vat', title: t('wiersze.wartoscVat'), format: FormatTyp.Currency, width: 'auto' },
  ];

  if (getDifferentColumnsValue('KursWaluty', faWiersze).length !== 1) {
    definedHeader1.push({
      name: 'KursWaluty',
      title: t('wiersze.kursWaluty'),
      format: FormatTyp.Currency6,
      width: 'auto',
    });
  }
  definedHeader1.push({ name: 'StanPrzed', title: t('wiersze.stanPrzed'), format: FormatTyp.Boolean, width: 'auto' });
  const definedHeader2: HeaderDefine[] = [
    { name: 'GTIN', title: t('wiersze.gtin'), format: FormatTyp.Default, width: 'auto' },
    { name: 'PKWiU', title: t('wiersze.pkwiu'), format: FormatTyp.Default, width: 'auto' },
    { name: 'CN', title: t('wiersze.cn'), format: FormatTyp.Default, width: 'auto' },
    { name: 'PKOB', title: t('wiersze.pkob'), format: FormatTyp.Default, width: 'auto' },
    { name: 'KwotaAkcyzy', title: t('wiersze.kwotaAkcyzy'), format: FormatTyp.Default, width: 'auto' },
    { name: 'GTU', title: t('wiersze.gtu'), format: FormatTyp.Default, width: 'auto' },
    { name: 'Procedura', title: t('wiersze.procedura'), format: FormatTyp.Default, width: '*' },
    { name: 'P_6A', title: t('wiersze.dataDostawy'), format: FormatTyp.Default, width: 'auto' },
    { name: 'Indeks', title: t('wiersze.indeks'), format: FormatTyp.Default, width: 'auto' },
  ];
  let content = getContentTable<(typeof faWiersze)[0]>(
    [...definedHeaderLp, ...definedHeader1, ...definedHeader2],
    faWiersze,
    'auto'
  );
  const ceny = formatText(
    t('wiersze.fakturaWCenach', { ceny: content.fieldsWithValue.includes('P_11') ? t('szczegoly.netto') : t('szczegoly.brutto'), waluta: faVat.KodWaluty?._text ?? '' }),
    [FormatTyp.Label, FormatTyp.MarginBottom8]
  );

  const p_15 = getValue(faVat.P_15);
  let opis: Content = '';

  if (rodzajFaktury == TRodzajFaktury.ROZ && Number(p_15) !== 0) {
    opis = {
      stack: createLabelTextArray([
        { value: t('wiersze.kwotaPozostala'), formatTyp: FormatTyp.LabelGreater },
        {
          value: p_15,
          formatTyp: FormatTyp.CurrencyGreater,
          currency: getValue(faVat.KodWaluty)?.toString() ?? '',
        },
      ]),
      alignment: Position.RIGHT,
      margin: [0, 8, 0, 0],
    };
  } else if (
    (rodzajFaktury == TRodzajFaktury.VAT ||
      rodzajFaktury == TRodzajFaktury.KOR ||
      rodzajFaktury == TRodzajFaktury.KOR_ROZ ||
      rodzajFaktury == TRodzajFaktury.UPR) &&
    Number(p_15) !== 0
  ) {
    opis = {
      stack: createLabelTextArray([
        { value: t('wiersze.kwotaNaleznosci'), formatTyp: FormatTyp.LabelGreater },
        {
          value: p_15,
          formatTyp: [FormatTyp.CurrencyGreater, FormatTyp.HeaderContent, FormatTyp.Value],
          currency: getValue(faVat.KodWaluty)?.toString() ?? '',
        },
      ]),
      alignment: Position.RIGHT,
      margin: [0, 8, 0, 0],
    };
  }
  if (content.fieldsWithValue.length <= 8 && content.content) {
    table.push(content.content);
  } else {
    content = getContentTable<(typeof faWiersze)[0]>([...definedHeaderLp, ...definedHeader1], faWiersze, '*');
    if (content.content) {
      table.push(content.content);
    }
    content = getContentTable<(typeof faWiersze)[0]>([...definedHeaderLp, ...definedHeader2], faWiersze, '*');
    if (content.content && content.fieldsWithValue.length > 1) {
      table.push('\n');
      table.push(content.content);
    }
  }
  if (table.length < 1) {
    return [];
  }
  return createSection([...createHeader(t('wiersze.header')), ceny, ...table, opis], true);
}
