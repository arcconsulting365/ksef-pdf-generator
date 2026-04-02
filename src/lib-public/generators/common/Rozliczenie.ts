import { Content, ContentTable } from 'pdfmake/interfaces';
import {
  createHeader,
  createLabelText,
  createLabelTextArray,
  createSection,
  createSubHeader,
  generateColumns,
  generateTwoColumns,
  getContentTable,
  getTable,
} from '../../../shared/PDF-functions';
import { HeaderDefine } from '../../../shared/types/pdf-types';
import { Rozliczenie as Rozliczenie1, Zenia } from '../../types/fa1.types';
import { Rozliczenie as Rozliczenie2, Rozliczenie as Rozliczenie3 } from '../../types/fa2.types';
import FormatTyp, { Position } from '../../../shared/enums/common.enum';
import { FormContentState } from '../../../shared/types/additional-data.types';
import { t } from '../../../shared/i18n';

export function generateRozliczenie(
  rozliczenie: Rozliczenie1 | Rozliczenie2 | Rozliczenie3 | undefined,
  KodWaluty: string
): Content[] {
  if (!rozliczenie) {
    return [];
  }
  const obciazenia: Zenia[] = getTable(rozliczenie?.Obciazenia);
  const odliczenia: Zenia[] = getTable(rozliczenie?.Odliczenia);
  const result: Content[] = [];
  const headerOdliczenia: HeaderDefine[] = [
    {
      title: t('rozliczenie.powodOdliczenia'),
      name: 'Powod',
      format: FormatTyp.Default,
    },
    {
      title: t('rozliczenie.kwotaOdliczenia'),
      name: 'Kwota',
      format: FormatTyp.Currency,
    },
  ];
  const headerObciazenia: HeaderDefine[] = [
    {
      name: 'Powod',
      title: t('rozliczenie.powodObciazenia'),
      format: FormatTyp.Default,
    },
    {
      name: 'Kwota',
      title: t('rozliczenie.kwotaObciazenia'),
      format: FormatTyp.Currency,
    },
  ];
  const tableObciazenia: FormContentState = getContentTable<(typeof obciazenia)[0]>(
    headerObciazenia,
    obciazenia,
    '*',
    undefined,
    20
  );
  const tableOdliczenia: FormContentState = getContentTable<(typeof odliczenia)[0]>(
    headerOdliczenia,
    odliczenia,
    '*',
    undefined,
    20
  );
  const SumaObciazen: Content[] = createLabelText(
    t('rozliczenie.sumaObciazen'),
    rozliczenie.SumaObciazen,
    FormatTyp.Currency,
    {
      alignment: Position.RIGHT,
    }
  );
  const Sumaodliczen: Content[] = createLabelText(
    t('rozliczenie.sumaOdliczen'),
    rozliczenie?.SumaOdliczen,
    FormatTyp.Currency,
    {
      alignment: Position.RIGHT,
    }
  );
  const resultObciazenia: (ContentTable | Content[])[] = [
    createSubHeader(t('rozliczenie.obciazenia')),
    tableObciazenia.content ?? [],
    SumaObciazen,
  ];
  const resultOdliczenia: (ContentTable | Content[])[] = [
    createSubHeader(t('rozliczenie.odliczenia')),
    tableOdliczenia.content ?? [],
    Sumaodliczen,
  ];

  result.push(createHeader(t('rozliczenie.header'), [0, 8, 0, 4]));
  if (obciazenia.length > 0 && odliczenia.length > 0) {
    result.push(generateColumns([resultObciazenia, resultOdliczenia]));
  } else if (obciazenia.length > 0) {
    result.push(generateTwoColumns([resultObciazenia], []));
  } else if (odliczenia.length > 0) {
    result.push(generateTwoColumns([], [resultOdliczenia]));
  }

  if (rozliczenie?.DoZaplaty?._text) {
    result.push({
      stack: createLabelTextArray([
        { value: t('rozliczenie.doZaplaty'), formatTyp: FormatTyp.LabelGreater },
        { value: rozliczenie?.DoZaplaty, formatTyp: FormatTyp.CurrencyGreater, currency: KodWaluty },
      ]),
      alignment: Position.RIGHT,
      margin: [0, 8, 0, 0],
    });
  } else if (rozliczenie?.DoRozliczenia?._text) {
    result.push({
      stack: createLabelTextArray([
        { value: t('rozliczenie.doRozliczenia'), formatTyp: FormatTyp.LabelGreater },
        { value: rozliczenie?.DoRozliczenia, formatTyp: FormatTyp.CurrencyGreater, currency: KodWaluty },
      ]),
      alignment: Position.RIGHT,
      marginTop: 8,
    });
  }

  return createSection(result, true);
}
