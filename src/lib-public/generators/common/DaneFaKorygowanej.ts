import { Content } from 'pdfmake/interfaces';
import { TypKorekty } from '../../../shared/consts/const';
import {
  createHeader,
  createLabelText,
  createSection,
  generateTwoColumns,
  getTable,
} from '../../../shared/PDF-functions';
import { DaneFaKorygowanej, Fa as Fa1 } from '../../types/fa1.types';
import { Fa as Fa2 } from '../../types/fa2.types';
import { Fa as Fa3 } from '../../types/fa3.types';
import { t } from '../../../shared/i18n';

export function generateDaneFaKorygowanej(invoice?: Fa1 | Fa2 | Fa3): Content[] {
  const result: Content[] = [];
  let firstColumn: Content[] = [];
  let secondColumn: Content[] = [];
  let previousSection: boolean = false;

  if (invoice) {
    const daneFakturyKorygowanej: DaneFaKorygowanej[] = getTable(invoice.DaneFaKorygowanej ?? []);

    if (invoice.NrFaKorygowany) {
      firstColumn.push(createLabelText(t('daneFaKorygowanej.poprawnyNumer'), invoice.NrFaKorygowany));
    }
    if (invoice.PrzyczynaKorekty) {
      firstColumn.push(
        createLabelText(t('daneFaKorygowanej.przyczyna'), invoice.PrzyczynaKorekty)
      );
    }
    if (invoice.TypKorekty?._text) {
      firstColumn.push(createLabelText(t('daneFaKorygowanej.typSkutku'), TypKorekty[invoice.TypKorekty._text]));
    }

    if (firstColumn.length) {
      firstColumn.unshift(createHeader(t('daneFaKorygowanej.header')));
    }

    if (daneFakturyKorygowanej?.length === 1) {
      secondColumn.push(createHeader(t('daneFaKorygowanej.daneIdentyfikacyjne')));
      generateCorrectiveData(daneFakturyKorygowanej[0], secondColumn);
      if (firstColumn.length > 0 || secondColumn.length) {
        if (firstColumn.length) {
          result.push(generateTwoColumns(firstColumn, secondColumn));
        } else {
          result.push(generateTwoColumns(secondColumn, []));
        }
        previousSection = true;
      }
      firstColumn = [];
      secondColumn = [];
    } else {
      if (firstColumn.length > 1) {
        result.push(generateTwoColumns(firstColumn, []));
        previousSection = true;
      }
      firstColumn = [];
      daneFakturyKorygowanej?.forEach((item: DaneFaKorygowanej, index: number): void => {
        if (index % 2 === 0) {
          firstColumn.push(createHeader(t('daneFaKorygowanej.daneIdentyfikacyjneIndex', { index: index + 1 })));
          generateCorrectiveData(item, firstColumn);
        } else {
          secondColumn.push(createHeader(t('daneFaKorygowanej.daneIdentyfikacyjneIndex', { index: index + 1 })));
          generateCorrectiveData(item, secondColumn);
        }
      });
    }
  }

  if (firstColumn.length && secondColumn.length) {
    result.push(createSection([generateTwoColumns(firstColumn, secondColumn)], previousSection));
  }
  return createSection(result, true);
}

function generateCorrectiveData(data: DaneFaKorygowanej, column: Content[]): void {
  if (data.DataWystFaKorygowanej) {
    column.push(
      createLabelText(
        t('daneFaKorygowanej.dataWystawienia'),
        data.DataWystFaKorygowanej
      )
    );
  }
  if (data.NrFaKorygowanej) {
    column.push(createLabelText(t('daneFaKorygowanej.numerFaktury'), data.NrFaKorygowanej));
  }
  if (data.NrKSeFFaKorygowanej) {
    column.push(createLabelText(t('daneFaKorygowanej.numerKSeF'), data.NrKSeFFaKorygowanej));
  }
}
