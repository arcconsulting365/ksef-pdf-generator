import FormatTyp from '../enums/common.enum';
import { RodzajFaktury } from '../enums/invoice.enums';

export const TRodzajFaktury: Record<string, string> = Object.keys(RodzajFaktury).reduce(
  (acc, key) => {
    const typedKey = key as keyof typeof RodzajFaktury;

    acc[typedKey] = typedKey;
    return acc;
  },
  {} as Record<keyof typeof RodzajFaktury, string>
);

export const TypKorekty: Record<string, string> = {
  '1': 'dict.typKorekty.1',
  '2': 'dict.typKorekty.2',
  '3': 'dict.typKorekty.3',
};
export const TStawkaPodatku_FA1: Record<string, string> = {
  '23': '23%',
  '22': '22%',
  '8': '8%',
  '7': '7%',
  '5': '5%',
  '4': '4% lub 3% lub oo',
  '3': '4% lub 3% lub oo',
  '0': '0%',

  zw: 'dict.stawkaPodatku.zw1',
  oo: 'dict.stawkaPodatku.oo1',
  np: 'dict.stawkaPodatku.np1',
};

export const TStawkaPodatku_FA2: Record<string, string> = {
  '23': '23%',
  '22': '22%',
  '8': '8%',
  '7': '7%',
  '5': '5%',
  '4': '4%',
  '3': '3%',
  '0': '0%',

  zw: 'dict.stawkaPodatku.zw2',
  oo: 'dict.stawkaPodatku.oo2',
  np: 'dict.stawkaPodatku.np2',
};

export const TStawkaPodatku_FA3: Record<string, string> = {
  '23': '23%',
  '22': '22%',
  '8': '8%',
  '7': '7%',
  '5': '5%',
  '4': '4%',
  '3': '3%',

  '0 KR':
    '0% - KR',
  '0 WDT': '0% - WDT',
  '0 EX': '0% - EX',

  zw: 'zw',
  oo: 'oo',

  'np I':
    'np I',
  'np II':
    'np II',
};

export const Kraj: Record<string, string> = {
  AF: 'dict.kraj.AF', AX: 'dict.kraj.AX', AL: 'dict.kraj.AL', DZ: 'dict.kraj.DZ',
  AD: 'dict.kraj.AD', AO: 'dict.kraj.AO', AI: 'dict.kraj.AI', AQ: 'dict.kraj.AQ',
  AG: 'dict.kraj.AG', AN: 'dict.kraj.AN', SA: 'dict.kraj.SA', AR: 'dict.kraj.AR',
  AM: 'dict.kraj.AM', AW: 'dict.kraj.AW', AU: 'dict.kraj.AU', AT: 'dict.kraj.AT',
  AZ: 'dict.kraj.AZ', BS: 'dict.kraj.BS', BH: 'dict.kraj.BH', BD: 'dict.kraj.BD',
  BB: 'dict.kraj.BB', BE: 'dict.kraj.BE', BZ: 'dict.kraj.BZ', BJ: 'dict.kraj.BJ',
  BM: 'dict.kraj.BM', BT: 'dict.kraj.BT', BY: 'dict.kraj.BY', BO: 'dict.kraj.BO',
  BQ: 'dict.kraj.BQ', BA: 'dict.kraj.BA', BW: 'dict.kraj.BW', BR: 'dict.kraj.BR',
  BN: 'dict.kraj.BN', IO: 'dict.kraj.IO', BG: 'dict.kraj.BG', BF: 'dict.kraj.BF',
  BI: 'dict.kraj.BI', XC: 'dict.kraj.XC', CL: 'dict.kraj.CL', CN: 'dict.kraj.CN',
  HR: 'dict.kraj.HR', CW: 'dict.kraj.CW', CY: 'dict.kraj.CY', TD: 'dict.kraj.TD',
  ME: 'dict.kraj.ME', DK: 'dict.kraj.DK', DM: 'dict.kraj.DM', DO: 'dict.kraj.DO',
  DJ: 'dict.kraj.DJ', EG: 'dict.kraj.EG', EC: 'dict.kraj.EC', ER: 'dict.kraj.ER',
  EE: 'dict.kraj.EE', ET: 'dict.kraj.ET', FK: 'dict.kraj.FK', FJ: 'dict.kraj.FJ',
  PH: 'dict.kraj.PH', FI: 'dict.kraj.FI', FR: 'dict.kraj.FR', TF: 'dict.kraj.TF',
  GA: 'dict.kraj.GA', GM: 'dict.kraj.GM', GH: 'dict.kraj.GH', GI: 'dict.kraj.GI',
  GR: 'dict.kraj.GR', GD: 'dict.kraj.GD', GL: 'dict.kraj.GL', GE: 'dict.kraj.GE',
  GU: 'dict.kraj.GU', GG: 'dict.kraj.GG', GY: 'dict.kraj.GY', GF: 'dict.kraj.GF',
  GP: 'dict.kraj.GP', GT: 'dict.kraj.GT', GN: 'dict.kraj.GN', GQ: 'dict.kraj.GQ',
  GW: 'dict.kraj.GW', HT: 'dict.kraj.HT', ES: 'dict.kraj.ES', HN: 'dict.kraj.HN',
  HK: 'dict.kraj.HK', IN: 'dict.kraj.IN', ID: 'dict.kraj.ID', IQ: 'dict.kraj.IQ',
  IR: 'dict.kraj.IR', IE: 'dict.kraj.IE', IS: 'dict.kraj.IS', IL: 'dict.kraj.IL',
  JM: 'dict.kraj.JM', JP: 'dict.kraj.JP', YE: 'dict.kraj.YE', JE: 'dict.kraj.JE',
  JO: 'dict.kraj.JO', KY: 'dict.kraj.KY', KH: 'dict.kraj.KH', CM: 'dict.kraj.CM',
  CA: 'dict.kraj.CA', QA: 'dict.kraj.QA', KZ: 'dict.kraj.KZ', KE: 'dict.kraj.KE',
  KG: 'dict.kraj.KG', KI: 'dict.kraj.KI', CO: 'dict.kraj.CO', KM: 'dict.kraj.KM',
  CG: 'dict.kraj.CG', CD: 'dict.kraj.CD', KP: 'dict.kraj.KP', XK: 'dict.kraj.XK',
  CR: 'dict.kraj.CR', CU: 'dict.kraj.CU', KW: 'dict.kraj.KW', LA: 'dict.kraj.LA',
  LS: 'dict.kraj.LS', LB: 'dict.kraj.LB', LR: 'dict.kraj.LR', LY: 'dict.kraj.LY',
  LI: 'dict.kraj.LI', LT: 'dict.kraj.LT', LV: 'dict.kraj.LV', LU: 'dict.kraj.LU',
  MK: 'dict.kraj.MK', MG: 'dict.kraj.MG', YT: 'dict.kraj.YT', MO: 'dict.kraj.MO',
  MW: 'dict.kraj.MW', MV: 'dict.kraj.MV', MY: 'dict.kraj.MY', ML: 'dict.kraj.ML',
  MT: 'dict.kraj.MT', MP: 'dict.kraj.MP', MA: 'dict.kraj.MA', MQ: 'dict.kraj.MQ',
  MR: 'dict.kraj.MR', MU: 'dict.kraj.MU', MX: 'dict.kraj.MX', XL: 'dict.kraj.XL',
  FM: 'dict.kraj.FM', UM: 'dict.kraj.UM', MD: 'dict.kraj.MD', MC: 'dict.kraj.MC',
  MN: 'dict.kraj.MN', MS: 'dict.kraj.MS', MZ: 'dict.kraj.MZ', MM: 'dict.kraj.MM',
  NA: 'dict.kraj.NA', NR: 'dict.kraj.NR', NP: 'dict.kraj.NP', NL: 'dict.kraj.NL',
  DE: 'dict.kraj.DE', NE: 'dict.kraj.NE', NG: 'dict.kraj.NG', NI: 'dict.kraj.NI',
  NU: 'dict.kraj.NU', NF: 'dict.kraj.NF', NO: 'dict.kraj.NO', NC: 'dict.kraj.NC',
  NZ: 'dict.kraj.NZ', PS: 'dict.kraj.PS', OM: 'dict.kraj.OM', PK: 'dict.kraj.PK',
  PW: 'dict.kraj.PW', PA: 'dict.kraj.PA', PG: 'dict.kraj.PG', PY: 'dict.kraj.PY',
  PE: 'dict.kraj.PE', PN: 'dict.kraj.PN', PF: 'dict.kraj.PF', PL: 'dict.kraj.PL',
  GS: 'dict.kraj.GS', PT: 'dict.kraj.PT', PR: 'dict.kraj.PR', CF: 'dict.kraj.CF',
  CZ: 'dict.kraj.CZ', KR: 'dict.kraj.KR', ZA: 'dict.kraj.ZA', RE: 'dict.kraj.RE',
  RU: 'dict.kraj.RU', RO: 'dict.kraj.RO', RW: 'dict.kraj.RW', EH: 'dict.kraj.EH',
  BL: 'dict.kraj.BL', KN: 'dict.kraj.KN', LC: 'dict.kraj.LC', MF: 'dict.kraj.MF',
  VC: 'dict.kraj.VC', SV: 'dict.kraj.SV', WS: 'dict.kraj.WS', AS: 'dict.kraj.AS',
  SM: 'dict.kraj.SM', SN: 'dict.kraj.SN', RS: 'dict.kraj.RS', SC: 'dict.kraj.SC',
  SL: 'dict.kraj.SL', SG: 'dict.kraj.SG', SK: 'dict.kraj.SK', SI: 'dict.kraj.SI',
  SO: 'dict.kraj.SO', LK: 'dict.kraj.LK', PM: 'dict.kraj.PM', US: 'dict.kraj.US',
  SZ: 'dict.kraj.SZ', SD: 'dict.kraj.SD', SS: 'dict.kraj.SS', SR: 'dict.kraj.SR',
  SJ: 'dict.kraj.SJ', SH: 'dict.kraj.SH', SY: 'dict.kraj.SY', CH: 'dict.kraj.CH',
  SE: 'dict.kraj.SE', TJ: 'dict.kraj.TJ', TH: 'dict.kraj.TH', TW: 'dict.kraj.TW',
  TZ: 'dict.kraj.TZ', TG: 'dict.kraj.TG', TK: 'dict.kraj.TK', TO: 'dict.kraj.TO',
  TT: 'dict.kraj.TT', TN: 'dict.kraj.TN', TR: 'dict.kraj.TR', TM: 'dict.kraj.TM',
  TV: 'dict.kraj.TV', UG: 'dict.kraj.UG', UA: 'dict.kraj.UA', UY: 'dict.kraj.UY',
  UZ: 'dict.kraj.UZ', VU: 'dict.kraj.VU', WF: 'dict.kraj.WF', VA: 'dict.kraj.VA',
  HU: 'dict.kraj.HU', VE: 'dict.kraj.VE', GB: 'dict.kraj.GB', VN: 'dict.kraj.VN',
  IT: 'dict.kraj.IT', TL: 'dict.kraj.TL', CI: 'dict.kraj.CI', BV: 'dict.kraj.BV',
  CX: 'dict.kraj.CX', IM: 'dict.kraj.IM', SX: 'dict.kraj.SX', CK: 'dict.kraj.CK',
  VI: 'dict.kraj.VI', VG: 'dict.kraj.VG', HM: 'dict.kraj.HM', CC: 'dict.kraj.CC',
  MH: 'dict.kraj.MH', FO: 'dict.kraj.FO', SB: 'dict.kraj.SB', ST: 'dict.kraj.ST',
  TC: 'dict.kraj.TC', ZM: 'dict.kraj.ZM', CV: 'dict.kraj.CV', ZW: 'dict.kraj.ZW',
  AE: 'dict.kraj.AE', XI: 'dict.kraj.XI',
};

export const FA3RolaPodmiotu3: Record<string, string> = {
  '1': 'dict.fa3RolaPodmiotu3.1',
  '2': 'dict.fa3RolaPodmiotu3.2',
  '3': 'dict.fa3RolaPodmiotu3.3',
  '4': 'dict.fa3RolaPodmiotu3.4',
  '5': 'dict.fa3RolaPodmiotu3.5',
  '6': 'dict.fa3RolaPodmiotu3.6',
  '7': 'dict.fa3RolaPodmiotu3.7',
  '8': 'dict.fa3RolaPodmiotu3.8',
  '9': 'dict.fa3RolaPodmiotu3.9',
  '10': 'dict.fa3RolaPodmiotu3.10',
  '11': 'dict.fa3RolaPodmiotu3.11',
};

export const FA2RolaPodmiotu3: Record<string, string> = {
  '1': 'dict.fa2RolaPodmiotu3.1',
  '2': 'dict.fa2RolaPodmiotu3.2',
  '3': 'dict.fa2RolaPodmiotu3.3',
  '4': 'dict.fa2RolaPodmiotu3.4',
  '5': 'dict.fa2RolaPodmiotu3.5',
  '6': 'dict.fa2RolaPodmiotu3.6',
  '7': 'dict.fa2RolaPodmiotu3.7',
  '8': 'dict.fa2RolaPodmiotu3.8',
  '9': 'dict.fa2RolaPodmiotu3.9',
  '10': 'dict.fa2RolaPodmiotu3.10',
};

export const FA1RolaPodmiotu3: Record<string, string> = {
  '1': 'dict.fa1RolaPodmiotu3.1',
  '2': 'dict.fa1RolaPodmiotu3.2',
  '3': 'dict.fa1RolaPodmiotu3.3',
  '4': 'dict.fa1RolaPodmiotu3.4',
  '5': 'dict.fa1RolaPodmiotu3.5',
  '6': 'dict.fa1RolaPodmiotu3.6',
};

export const TRolaPodmiotuUpowaznionegoFA3: Record<string, string> = {
  '1': 'dict.rolaPodmiotuUpowaznionego.fa3.1',
  '2': 'dict.rolaPodmiotuUpowaznionego.fa3.2',
  '3': 'dict.rolaPodmiotuUpowaznionego.fa3.3',
};
export const TRolaPodmiotuUpowaznionegoFA2: Record<string, string> = {
  '1': 'dict.rolaPodmiotuUpowaznionego.fa2.1',
  '2': 'dict.rolaPodmiotuUpowaznionego.fa2.2',
  '3': 'dict.rolaPodmiotuUpowaznionego.fa2.3',
};
export const TRolaPodmiotuUpowaznionegoFA1: Record<string, string> = {
  '1': 'dict.rolaPodmiotuUpowaznionego.fa1.1',
  '2': 'dict.rolaPodmiotuUpowaznionego.fa1.2',
  '3': 'dict.rolaPodmiotuUpowaznionego.fa1.3',
};
export const FormaPlatnosci: Record<string, string> = {
  '1': 'dict.formaPlatnosci.1',
  '2': 'dict.formaPlatnosci.2',
  '3': 'dict.formaPlatnosci.3',
  '4': 'dict.formaPlatnosci.4',
  '5': 'dict.formaPlatnosci.5',
  '6': 'dict.formaPlatnosci.6',
  '7': 'dict.formaPlatnosci.7',
};

export const RodzajTransportu: Record<string, string> = {
  '1': 'dict.rodzajTransportu.1',
  '2': 'dict.rodzajTransportu.2',
  '3': 'dict.rodzajTransportu.3',
  '4': 'dict.rodzajTransportu.4',
  '5': 'dict.rodzajTransportu.5',
  '7': 'dict.rodzajTransportu.7',
  '8': 'dict.rodzajTransportu.8',
};

export const TypRachunkowWlasnych: Record<string, string> = {
  '1': 'dict.typRachunkowWlasnych.1',
  '2': 'dict.typRachunkowWlasnych.2',
  '3': 'dict.typRachunkowWlasnych.3',
};

export const Procedura: Record<string, string> = {
  '1': 'dict.procedura.1',
  '2': 'dict.procedura.2',
  '3': 'dict.procedura.3',
  '4': 'dict.procedura.4',
  '5': 'dict.procedura.5',
  '6': 'dict.procedura.6',
  '7': 'dict.procedura.7',
};

export const TableDataType: Record<string, FormatTyp> = {
  date: FormatTyp.Date,
  datetime: FormatTyp.DateTime,
  dec: FormatTyp.Currency,
  int: FormatTyp.Currency,
  time: FormatTyp.Time,
  txt: FormatTyp.Value,
};

export const TypLadunku: Record<string, string> = {
  '1': 'dict.typLadunku.1',
  '2': 'dict.typLadunku.2',
  '3': 'dict.typLadunku.3',
  '4': 'dict.typLadunku.4',
  '5': 'dict.typLadunku.5',
  '6': 'dict.typLadunku.6',
  '7': 'dict.typLadunku.7',
  '8': 'dict.typLadunku.8',
  '9': 'dict.typLadunku.9',
  '10': 'dict.typLadunku.10',
  '11': 'dict.typLadunku.11',
  '12': 'dict.typLadunku.12',
  '13': 'dict.typLadunku.13',
  '14': 'dict.typLadunku.14',
  '15': 'dict.typLadunku.15',
  '16': 'dict.typLadunku.16',
  '17': 'dict.typLadunku.17',
  '18': 'dict.typLadunku.18',
  '19': 'dict.typLadunku.19',
  '20': 'dict.typLadunku.20',
};

export const DEFAULT_TABLE_LAYOUT: {
  hLineWidth: () => number;
  hLineColor: () => string;
  vLineWidth: () => number;
  vLineColor: () => string;
} = {
  hLineWidth: (): number => 1,
  hLineColor: (): string => '#BABABA',
  vLineWidth: (): number => 1,
  vLineColor: (): string => '#BABABA',
};

export const TAXPAYER_STATUS: Record<string, string> = {
  '1': 'dict.taxpayerStatus.1',
  '2': 'dict.taxpayerStatus.2',
  '3': 'dict.taxpayerStatus.3',
  '4': 'dict.taxpayerStatus.4',
};
