import type { FramePackTemplate } from './types';

// Import all pack modules statically
import M15Regular1 from './M15Regular-1';
import M15TransformFront from './M15TransformFront';
import M15TransformNyxFront from './M15TransformNyxFront';
import M15Nyx from './M15Nyx';
import SagaNyx from './SagaNyx';
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
import PlaneswalkerRegular from './PlaneswalkerRegular';
import TokenRegular1 from './TokenRegular-1';
import TokenTextless1 from './TokenTextless-1';
import TokenTextlessBorderless from './TokenTextlessBorderless';
import TokenTall1 from './TokenTall-1';
import TokenShort1 from './TokenShort-1';
import TokenMonarch from './TokenMonarch';
import TokenMarker from './TokenMarker';
import TokenInitiative from './TokenInitiative';
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
import JapanShowcaseNicknames from './JapanShowcaseNicknames';
import UB from './UB';
import UBFull from './UBFull';
import UBExtendedArt from './UBExtendedArt';
import UBLegendCrowns from './UBLegendCrowns';
import TransformLegendCrownsUB from './TransformLegendCrownsUB';
import ModalLegendCrownsUB from './ModalLegendCrownsUB';
import ModalRegular from './ModalRegular';
import UBLegendCrownsFloating from './UBLegendCrownsFloating';
import M15RegularNew from './M15RegularNew';
import M15ExtendedArtNew from './M15ExtendedArtNew-1';
import M15LegendCrownsNew from './M15LegendCrownsNew-1';
import M15InnerCrownsNew from './M15InnerCrownsNew-1';
import FullArtNew from './FullArtNew-1';
import SnowNew from './SnowNew-1';
import M15NyxNew from './M15NyxNew-1';
import UBNew from './UBNew-1';
import UBLegendCrownsNew from './UBLegendCrownsNew-1';
import BorderlessStellarSights from './BorderlessStellarSights';
import MiscCustom from './MiscCustom';
import NeoBasics from './NeoBasics';
import StationRegular from './StationRegular';
import StationBorderless from './StationBorderless';
import Elemental from './Elemental';

/**
 * Pack registry - maps pack IDs to their modules
 */
const PACK_REGISTRY: Record<string, FramePackTemplate> = {
  'M15Regular-1': M15Regular1,
  'M15TransformFront': M15TransformFront,
  'M15TransformNyxFront': M15TransformNyxFront,
  'M15Nyx': M15Nyx,
  'SagaNyx': SagaNyx,
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
  'PlaneswalkerRegular': PlaneswalkerRegular,
  'TokenRegular-1': TokenRegular1,
  'TokenTextless-1': TokenTextless1,
  'TokenTextlessBorderless': TokenTextlessBorderless,
  'TokenTall-1': TokenTall1,
  'TokenShort-1': TokenShort1,
  'TokenMonarch': TokenMonarch,
  'TokenMarker': TokenMarker,
  'TokenInitiative': TokenInitiative,
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
  'JapanShowcaseNicknames': JapanShowcaseNicknames,
  'UB': UB,
  'UBFull': UBFull,
  'UBExtendedArt': UBExtendedArt,
  'UBLegendCrowns': UBLegendCrowns,
  'TransformLegendCrownsUB': TransformLegendCrownsUB,
  'ModalLegendCrownsUB': ModalLegendCrownsUB,
  'ModalRegular': ModalRegular,
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
  'StationRegular': StationRegular,
  'StationBorderless': StationBorderless,
  'Elemental': Elemental,
  // Add more packs here as you create them
};

/**
 * Pack Loader
 * Loads frame pack data based on pack ID
 */
export async function loadFramePack(packId: string): Promise<FramePackTemplate | null> {
  const pack = PACK_REGISTRY[packId];
  if (!pack) {
    console.error(`Frame pack not found: ${packId}`);
    return null;
  }
  return pack;
}

// Export available pack IDs
export const AVAILABLE_PACKS = Object.keys(PACK_REGISTRY);
