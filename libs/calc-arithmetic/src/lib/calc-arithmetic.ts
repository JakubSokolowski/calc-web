export {
    StandardBaseConverter,
    fromNumber,
    fromString,
    fromStringDirect,
    Conversion,
    ConversionToArbitrary,
    ConversionToDecimal,
    ConversionType,
    AssociatedBaseConversion
} from './positional/base-converter';

export {
    addPositionalNumbers,
} from './positional/addition'

export {
    subtractPositionalNumbers,
} from './positional/subtraction'

export {
    convertUsingAssociatedBases
} from './positional/associated-base-converter';

export {
    multiplyPositionalNumbers
} from './positional/multiplication'

export * from './models'
export * from './models/operation'
export * from './models/operation-algorithm'

export {
    NumberComplement,
    PositionalNumber,
    Digits
} from './positional/representations';

export { getComplement, complementStrToBaseStr, isValidComplementStr } from './positional/complement-converter';

export {
    FloatConverter,
    FloatingRepresentation,
    SingleRepresentation,
    DoubleRepresentation,
    FloatProperty
} from './floating/float-converter';

export {
    isValidString,
    digitsToStr
} from './helpers/conversion-helpers'

export {
    BaseDigits
} from './positional/base-digits'
export { DigitMapping } from './models/digit-mapping';
export { AssociatedBaseConversionDetails } from './models/associated-base-conversion-details';
export { ExtendedOption } from '../../../common-ui/src/lib/core/models/extended-option';
