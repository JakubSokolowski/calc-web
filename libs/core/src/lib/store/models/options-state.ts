import { AppTheme } from '@calc/ui';
import { Language } from '@calc/i18n';

export interface OptionsState {
    showComplement: boolean;
    showDecimalValue: boolean;
    theme: AppTheme;
    language: Language;
}

export const optionsInitialState: OptionsState = {
    showComplement: true,
    showDecimalValue: true,
    theme: AppTheme.Dark,
    language: Language.en
};
