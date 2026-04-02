import { Content } from 'pdfmake/interfaces';
import { createLabelText, createLabelTextArray, hasValue } from '../../../shared/PDF-functions';
import FormatTyp from '../../../shared/enums/common.enum';
import { Podmiot3DaneIdentyfikacyjne } from '../../types/fa3Podmiot3DaneIdentyfikacyjne.types';
import { t } from '../../../shared/i18n';

export function generateDaneIdentyfikacyjneTPodmiot3Dto(
  daneIdentyfikacyjne: Podmiot3DaneIdentyfikacyjne | undefined
): Content[] {
  if (!daneIdentyfikacyjne) {
    return [];
  }
  const result: Content[] = [];

  if (hasValue(daneIdentyfikacyjne.NIP)) {
    result.push(createLabelText(t('daneIdentyfikacyjne.nip'), daneIdentyfikacyjne.NIP, FormatTyp.Default));
  } else if (hasValue(daneIdentyfikacyjne.IDWew)) {
    result.push(createLabelText(t('daneIdentyfikacyjne.identyfikatorWewnetrzny'), daneIdentyfikacyjne.IDWew, FormatTyp.Default));
  } else if (hasValue(daneIdentyfikacyjne.KodUE)) {
    result.push(
      createLabelTextArray([
        { value: t('daneIdentyfikacyjne.numerVatUE'), formatTyp: FormatTyp.Label },
        { value: daneIdentyfikacyjne.KodUE, formatTyp: FormatTyp.Default },
        { value: '' },
        { value: daneIdentyfikacyjne.NrVatUE, formatTyp: FormatTyp.Default },
      ])
    );
  } else if (hasValue(daneIdentyfikacyjne.NrID)) {
    result.push(
      createLabelTextArray([
        { value: t('daneIdentyfikacyjne.identyfikatorPodatkowyInny'), formatTyp: FormatTyp.Label },
        { value: daneIdentyfikacyjne.KodKraju, formatTyp: FormatTyp.Default },
        { value: '' },
        { value: daneIdentyfikacyjne.NrID, formatTyp: FormatTyp.Default },
      ])
    );
  } else if (daneIdentyfikacyjne.BrakID?._text === '1') {
    result.push(createLabelText(t('daneIdentyfikacyjne.brakIdentyfikatora'), ' ', FormatTyp.Default));
  }

  if (hasValue(daneIdentyfikacyjne.Nazwa)) {
    result.push(createLabelText(t('daneIdentyfikacyjne.nazwa'), daneIdentyfikacyjne.Nazwa, FormatTyp.Default));
  }
  return result;
}
