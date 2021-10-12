import { objArrayEqual } from './obj-array-equal';

interface TestInterface {
    someProp: string;
    someOtherProp: number;
}

describe('#objArrayEqual', () => {
    it('should return false when arrays have different lengths', () => {
        // given
        const a: TestInterface[] = [
            { someProp: 'asd', someOtherProp: 10 },
        ];

        const b = [
            { someProp: 'asd', someOtherProp: 1 },
            { someProp: 'asd', someOtherProp: 2 },
            { someProp: 'asd', someOtherProp: 4 }
        ];

        const comparator = (a: TestInterface, b: TestInterface) => {
            return a.someProp === b.someProp;
        };

        // when
        const result = objArrayEqual(a, b, comparator);

        // then
        expect(result).toBeFalsy();
    });

    it('should return false when some elements in both arrays are not equal based on comparator', () => {
        // given
        const a: TestInterface[] = [
            { someProp: 'asd', someOtherProp: 10 },
            { someProp: 'asd', someOtherProp: 10 },
            { someProp: 'asd', someOtherProp: 8 }
        ];

        const b = [
            { someProp: 'asd', someOtherProp: 1 },
            { someProp: 'asd', someOtherProp: 2 },
            { someProp: 'zxc', someOtherProp: 4 }
        ];

        const comparator = (a: TestInterface, b: TestInterface) => {
            return a.someProp === b.someProp;
        };

        // when
        const result = objArrayEqual(a, b, comparator);

        // then
        expect(result).toBeFalsy();
    });

    it('should return true when all elements in both arrays are equal based on comparator', () => {
        // given
        const a: TestInterface[] = [
            { someProp: 'asd', someOtherProp: 10 },
            { someProp: 'asd', someOtherProp: 10 },
            { someProp: 'asd', someOtherProp: 8 }
        ];

        const b = [
            { someProp: 'asd', someOtherProp: 1 },
            { someProp: 'asd', someOtherProp: 2 },
            { someProp: 'asd', someOtherProp: 4 }
        ];

        const comparator = (a: TestInterface, b: TestInterface) => {
            return a.someProp === b.someProp;
        };

        // when
        const result = objArrayEqual(a, b, comparator);

        // then
        expect(result).toBeTruthy();
    });


});
