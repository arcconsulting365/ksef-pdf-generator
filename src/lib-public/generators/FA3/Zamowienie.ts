import { Content } from 'pdfmake/interfaces';
import {
  createHeader,
  createLabelTextArray,
  formatText,
  getContentTable,
  getTable,
  getTStawkaPodatku,
  getValue,
} from '../../../shared/PDF-functions';
import { HeaderDefine } from '../../../shared/types/pdf-types';
import { TRodzajFaktury } from '../../../shared/consts/const';
import { Zamowienie } from '../../types/fa3.types';
import FormatTyp, { Position } from '../../../shared/enums/common.enum';
import { ZamowienieKorekta } from '../../enums/invoice.enums';
import { t } from '../../../shared/i18n';

export function generateZamowienie(
  orderData: Zamowienie | undefined,
  zamowienieKorekta: ZamowienieKorekta,
  p_15: string,
  rodzajFaktury: string,
  KodWaluty: string,
  P_PMarzy?: string
): Content[] {
  if (!orderData) {
    return [];
  }
  const formatAbs =
    zamowienieKorekta === ZamowienieKorekta.BeforeCorrection ? FormatTyp.CurrencyAbs : FormatTyp.Currency;
  const orderTable = getTable(orderData?.ZamowienieWiersz).map((el, index) => {
    if (!el.NrWierszaZam._text) {
      el.NrWierszaZam._text = (index + 1).toString();
    }
    el.P_12Z = { _text: getTStawkaPodatku(getValue(el.P_12Z) as string, 3, P_PMarzy) };
    return el;
  });
  const definedHeaderLp: HeaderDefine[] = [
    { name: 'NrWierszaZam', title: t('zamowienie.lp'), format: FormatTyp.Default, width: 'auto' },
  ];
  const definedHeader1: HeaderDefine[] = [
    { name: 'UU_ID', title: t('zamowienie.unikalnyNumer'), format: FormatTyp.Default, width: 'auto' },
    { name: 'P_7Z', title: t('zamowienie.nazwaTowaru'), format: FormatTyp.Default, width: '*' },
    {
      name: 'P_9AZ',
      title: t('zamowienie.cenaJednostkaNetto'),
      format: formatAbs,
      width: 'auto',
    },
    { name: 'P_8BZ', title: t('zamowienie.ilosc'), format: FormatTyp.Right, width: 'auto' },
    { name: 'P_8AZ', title: t('zamowienie.miara'), format: FormatTyp.Default, width: 'auto' },
    { name: 'P_12Z', title: t('zamowienie.stawkaPodatku'), format: FormatTyp.Default, width: 'auto' },
    { name: 'P_12Z_XII', title: t('zamowienie.stawkaPodatkuOSS'), format: FormatTyp.Percentage, width: 'auto' },
    {
      name: 'P_12Z_Zal_15',
      title: t('zamowienie.znacznikZal15'),
      format: FormatTyp.Default,
      width: 'auto',
    },
    { name: 'P_11NettoZ', title: t('zamowienie.wartoscNetto'), format: formatAbs, width: 'auto' },
    { name: 'P_11VatZ', title: t('zamowienie.kwotaPodatku'), format: formatAbs, width: 'auto' },
  ];
  const definedHeader2: HeaderDefine[] = [
    { name: 'UU_IDZ', title: t('zamowienie.numerUmowyZamowienia'), format: FormatTyp.Default, width: 'auto' },
    { name: 'GTINZ', title: t('zamowienie.gtin'), format: FormatTyp.Default, width: 'auto' },
    { name: 'PKWiUZ', title: t('zamowienie.pkwiu'), format: FormatTyp.Default, width: 'auto' },
    { name: 'CNZ', title: t('zamowienie.cn'), format: FormatTyp.Default, width: 'auto' },
    { name: 'PKOBZ', title: t('zamowienie.pkob'), format: FormatTyp.Default, width: 'auto' },
    { name: 'KwotaAkcyzyZ', title: t('zamowienie.kwotaPodatkuAkcyzowego'), format: FormatTyp.Currency, width: 'auto' },
    { name: 'GTUZ', title: t('zamowienie.gtu'), format: FormatTyp.Default, width: 'auto' },
    { name: 'ProceduraZ', title: t('zamowienie.oznaczeniaProcedur'), format: FormatTyp.Default, width: '*' },
    { name: 'IndeksZ', title: t('zamowienie.indeks'), format: FormatTyp.Default, width: 'auto' },
    { name: 'StanPrzedZ', title: t('zamowienie.stanPrzed'), format: FormatTyp.Boolean, width: 'auto' },
  ];

  let content = getContentTable<(typeof orderTable)[0]>(
    [...definedHeaderLp, ...definedHeader1, ...definedHeader2],
    orderTable,
    '*'
  );
  const table: Content[] = [];

  if (content.fieldsWithValue.length <= 8) {
    if (content.content) {
      table.push(content.content);
    }
  } else {
    content = getContentTable<(typeof orderTable)[0]>(
      [...definedHeaderLp, ...definedHeader1],
      orderTable,
      '*'
    );
    if (content.content) {
      table.push(content.content);
    }
    content = getContentTable<(typeof orderTable)[0]>(
      [...definedHeaderLp, ...definedHeader2],
      orderTable,
      '*'
    );
    if (content.content && content.fieldsWithValue.length > 1) {
      table.push(content.content);
    }
  }
  const ceny = t('zamowienie.fakturaWCenach', { ceny: content.fieldsWithValue.includes('P_11') ? t('szczegoly.netto') : t('szczegoly.brutto'), waluta: KodWaluty });
  let opis: Content = '';

  if (Number(p_15) > 0 && rodzajFaktury == TRodzajFaktury.ZAL) {
    opis = {
      stack: createLabelTextArray([
        { value: t('zamowienie.otrzymanaKwotaZaliczki'), formatTyp: FormatTyp.LabelGreater },
        { value: p_15, formatTyp: FormatTyp.CurrencyGreater },
      ]),
      alignment: Position.RIGHT,
      margin: [0, 8, 0, 0],
    };
  } else if (
    zamowienieKorekta !== ZamowienieKorekta.BeforeCorrection &&
    rodzajFaktury == TRodzajFaktury.KOR_ZAL &&
    Number(p_15) >= 0
  ) {
    opis = {
      stack: createLabelTextArray([
        { value: t('zamowienie.kwotaNaleznosci'), formatTyp: FormatTyp.LabelGreater },
        { value: p_15, formatTyp: FormatTyp.CurrencyGreater },
      ]),
      alignment: Position.RIGHT,
      margin: [0, 8, 0, 0],
    };
  }
  return [
    {
      stack: [
        createHeader(zamowienieKorekta),
        ceny,
        {
          text: [
            t('zamowienie.wartoscZamowienia'),
            formatText(orderData.WartoscZamowienia?._text, FormatTyp.Currency),
          ],
          marginBottom: 4,
        },
        ...table,
        opis,
      ],
    },
  ];
}
