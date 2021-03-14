import { getBconvConvertButton, getInputBaseInput, getInputStrInput, getOutputBaseInput } from './bconv';
import 'cypress-plugin-snapshots/commands';
import path from 'path';
import { getCellByCoords } from './positional-calculator';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable<Subject> {
            toMatchImageSnapshot: (options?: any) => void;
            toMatchSnapshot: (options?: any) => void;

            login(email: string, password: string): void;

            baseConverterInput(inputStr: string, inputBase: number, outputBase: number, precision?: number): void;

            getByDataTest(value: string): Chainable<Element>;

            fixCypressSpec(filename: string): void;
        }
    }
}

function fixCypressSpec(filename: string) {
    const relative = filename.substr(1); // removes leading "/"
    const projectRoot = Cypress.config('projectRoot' as any);
    const absolute = path.join(projectRoot, relative);
    Cypress.spec = {
        absolute,
        name: path.basename(filename),
        relative
    };
}


function getByDataTest(value: string) {
    return cy.get(`[data-test=${value}]`);
}

function baseConverterInput(inputStr, inputBase, outputBase, precision = 10) {
    getInputStrInput().clear().type(inputStr);
    getInputBaseInput().clear().type(`${inputBase}`);
    getOutputBaseInput().clear().type(`${outputBase}`);
    getBconvConvertButton().click();
}

Cypress.Commands.add('getByDataTest', getByDataTest);
Cypress.Commands.add('baseConverterInput', baseConverterInput);
Cypress.Commands.add('fixCypressSpec', fixCypressSpec);

export {};

