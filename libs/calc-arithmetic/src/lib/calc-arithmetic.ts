export {
    StandardBaseConverter,
    fromNumber,
    fromString,
    fromStringDirect,
    fromDigits,
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
    multiplyDefault,
} from './positional/multiplication/multiplication';

export {
    multiplyWithExtensions
} from './positional/multiplication/multiplication-with-extension';

export {
    multiplyWithoutExtension
} from './positional/multiplication/multiplication-without-extension'

export * from './models'
export * from './models/operation'
export * from './models/operation-algorithm'

export {
    PositionalNumber,
    PositionalSourceType
} from './positional/positional-number';


export {
    getComplement,
    complementStrToBaseStr,
    isValidComplementStr,
    isValidComplementOrRepresentationStr
} from './positional/complement-converter';

export {
    getComplementWithDetails
} from './positional/complement-details'

export {
    FloatConverter,
    FloatingRepresentation,
    SingleRepresentation,
    DoubleRepresentation,
    FloatProperty
} from './floating/float-converter';

export {
    isValidString,
    digitsToStr,
    splitToDigitsList
} from './helpers/conversion-helpers'

export {
    BaseDigits
} from './positional/base-digits'
export { DigitMapping } from './models/digit-mapping';
export { AssociatedBaseConversionDetails } from './models/associated-base-conversion-details';
export { ExtendedOption } from '../../../common-ui/src/lib/core/models/extended-option';
export { ComplementConversionResult } from './models/complement';
