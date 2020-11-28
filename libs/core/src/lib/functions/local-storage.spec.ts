import { loadOptionsWithFallback, optionsKey, updateOptions } from './local-storage';
import { Language } from '@calc/i18n';
import { optionsInitialState, OptionsState } from '../store/models/options-state';

describe('local-storage', () => {
    describe('#loadOptionsWithFallback', () => {
        it('should return default options if there are no options in local storage', () => {
            // given
            localStorage.clear();

            // when
            const options = loadOptionsWithFallback();

            // then
            expect(options).toEqual(optionsInitialState);
        });

        it('should return stored options if they are any', () => {
            // given
            const storedOptions: OptionsState = {
                ...optionsInitialState,
                showComplement: false,
                showDecimalValue: false
            };

            localStorage.setItem(optionsKey, JSON.stringify(storedOptions));

            // when
            const options = loadOptionsWithFallback();

            // then
            expect(options).toEqual(storedOptions);
        });
    });

    describe('#updateOptions', () => {
        it('should update stored options key', () => {
            // given
            const storedOptions: OptionsState = {...optionsInitialState, language: Language.pl};
            localStorage.setItem(optionsKey, JSON.stringify(storedOptions));

            // when
            updateOptions('language', Language.en);
            const updatedOptions = JSON.parse(localStorage.getItem(optionsKey));

            // then
            const expected: OptionsState = {...optionsInitialState, language: Language.en};
            expect(updatedOptions).toEqual(expected);
        })
    })
});
