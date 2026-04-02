import { Content } from 'pdfmake/interfaces';
import {
  createHeader,
  createLabelText,
  createSection,
  createSubHeader,
  formatText,
  generateTwoColumns,
  getContentTable,
  getTable,
} from '../../../shared/PDF-functions';
import { HeaderDefine } from '../../../shared/types/pdf-types';
import { FP, Umowy, WarunkiTransakcji, Zamowienia } from '../../types/fa3.types';
import { generateTransport } from './Transport';
import FormatTyp from '../../../shared/enums/common.enum';
import { t } from '../../../shared/i18n';

export function generateWarunkiTransakcji(warunkiTransakcji: WarunkiTransakcji | undefined): Content {
  if (!warunkiTransakcji) {
    return [];
  }
  const table: Content[] = [];
  const Kolumny = { umowy: [] as Content[], zamowienia: [] as Content[] };
  const umowy: Umowy[] = getTable(warunkiTransakcji?.Umowy);
  const zamowienia: Zamowienia[] = getTable(warunkiTransakcji?.Zamowienia);
  const partiaTowaru: FP[] = getTable(warunkiTransakcji?.NrPartiiTowaru);
  const definedHeaderUmowy: HeaderDefine[] = [
    { name: 'DataUmowy', title: t('warunkiTransakcji.dataUmowy'), format: FormatTyp.Default },
    { name: 'NrUmowy', title: t('warunkiTransakcji.numerUmowy'), format: FormatTyp.Default },
  ];
  const definedHeaderZamowienia: HeaderDefine[] = [
    { name: 'DataZamowienia', title: t('warunkiTransakcji.dataZamowienia'), format: FormatTyp.Default },
    { name: 'NrZamowienia', title: t('warunkiTransakcji.numerZamowienia'), format: FormatTyp.Default },
  ];
  const definedHeaderPartiaTowaru: HeaderDefine[] = [
    { name: '', title: t('warunkiTransakcji.numerPartiiTowaru'), format: FormatTyp.Default },
  ];

  table.push(createHeader(t('warunkiTransakcji.header'), [0, 8, 0, 4]));

  if (umowy.length > 0) {
    const tabUmowy = getContentTable<(typeof umowy)[0]>(definedHeaderUmowy, umowy, '*', undefined, 20);

    if (tabUmowy.content) {
      Kolumny.umowy = [createSubHeader(t('warunkiTransakcji.umowa')), tabUmowy.content];
    }
  }
  if (zamowienia.length > 0) {
    const tabZamowienia = getContentTable<(typeof zamowienia)[0]>(
      definedHeaderZamowienia,
      zamowienia,
      '*',
      undefined,
      20
    );

    if (tabZamowienia.content && tabZamowienia.fieldsWithValue.length > 0) {
      Kolumny.zamowienia = [createSubHeader(t('warunkiTransakcji.zamowienie')), tabZamowienia.content];
    }
  }

  if (Kolumny.zamowienia.length > 0 || Kolumny.umowy.length > 0) {
    table.push(generateTwoColumns(Kolumny.umowy, Kolumny.zamowienia));
  }
  if (warunkiTransakcji.WalutaUmowna?._text || warunkiTransakcji.KursUmowny?._text) {
    table.push(createHeader(t('warunkiTransakcji.walutaUmownaIKurs'), [0, 8, 0, 4]));

    table.push(createLabelText(t('warunkiTransakcji.walutaUmowna'), warunkiTransakcji.WalutaUmowna));
    table.push(createLabelText(t('warunkiTransakcji.kursUmowny'), warunkiTransakcji.KursUmowny));
  }

  if (partiaTowaru.length > 0) {
    const tabPartiaTowaru = getContentTable<(typeof partiaTowaru)[0]>(
      definedHeaderPartiaTowaru,
      partiaTowaru,
      '*',
      [0, 4]
    );

    if (tabPartiaTowaru.content) {
      table.push(generateTwoColumns(tabPartiaTowaru.content, ''));
    }
  }

  table.push(
    createLabelText(t('warunkiTransakcji.warunkiDostawy'), warunkiTransakcji.WarunkiDostawy, FormatTyp.MarginTop4)
  );

  if (warunkiTransakcji.PodmiotPosredniczacy?._text === '1') {
    table.push(
      formatText(
        t('warunkiTransakcji.podmiotPosredniczacy'),
        [FormatTyp.Label, FormatTyp.MarginTop4]
      )
    );
  }

  if (warunkiTransakcji.Transport) {
    getTable(warunkiTransakcji.Transport).forEach((transport, index) => {
      table.push(
        generateTransport(transport, getTable(warunkiTransakcji.Transport).length !== 0 ? index + 1 : null)
      );
    });
  }

  return createSection(table, true);
}
