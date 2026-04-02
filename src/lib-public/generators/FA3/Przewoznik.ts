import { Content } from 'pdfmake/interfaces';
import { createHeader, generateTwoColumns } from '../../../shared/PDF-functions';
import { Przewoznik } from '../../types/fa3.types';
import { generatePodmiotAdres } from './PodmiotAdres';
import { generateDaneIdentyfikacyjneTPodmiot2Dto } from './PodmiotDaneIdentyfikacyjneTPodmiot2Dto';
import { DaneIdentyfikacyjneTPodmiot2Dto } from '../../types/fa2-additional-types';
import { t } from '../../../shared/i18n';

export function generatePrzewoznik(przewoznik: Przewoznik | undefined): Content {
  if (!przewoznik) {
    return [];
  }
  return [
    ...createHeader(t('przewoznik.header')),
    [
      generateTwoColumns(
        generateDaneIdentyfikacyjneTPodmiot2Dto(
          przewoznik.DaneIdentyfikacyjne as DaneIdentyfikacyjneTPodmiot2Dto
        ),
        generatePodmiotAdres(przewoznik.AdresPrzewoznika, t('przewoznik.adres'), true, [0, 0, 0, 0]),
        [0, 0, 0, 8]
      ),
    ],
  ];
}
