import { Content, ContentText } from 'pdfmake/interfaces';
import { formatText, generateLine } from '../../../shared/PDF-functions';
import { TRodzajFaktury } from '../../../shared/consts/const';
import { Fa as Fa1 } from '../../types/fa1.types';
import { Fa as Fa2 } from '../../types/fa2.types';
import { Fa as Fa3, Zalacznik } from '../../types/fa3.types';
import FormatTyp, { Position } from '../../../shared/enums/common.enum';
import { AdditionalDataTypes } from '../../types/common.types';
import { t } from '../../../shared/i18n';

export function generateNaglowek(
  fa?: Fa2 | Fa3 | Fa1,
  additionalData?: AdditionalDataTypes,
  zalacznik?: Zalacznik
): Content[] {
  let invoiceName = '???';

  switch (fa?.RodzajFaktury?._text) {
    case TRodzajFaktury.VAT:
      invoiceName = t('naglowek.fakturaVat');
      break;
    case TRodzajFaktury.ZAL:
      invoiceName = t('naglowek.fakturaZaliczkowa');
      break;
    case TRodzajFaktury.ROZ:
      invoiceName = t('naglowek.fakturaRozliczeniowa');
      break;
    case TRodzajFaktury.KOR_ROZ:
      invoiceName = t('naglowek.fakturaKorygujacaRozliczeniowa');
      break;
    case TRodzajFaktury.KOR_ZAL:
      invoiceName = t('naglowek.fakturaKorygujacaZaliczkowa');
      break;
    case TRodzajFaktury.KOR:
      if (fa?.OkresFaKorygowanej != null) {
        invoiceName = t('naglowek.fakturaKorygujacaZbiorcza');
      } else {
        invoiceName = t('naglowek.fakturaKorygujaca');
      }
      break;
    case TRodzajFaktury.UPR:
      invoiceName = t('naglowek.fakturaUproszczona');
      break;
  }

  return [
    {
      text: [
        { text: t('naglowek.krajowy'), fontSize: 18 },
        { text: t('naglowek.e'), color: 'red', bold: true, fontSize: 18 },
        { text: t('naglowek.faktur'), bold: true, fontSize: 18 },
      ],
    },
    { ...(formatText(t('naglowek.numerFaktury'), FormatTyp.ValueMedium) as ContentText), alignment: Position.RIGHT },
    { ...(formatText(fa?.P_2?._text, FormatTyp.HeaderPosition) as ContentText), alignment: Position.RIGHT },
    {
      ...(formatText(invoiceName, [FormatTyp.ValueMedium, FormatTyp.Default]) as ContentText),
      alignment: Position.RIGHT,
    },
    ...(additionalData?.nrKSeF
      ? [
          {
            text: [
              formatText(t('naglowek.numerKSeF'), FormatTyp.LabelMedium) as ContentText,
              formatText(additionalData?.nrKSeF, FormatTyp.ValueMedium),
            ],
            alignment: Position.RIGHT,
          } as Content,
        ]
      : []),
    ...(additionalData?.isMobile && zalacznik
      ? [
          { stack: [generateLine()], margin: [0, 8, 0, 8] } as Content,
          {
            text: [
              formatText(
                t('naglowek.uwagaZalacznik'),
                FormatTyp.Bold
              ),
            ],
          },
        ]
      : []),
  ];
}
