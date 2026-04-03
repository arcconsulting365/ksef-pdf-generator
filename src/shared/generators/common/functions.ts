import {
  FA1RolaPodmiotu3,
  FA2RolaPodmiotu3,
  FA3RolaPodmiotu3,
  FormaPlatnosci,
  RodzajTransportu,
  TRolaPodmiotuUpowaznionegoFA1,
  TRolaPodmiotuUpowaznionegoFA2,
  TRolaPodmiotuUpowaznionegoFA3,
  TypLadunku,
  TypRachunkowWlasnych,
} from '../../consts/const';
import { FP as FP2 } from '../../../lib-public/types/fa2.types';
import { t } from '../../i18n';

export function getRolaString(rola: FP2 | undefined, FA: 1 | 2 | 3): string {
  if (!rola || !rola._text) {
    return '';
  }
  switch (FA) {
    case 1:
      return t(FA1RolaPodmiotu3[rola._text as keyof typeof FA1RolaPodmiotu3]);
    case 2:
      return t(FA2RolaPodmiotu3[rola._text as keyof typeof FA2RolaPodmiotu3]);
    case 3:
      return t(FA3RolaPodmiotu3[rola._text as keyof typeof FA3RolaPodmiotu3]);
  }
}

export function getRolaUpowaznionegoString(rola: FP2 | undefined, FA: 1 | 2 | 3): string {
  if (!rola || !rola._text) {
    return '';
  }
  switch (FA) {
    case 1:
      return t(TRolaPodmiotuUpowaznionegoFA1[rola._text]);
    case 2:
      return t(TRolaPodmiotuUpowaznionegoFA2[rola._text]);
    case 3:
      return t(TRolaPodmiotuUpowaznionegoFA3[rola._text]);
  }
}

export function getFormaPlatnosciString(formaPlatnosci: FP2 | undefined): string {
  if (!formaPlatnosci || !formaPlatnosci._text) {
    return '';
  }
  return t(FormaPlatnosci[formaPlatnosci._text as keyof typeof FormaPlatnosci]) ?? '';
}

export function getRodzajTransportuString(rodzajTransportu: FP2 | undefined): string {
  if (!rodzajTransportu || !rodzajTransportu._text) {
    return '';
  }
  return t(RodzajTransportu[rodzajTransportu._text as keyof typeof RodzajTransportu]) ?? '';
}

export function getOpisTransportuString(opisTransportu: FP2 | undefined): string {
  if (!opisTransportu || !opisTransportu._text) {
    return '';
  }
  return t(TypLadunku[opisTransportu._text as keyof typeof TypLadunku]) ?? '';
}

export function getTypRachunkowWlasnych(typRachonkowWlasnych: FP2 | undefined): string {
  if (!typRachonkowWlasnych || !typRachonkowWlasnych._text) {
    return '';
  }
  return t(TypRachunkowWlasnych[typRachonkowWlasnych._text as keyof typeof TypRachunkowWlasnych]) ?? '';
}

export function formatDateTime(data?: string, withoutSeconds?: boolean, withoutTime?: boolean): string {
  if (!data) {
    return '';
  }
  const dateTime: Date = new Date(data);

  if (isNaN(dateTime.getTime())) {
    return data;
  }

  const year: number = dateTime.getFullYear();
  const month: string = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const day: string = dateTime.getDate().toString().padStart(2, '0');
  const hours: string = dateTime.getHours().toString().padStart(2, '0');
  const minutes: string = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds: string = dateTime.getSeconds().toString().padStart(2, '0');

  if (withoutTime) {
    return `${day}.${month}.${year}`;
  } else if (withoutSeconds) {
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

export function getDateTimeWithoutSeconds(isoDate?: FP2): string {
  if (!isoDate?._text) {
    return '';
  }
  return formatDateTime(isoDate._text, true);
}
export function formatTime(data?: string, withoutSeconds?: boolean): string {
    if (!data) {
        return '';
    }
    const dateTime: Date = new Date(data);

    if (isNaN(dateTime.getTime())) {
        return data;
    }

    const hours: string = dateTime.getHours().toString().padStart(2, '0');
    const minutes: string = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds: string = dateTime.getSeconds().toString().padStart(2, '0');

    if (withoutSeconds) {
        return `${hours}:${minutes}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}