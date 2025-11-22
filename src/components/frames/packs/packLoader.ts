import type { FramePackTemplate } from './types';
import { validateFramePack } from '../../../types/validation';
import { createError, ErrorType, logError, type Result, Ok, Err } from '../../../utils/errors';

// Import all pack modules statically
import M15Regular1 from './M15Regular-1';
import M15TransformFront from './M15TransformFront';
import M15TransformNyxFront from './M15TransformNyxFront';
import M15Nyx from './M15Nyx';
import SagaNyx from './SagaNyx';
import SagaRegular from './SagaRegular';
import SagaUB from './SagaUB';
import SagaCreature from './SagaCreature';
import SagaCreatureUB from './SagaCreatureUB';
import SagaLTR from './SagaLTR';
import M15LegendCrowns from './M15LegendCrowns';
import M15LegendCrownsFloating from './M15LegendCrownsFloating';
import M15InnerCrowns from './M15InnerCrowns';
import M15Nickname from './M15Nickname';
import M15Nickname2 from './M15Nickname-2';
import M15SmoothNickname from './M15SmoothNickname';
import M15Miracle from './M15Miracle';
import M15HoloStamps from './M15HoloStamps';
import M15DarkPT from './M15DarkPT';
import M15Borders from './M15Borders';
import M15CIPips from './M15CIPips';
import TheList from './TheList';
import M15Lands from './M15Lands';
import Spree from './Spree';
import SpreeUB from './SpreeUB';
import Attraction from './Attraction';
import M15Snow from './M15Snow';
import Conspiracy from './Conspiracy';
import Colorshifted from './Colorshifted';
import Brawl from './Brawl';
import Margin1 from './Margin-1';
import Wanted from './Wanted';
import OilSlick from './OilSlick';
import M21 from './M21';
import CustomNeon from './CustomNeon';
import PlaneswalkerBorderless from './PlaneswalkerBorderless';
import PlaneswalkerBoxTopper from './PlaneswalkerBoxTopper';
import PlaneswalkerRegular from './PlaneswalkerRegular';
import PlaneswalkerTall from './PlaneswalkerTall';
import PlaneswalkerTallBorderless from './PlaneswalkerTallBorderless';
import PlaneswalkerNickname from './PlaneswalkerNickname';
import TokenRegular1 from './TokenRegular-1';
import TokenTextless1 from './TokenTextless-1';
import TokenTextlessBorderless from './TokenTextlessBorderless';
import TokenTall1 from './TokenTall-1';
import TokenShort1 from './TokenShort-1';
import TokenMonarch from './TokenMonarch';
import TokenMarker from './TokenMarker';
import TokenInitiative from './TokenInitiative';
import TokenDayNight from './TokenDayNight';
import Emblem from './Emblem';
import TokenRegularM15 from './TokenRegularM15';
import TokenTextlessM15 from './TokenTextlessM15';
import EOEBasics from './EOEBasics';
import TextlessBasics2022 from './TextlessBasics2022';
import TextlessBasics2022UB from './TextlessBasics2022UB';
import TextlessBasicsSNC from './TextlessBasicsSNC';
import TextlessBasics from './TextlessBasics-1';
import ZendikarBasic1 from './ZendikarBasic-1';
import FullartBasicRoundBottom from './FullartBasicRoundBottom';
import Unfinity from './Unfinity';
import Unstable from './Unstable';
import TextlessGenericShowcase from './TextlessGenericShowcase';
import MagicFest from './MagicFest';
import PromoOpenHouse from './PromoOpenHouse';
import PromoRegular1 from './PromoRegular-1';
import PromoNyx from './PromoNyx';
import PromoExtended from './PromoExtended';
import PromoNickname from './PromoNickname';
import PromoGenericShowcase from './PromoGenericShowcase';
import J22Front from './J22Front';
import JapanShowcaseNicknames from './JapanShowcaseNicknames';
import JMPFront from './JMPFront';
import UB from './UB';
import UBFull from './UBFull';
import UBExtendedArt from './UBExtendedArt';
import UBLegendCrowns from './UBLegendCrowns';
import TransformLegendCrownsUB from './TransformLegendCrownsUB';
import ModalLegendCrowns from './ModalLegendCrowns';
import ModalLegendCrownsBrawl from './ModalLegendCrownsBrawl';
import ModalLegendCrownsFloating from './ModalLegendCrownsFloating';
import ModalLegendCrownsNickname from './ModalLegendCrownsNickname';
import ModalLegendCrownsUB from './ModalLegendCrownsUB';
import ModalHelper from './ModalHelper';
import ModalNyx from './ModalNyx';
import ModalRegular from './ModalRegular';
import ModalSnow from './ModalSnow';
import ModalUB from './ModalUB';
import ModalBorderless from './ModalBorderless';
import ModalExtended from './ModalExtended';
import ModalNickname from './ModalNickname';
import ModalShort from './ModalShort';
import ModalShortNickname from './ModalShortNickname';
import UBLegendCrownsFloating from './UBLegendCrownsFloating';
import M15RegularNew from './M15RegularNew';
import M15ExtendedArtNew from './M15ExtendedArtNew-1';
import M15LegendCrownsNew from './M15LegendCrownsNew-1';
import M15InnerCrownsNew from './M15InnerCrownsNew-1';
import FullArtNew from './FullArtNew-1';
import SnowNew from './SnowNew-1';
import M15TransformSnowFront from './M15TransformSnowFront';
import M15TransformUBFront from './M15TransformUBFront';
import TransformBorderlessFront from './TransformBorderlessFront';
import TransformExtendedFront from './TransformExtendedFront';
import SagaDFC from './SagaDFC';
import SagaCreatureFront from './SagaCreatureFront';
import SagaCreatureBack from './SagaCreatureBack';
import SagaCreatureUBFront from './SagaCreatureUBFront';
import SagaCreatureUBBack from './SagaCreatureUBBack';
import M15TransformBackNew from './M15TransformBackNew';
import M15TransformNyxBackNew from './M15TransformNyxBackNew';
import M15TransformSnowBackNew from './M15TransformSnowBackNew';
import M15TransformUBBackNew from './M15TransformUBBackNew';
import TransformBorderlessBack from './TransformBorderlessBack';
import TransformExtendedBack from './TransformExtendedBack';
import M15TransformTypes from './M15TransformTypes';
import M15TransformBack from './M15TransformBack';
import M15TransformNyxBack from './M15TransformNyxBack';
import M15TransformSnowBack from './M15TransformSnowBack';
import M15TransformUBBack from './M15TransformUBBack';
import TransformSDCC15 from './TransformSDCC15';
import TransformLegendCrowns from './TransformLegendCrowns';
import TransformLegendCrownsFloating from './TransformLegendCrownsFloating';
import TransformLegendCrownsNickname from './TransformLegendCrownsNickname';
import M15NyxNew from './M15NyxNew-1';
import UBNew from './UBNew-1';
import UBLegendCrownsNew from './UBLegendCrownsNew-1';
import BorderlessStellarSights from './BorderlessStellarSights';
import MiscCustom from './MiscCustom';
import NeoBasics from './NeoBasics';
import StationRegular from './StationRegular';
import StationBorderless from './StationBorderless';
import Elemental from './Elemental';
import Classicshifted from './Classicshifted';
import ClassicshiftedNickname from './ClassicshiftedNickname';
import ClassicshiftedLands from './ClassicshiftedLands';
import ClassicshiftedCIPips from './ClassicshiftedCIPips';
import ClassicshiftedPlaneswalker from './ClassicshiftedPlaneswalker';
import ClassicshiftedPlaneswalkerTransform from './ClassicshiftedPlaneswalkerTransform';
import ClassicshiftedDFC from './ClassicshiftedDFC';
import ClassicshiftedTransform from './ClassicshiftedTransform';
import StoneCutterDeluxe from './StoneCutterDeluxe';
import StoneCutterDeluxeNicknameAddons from './StoneCutterDeluxeNicknameAddons';
import PlaneswalkerCompleated from './PlaneswalkerCompleated';
import PlaneswalkerDBL from './PlaneswalkerDBL';
import PlaneswalkerTallDBL from './PlaneswalkerTallDBL';
import PlaneswalkerHoloStamps from './PlaneswalkerHoloStamps';
import PlaneswalkerSDCC15 from './PlaneswalkerSDCC15';
import PlaneswalkerMDFC from './PlaneswalkerMDFC';
import PlaneswalkerTransformFront from './PlaneswalkerTransformFront';
import PlaneswalkerTransformBack from './PlaneswalkerTransformBack';
import PlaneswalkerTransformFrontDBL from './PlaneswalkerTransformFrontDBL';
import PlaneswalkerTransformBackDBL from './PlaneswalkerTransformBackDBL';
import PlaneswalkerTransformIcons from './PlaneswalkerTransformIcons';

/**
 * Pack registry - maps pack IDs to their modules
 */
const PACK_REGISTRY: Record<string, FramePackTemplate> = {
  'M15Regular-1': M15Regular1,
  'M15TransformFront': M15TransformFront,
  'M15TransformNyxFront': M15TransformNyxFront,
  'M15Nyx': M15Nyx,
  'SagaNyx': SagaNyx,
  'SagaRegular': SagaRegular,
  'SagaUB': SagaUB,
  'SagaCreature': SagaCreature,
  'SagaCreatureUB': SagaCreatureUB,
  'SagaLTR': SagaLTR,
  'NeoBasics': NeoBasics,
  'M15LegendCrowns': M15LegendCrowns,
  'M15LegendCrownsFloating': M15LegendCrownsFloating,
  'M15InnerCrowns': M15InnerCrowns,
  'M15Nickname': M15Nickname,
  'M15Nickname-2': M15Nickname2,
  'M15SmoothNickname': M15SmoothNickname,
  'M15Miracle': M15Miracle,
  'M15HoloStamps': M15HoloStamps,
  'M15DarkPT': M15DarkPT,
  'M15Borders': M15Borders,
  'M15CIPips': M15CIPips,
  'TheList': TheList,
  'M15Lands': M15Lands,
  'Spree': Spree,
  'SpreeUB': SpreeUB,
  'Attraction': Attraction,
  'M15Snow': M15Snow,
  'Conspiracy': Conspiracy,
  'Colorshifted': Colorshifted,
  'Brawl': Brawl,
  'Margin-1': Margin1,
  'Wanted': Wanted,
  'OilSlick': OilSlick,
  'M21': M21,
  'CustomNeon': CustomNeon,
  'PlaneswalkerBorderless': PlaneswalkerBorderless,
  'PlaneswalkerBoxTopper': PlaneswalkerBoxTopper,
  'PlaneswalkerRegular': PlaneswalkerRegular,
  'PlaneswalkerTall': PlaneswalkerTall,
  'PlaneswalkerTallBorderless': PlaneswalkerTallBorderless,
  'PlaneswalkerNickname': PlaneswalkerNickname,
  'TokenRegular-1': TokenRegular1,
  'TokenTextless-1': TokenTextless1,
  'TokenTextlessBorderless': TokenTextlessBorderless,
  'TokenTall-1': TokenTall1,
  'TokenShort-1': TokenShort1,
  'TokenMonarch': TokenMonarch,
  'TokenMarker': TokenMarker,
  'TokenInitiative': TokenInitiative,
  'TokenDayNight': TokenDayNight,
  'Emblem': Emblem,
  'TokenRegularM15': TokenRegularM15,
  'TokenTextlessM15': TokenTextlessM15,
  'EOEBasics': EOEBasics,
  'TextlessBasics2022': TextlessBasics2022,
  'TextlessBasics2022UB': TextlessBasics2022UB,
  'TextlessBasicsSNC': TextlessBasicsSNC,
  'TextlessBasics': TextlessBasics,
  'ZendikarBasic-1': ZendikarBasic1,
  'FullartBasicRoundBottom': FullartBasicRoundBottom,
  'Unfinity': Unfinity,
  'Unstable': Unstable,
  'TextlessGenericShowcase': TextlessGenericShowcase,
  'MagicFest': MagicFest,
  'PromoOpenHouse': PromoOpenHouse,
  'PromoRegular-1': PromoRegular1,
  'PromoNyx': PromoNyx,
  'PromoExtended': PromoExtended,
  'PromoNickname': PromoNickname,
  'PromoGenericShowcase': PromoGenericShowcase,
  'J22Front': J22Front,
  'JapanShowcaseNicknames': JapanShowcaseNicknames,
  'JMPFront': JMPFront,
  'UB': UB,
  'UBFull': UBFull,
  'UBExtendedArt': UBExtendedArt,
  'UBLegendCrowns': UBLegendCrowns,
  'TransformLegendCrownsUB': TransformLegendCrownsUB,
  'ModalLegendCrowns': ModalLegendCrowns,
  'ModalLegendCrownsFloating': ModalLegendCrownsFloating,
  'ModalLegendCrownsNickname': ModalLegendCrownsNickname,
  'ModalLegendCrownsBrawl': ModalLegendCrownsBrawl,
  'ModalLegendCrownsUB': ModalLegendCrownsUB,
  'ModalNyx': ModalNyx,
  'ModalRegular': ModalRegular,
  'ModalHelper': ModalHelper,
  'ModalSnow': ModalSnow,
  'ModalUB': ModalUB,
  'ModalBorderless': ModalBorderless,
  'ModalExtended': ModalExtended,
  'ModalNickname': ModalNickname,
  'ModalShort': ModalShort,
  'ModalShortNickname': ModalShortNickname,
  'UBLegendCrownsFloating': UBLegendCrownsFloating,
  'M15RegularNew': M15RegularNew,
  'M15ExtendedArtNew': M15ExtendedArtNew,
  'M15LegendCrownsNew': M15LegendCrownsNew,
  'M15InnerCrownsNew': M15InnerCrownsNew,
  'FullArtNew': FullArtNew,
  'SnowNew': SnowNew,
  'M15NyxNew': M15NyxNew,
  'UBNew': UBNew,
  'UBLegendCrownsNew': UBLegendCrownsNew,
  'BorderlessStellarSights': BorderlessStellarSights,
  'MiscCustom': MiscCustom,
  'StoneCutterDeluxe': StoneCutterDeluxe,
  'StoneCutterDeluxeNicknameAddons': StoneCutterDeluxeNicknameAddons,
  'StationRegular': StationRegular,
  'StationBorderless': StationBorderless,
  'Elemental': Elemental,
  'Classicshifted': Classicshifted,
  'ClassicshiftedNickname': ClassicshiftedNickname,
  'ClassicshiftedLands': ClassicshiftedLands,
  'ClassicshiftedCIPips': ClassicshiftedCIPips,
  'ClassicshiftedPlaneswalker': ClassicshiftedPlaneswalker,
  'ClassicshiftedPlaneswalkerTransform': ClassicshiftedPlaneswalkerTransform,
  'ClassicshiftedDFC': ClassicshiftedDFC,
  'ClassicshiftedTransform': ClassicshiftedTransform,
  'PlaneswalkerCompleated': PlaneswalkerCompleated,
  'PlaneswalkerDBL': PlaneswalkerDBL,
  'PlaneswalkerTallDBL': PlaneswalkerTallDBL,
  'PlaneswalkerHoloStamps': PlaneswalkerHoloStamps,
  'PlaneswalkerSDCC15': PlaneswalkerSDCC15,
  'PlaneswalkerMDFC': PlaneswalkerMDFC,
  'PlaneswalkerTransformFront': PlaneswalkerTransformFront,
  'PlaneswalkerTransformBack': PlaneswalkerTransformBack,
  'PlaneswalkerTransformFrontDBL': PlaneswalkerTransformFrontDBL,
  'PlaneswalkerTransformBackDBL': PlaneswalkerTransformBackDBL,
  'PlaneswalkerTransformIcons': PlaneswalkerTransformIcons,
  'M15TransformSnowFront': M15TransformSnowFront,
  'M15TransformUBFront': M15TransformUBFront,
  'TransformBorderlessFront': TransformBorderlessFront,
  'TransformExtendedFront': TransformExtendedFront,
  'SagaDFC': SagaDFC,
  'SagaCreatureFront': SagaCreatureFront,
  'SagaCreatureBack': SagaCreatureBack,
  'SagaCreatureUBFront': SagaCreatureUBFront,
  'SagaCreatureUBBack': SagaCreatureUBBack,
  'M15TransformBackNew': M15TransformBackNew,
  'M15TransformNyxBackNew': M15TransformNyxBackNew,
  'M15TransformSnowBackNew': M15TransformSnowBackNew,
  'M15TransformUBBackNew': M15TransformUBBackNew,
  'TransformBorderlessBack': TransformBorderlessBack,
  'TransformExtendedBack': TransformExtendedBack,
  'M15TransformTypes': M15TransformTypes,
  'M15TransformBack': M15TransformBack,
  'M15TransformNyxBack': M15TransformNyxBack,
  'M15TransformSnowBack': M15TransformSnowBack,
  'M15TransformUBBack': M15TransformUBBack,
  'TransformSDCC15': TransformSDCC15,
  'TransformLegendCrowns': TransformLegendCrowns,
  'TransformLegendCrownsFloating': TransformLegendCrownsFloating,
  'TransformLegendCrownsNickname': TransformLegendCrownsNickname,
};

/**
 * Pack Loader
 * Loads frame pack data based on pack ID with validation
 * 
 * @param packId - The ID of the pack to load
 * @param skipValidation - Skip validation (for performance in production, default: false)
 * @returns Result with pack data or error message
 */
export async function loadFramePack(
  packId: string,
  skipValidation = false
): Promise<Result<FramePackTemplate>> {
  // Check if pack exists in registry
  const pack = PACK_REGISTRY[packId];
  if (!pack) {
    const error = createError(
      ErrorType.FRAME_PACK_ERROR,
      `Frame pack not found: ${packId}`,
      { packId, availablePacks: AVAILABLE_PACKS },
      false
    );
    logError(error, 'loadFramePack');
    return Err(`Frame pack "${packId}" not found`);
  }

  // Skip validation in production for performance (packs are static and pre-validated)
  if (skipValidation || !import.meta.env.DEV) {
    return Ok(pack);
  }

  // Validate pack structure in dev mode
  const validationResult = validateFramePack(pack);

  if (!validationResult.success) {
    const error = createError(
      ErrorType.VALIDATION_ERROR,
      `Invalid frame pack structure: ${packId}`,
      {
        packId,
        validationErrors: validationResult.errorMessage,
      },
      false
    );
    logError(error, 'loadFramePack');
    return Err(validationResult.errorMessage || 'Invalid frame pack structure');
  }

  return Ok(validationResult.data as FramePackTemplate);
}

/**
 * Validates all packs in the registry
 * Useful for development/testing to catch issues early
 * 
 * @returns Array of validation errors (empty if all valid)
 */
export function validateAllPacks(): Array<{ packId: string; errors: string }> {
  const errors: Array<{ packId: string; errors: string }> = [];

  for (const packId of AVAILABLE_PACKS) {
    const pack = PACK_REGISTRY[packId];
    const validationResult = validateFramePack(pack);

    if (!validationResult.success) {
      errors.push({
        packId,
        errors: validationResult.errorMessage || 'Unknown validation error',
      });
    }
  }

  return errors;
}

// Export available pack IDs
export const AVAILABLE_PACKS = Object.keys(PACK_REGISTRY);
