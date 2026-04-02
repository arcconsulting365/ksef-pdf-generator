import { Content, ContentText } from 'pdfmake/interfaces';
import {
  createHeader,
  createLabelText,
  formatText,
  generateLine,
  generateTwoColumns,
  getContentTable,
  getTable,
  getValue,
  hasValue,
} from '../../../shared/PDF-functions';
import { HeaderDefine } from '../../../shared/types/pdf-types';
import { Platnosc } from '../../types/fa3.types';
import { getFormaPlatnosciString } from '../../../shared/generators/common/functions';
import { generujRachunekBankowy } from './RachunekBankowy';
import FormatTyp from '../../../shared/enums/common.enum';
import { t } from '../../../shared/i18n';

export function generatePlatnosc(platnosc: Platnosc | undefined): Content {
  if (!platnosc) {
    return [];
  }
  const terminPlatnosci = getTable(platnosc.TerminPlatnosci);

  const zaplataCzesciowaHeader: HeaderDefine[] = [
    {
      name: 'Termin',
      title: t('platnosc.terminPlatnosci'),
      format: FormatTyp.Default,
    },
  ];

  if (terminPlatnosci.some((termin) => termin.TerminOpis)) {
    zaplataCzesciowaHeader.push({ name: 'TerminOpis', title: t('platnosc.opisPlatnosci'), format: FormatTyp.Default });
  }

  const zaplataCzesciowaNaglowek: HeaderDefine[] = [
    {
      name: 'DataZaplatyCzesciowej',
      title: t('platnosc.dataZaplatyCzesciowej'),
      format: FormatTyp.Default,
    },
    { name: 'KwotaZaplatyCzesciowej', title: t('platnosc.kwotaZaplatyCzesciowej'), format: FormatTyp.Currency },
    { name: 'FormaPlatnosci', title: t('platnosc.formaPlatnosci'), format: FormatTyp.FormOfPayment },
  ];

  const table: Content[] = [generateLine(), ...createHeader(t('platnosc.header'))];

  //  TODO: Add to FA2 and FA1? (KSEF20-15289)
  if (getValue(platnosc.Zaplacono) === '1') {
    table.push(createLabelText(t('platnosc.informacjaOPlatnosci'), t('platnosc.zaplacono')));
    table.push(createLabelText(t('platnosc.dataZaplaty'), platnosc.DataZaplaty, FormatTyp.Date));
  } else if (
    getValue(platnosc.ZnacznikZaplatyCzesciowej) === '1' ||
    getValue(platnosc.ZnacznikZaplatyCzesciowej) === '2'
  ) {
    table.push(createLabelText(t('platnosc.informacjaOPlatnosci'), t('platnosc.zaplataCzesciowa')));
    table.push(
      createLabelText(
        t('platnosc.informacjaOPlatnosciKontynuacja'),
        getValue(platnosc.ZnacznikZaplatyCzesciowej) === '1'
          ? t('platnosc.zaplaconoWCzesci')
          : t('platnosc.zaplaconoCalosc')
      )
    );
  } else {
    table.push(createLabelText(t('platnosc.informacjaOPlatnosci'), t('platnosc.brakZaplaty')));
  }

  if (hasValue(platnosc.FormaPlatnosci)) {
    table.push(createLabelText(t('platnosc.formaLabel'), getFormaPlatnosciString(platnosc.FormaPlatnosci)));
  } else {
    if (platnosc.OpisPlatnosci?._text) {
      table.push(createLabelText(t('platnosc.formaLabel'), t('platnosc.platnoscInna')));
      table.push(createLabelText(t('platnosc.opisPlatnosciInnej'), platnosc.OpisPlatnosci));
    }
  }

  const zaplataCzesciowa = getTable(platnosc.ZaplataCzesciowa);
  const tableZaplataCzesciowa = getContentTable<(typeof zaplataCzesciowa)[0]>(
    zaplataCzesciowaNaglowek,
    zaplataCzesciowa,
    '*',
    undefined,
    20
  );
  const terminPatnosciContent = terminPlatnosci.map((platnosc) => {
    if (!terminPlatnosci.some((termin) => termin.TerminOpis)) {
      return platnosc;
    } else {
      return {
        ...platnosc,
        TerminOpis: {
          _text: `${platnosc.TerminOpis?.Ilosc?._text ?? ''} ${platnosc.TerminOpis?.Jednostka?._text ?? ''} ${platnosc.TerminOpis?.ZdarzeniePoczatkowe?._text ?? ''}`,
        } as any,
      };
    }
  });

  const tableTerminPlatnosci = getContentTable<(typeof terminPlatnosci)[0]>(
    zaplataCzesciowaHeader,
    terminPatnosciContent,
    '*',
    undefined,
    20
  );

  if (zaplataCzesciowa.length > 0 && terminPlatnosci.length > 0) {
    table.push(
      generateTwoColumns(
        tableZaplataCzesciowa.content ?? [],
        tableTerminPlatnosci.content ?? [],
        [0, 4, 0, 0]
      )
    );
  } else if (terminPlatnosci.length > 0) {
    if (tableTerminPlatnosci.content) {
      table.push(generateTwoColumns([], tableTerminPlatnosci.content));
    }
  } else if (zaplataCzesciowa.length > 0 && tableZaplataCzesciowa.content) {
    table.push(tableZaplataCzesciowa.content);
  }

  if (platnosc.LinkDoPlatnosci) {
    table.push(formatText(t('platnosc.linkDoPlatnosci'), FormatTyp.Label));
    table.push({
      text: formatText(platnosc.LinkDoPlatnosci._text, FormatTyp.Link),
      link: formatText(platnosc.LinkDoPlatnosci._text, FormatTyp.Link),
    } as ContentText);
  }
  if (platnosc.IPKSeF?._text) {
    table.push(createLabelText(t('platnosc.identyfikatorKSeF'), platnosc.IPKSeF));
  }

  const rachunekBankowy: Content[][] = getTable(platnosc.RachunekBankowy).map((rachunek) =>
    generujRachunekBankowy([rachunek], t('platnosc.numerRachunku'))
  );
  const rachunekBankowyFaktora: Content[][] = getTable(platnosc.RachunekBankowyFaktora).map((rachunek) =>
    generujRachunekBankowy([rachunek], t('platnosc.numerRachunkuFaktora'))
  );
  const rachunkiBankowe: Content[][] = [...rachunekBankowy, ...rachunekBankowyFaktora];

  if (rachunkiBankowe.length > 0) {
    rachunkiBankowe.forEach((rachunek, index) => {
      if (index % 2 === 0) {
        table.push(generateTwoColumns(rachunek, rachunkiBankowe[index + 1] ?? []));
      }
    });
  }

  if (platnosc.Skonto) {
    table.push(createHeader(t('platnosc.skonto'), [0, 0]));
    table.push(createLabelText(t('platnosc.warunkiSkonta'), platnosc.Skonto.WarunkiSkonta));
    table.push(createLabelText(t('platnosc.wysokoscSkonta'), platnosc.Skonto.WysokoscSkonta));
  }
  return table;
}
