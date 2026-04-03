import { Content } from 'pdfmake/interfaces';
import { Kraj } from '../../../shared/consts/const';
import {
  createHeader,
  createLabelText,
  createSection,
  createSubHeader,
  formatText,
  generateTwoColumns,
  getTable,
  hasValue,
} from '../../../shared/PDF-functions';
import { Transport } from '../../types/fa3.types';
import {
  getDateTimeWithoutSeconds,
  getOpisTransportuString,
  getRodzajTransportuString,
} from '../../../shared/generators/common/functions';
import { generatePrzewoznik } from './Przewoznik';
import FormatTyp from '../../../shared/enums/common.enum';
import { t } from '../../../shared/i18n';

export function generateTransport(transport: Transport, index?: number | null): Content {
  const table: Content[] = [];
  const columns = {
    transport: [] as Content[],
    dane: [] as Content[],
    wysylkaZ: [] as Content[],
    wysylkaDo: [] as Content[],
    wysylkaPrzez: [] as Content[],
  };

  table.push(createHeader(index ? t('transport.headerIndex', { index }) : t('transport.header')));
  if (transport.RodzajTransportu?._text) {
    columns.transport.push(
      createLabelText(t('transport.rodzajTransportu'), getRodzajTransportuString(transport.RodzajTransportu))
    );
  } else if (transport.TransportInny?._text == '1' && transport.OpisInnegoTransportu?._text) {
    columns.transport.push(createLabelText(t('transport.rodzajTransportu'), t('transport.transportInny')));
    columns.transport.push(
      createLabelText(t('transport.opisInnegoTransportu'), transport.OpisInnegoTransportu)
    );
  }
  columns.dane.push(createLabelText(t('transport.numerZlecenia'), transport.NrZleceniaTransportu));
  if (hasValue(transport.OpisLadunku)) {
    columns.dane.push(createLabelText(t('transport.opisLadunku'), getOpisTransportuString(transport.OpisLadunku)));
    if (transport.LadunekInny?._text === '1' && transport.OpisInnegoLadunku?._text) {
      columns.dane.push(createLabelText(t('transport.opisLadunku'), t('transport.ladunekInny')));
      columns.dane.push(createLabelText(t('transport.opisInnegoLadunku'), transport.OpisInnegoLadunku));
    }
  }
  columns.dane.push(createLabelText(t('transport.jednostkaOpakowania'), transport.JednostkaOpakowania));
  columns.dane.push(
    createLabelText(
      t('transport.dataRozpoczecia'),
      getDateTimeWithoutSeconds(transport.DataGodzRozpTransportu)
    )
  );
  columns.dane.push(
    createLabelText(
      t('transport.dataZakonczenia'),
      getDateTimeWithoutSeconds(transport.DataGodzZakTransportu)
    )
  );
  if (columns.dane.length > 0) {
    columns.dane.unshift(createSubHeader(t('transport.daneTransportu'), [0, 0, 0, 0]));
  }
  table.push(generateTwoColumns(columns.transport, columns.dane));

  table.push(generatePrzewoznik(transport.Przewoznik));

  if (transport.WysylkaZ?.AdresL1) {
    columns.wysylkaZ.push(createSubHeader(t('transport.adresMiejscaWysylki'), [0, 0, 0, 0]));
    columns.wysylkaZ.push(formatText(transport.WysylkaZ?.AdresL1?._text, FormatTyp.Default));
    columns.wysylkaZ.push(formatText(transport.WysylkaZ?.AdresL2?._text, FormatTyp.Default));
    columns.wysylkaZ.push(formatText(t(Kraj[transport.WysylkaZ?.KodKraju?._text ?? '']), FormatTyp.Default));
    columns.wysylkaZ.push(createLabelText(t('transport.gln'), transport.WysylkaZ?.GLN?._text));
  }

  if (transport.WysylkaDo?.AdresL1) {
    columns.wysylkaDo.push(
      createSubHeader(t('transport.adresMiejscaDocelowego'), [0, 0, 0, 0])
    );
    columns.wysylkaDo.push(formatText(transport.WysylkaDo?.AdresL1?._text, FormatTyp.Default));
    columns.wysylkaDo.push(formatText(transport.WysylkaDo?.AdresL2?._text, FormatTyp.Default));
    columns.wysylkaDo.push(formatText(t(Kraj[transport.WysylkaDo?.KodKraju?._text ?? '']), FormatTyp.Default));
    columns.wysylkaDo.push(createLabelText(t('transport.gln'), transport.WysylkaDo?.GLN?._text));
  }

  const wysylkaPrzez = getTable(transport.WysylkaPrzez);

  wysylkaPrzez.forEach((adres, index) => {
    if (index) {
      columns.wysylkaPrzez.push('\n');
    }
    columns.wysylkaPrzez.push(createSubHeader(t('transport.adresPosredniWysylki'), [0, 4, 0, 0]));
    columns.wysylkaPrzez.push(formatText(adres.AdresL1?._text, FormatTyp.Default));
    columns.wysylkaPrzez.push(formatText(adres?.AdresL2?._text, FormatTyp.Default));
    columns.wysylkaPrzez.push(formatText(t(Kraj[adres?.KodKraju?._text ?? '']), FormatTyp.Default));
    columns.wysylkaPrzez.push(createLabelText(t('transport.gln'), adres?.GLN?._text));
  });

  if (transport.WysylkaZ?.AdresL1 || transport.WysylkaDo?.AdresL1 || transport.WysylkaPrzez?.length) {
    table.push(createHeader(t('transport.wysylka')));
    table.push(generateTwoColumns(columns.wysylkaZ, columns.wysylkaDo));
    table.push(generateTwoColumns(columns.wysylkaPrzez, []));
  }
  return createSection(table, true);
}
