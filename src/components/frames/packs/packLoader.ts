import type { FramePackTemplate } from './types';
import { validateFramePack } from '../../../types/validation';
import { createError, ErrorType, logError, type Result, Ok, Err } from '../../../utils/errors';

// Import all pack modules statically
import ABU from './ABU';
import Eighth from './8th';
import EighthColorshifted from './8thColorshifted';
import EighthLegendCrowns from './8thLegendCrowns';
import EighthPlaytest from './8thPlaytest';
import EighthSnow from './8thSnow';
import EighthTransformBack from './8thTransformBack';
import EighthTransformFront from './8thTransformFront';
import M15Regular1 from './M15Regular-1';
import M15TransformFront from './M15TransformFront';
import M15TransformNyxFront from './M15TransformNyxFront';
import M15TransformTypesBack from './M15TransformTypesBack';
import M15Nyx from './M15Nyx';
import SagaNyx from './SagaNyx';
import SagaRegular from './SagaRegular';
import SagaUB from './SagaUB';
import SagaCreature from './SagaCreature';
import SagaCreatureUB from './SagaCreatureUB';
import SagaLTR from './SagaLTR';
import M15LegendCrowns from './M15LegendCrowns';
import M15LegendCrownsFloating from './M15LegendCrownsFloating';
import M15LegendCrownsFloatingNew from './M15LegendCrownsFloatingNew';
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
import Split from './Split';
import SpreeUB from './SpreeUB';
import SimpleInventions from './SimpleInventions';
import Adventure from './Adventure';
import AKHInvocationExtended from './AKHInvocationExtended';
import Aftermath from './Aftermath';
import Attraction from './Attraction';
import M15Devoid from './M15Devoid';
import M15Snow from './M15Snow';
import Leveler from './Leveler';
import Conspiracy from './Conspiracy';
import Colorshifted from './Colorshifted';
import Battle from './Battle';
import BloomburrowBorderless from './BloomburrowBorderless';
import Borderless from './Borderless';
import BorderlessGlow from './BorderlessGlow';
import Brawl from './Brawl';
import BreakingNews from './BreakingNews';
import BurningRevelation from './BurningRevelation';
import Circuit from './Circuit';
import CommanderLegends from './CommanderLegends';
import Crystal from './Crystal';
import Draconic from './Draconic';
import GenericShowcase from './GenericShowcase';
import M15NyxShowcase from './M15NyxShowcase';
import Margin1 from './Margin-1';
import Storybook from './Storybook';
import ZendikarRising from './ZendikarRising';
import Wanted from './Wanted';
import OilSlick from './OilSlick';
import Omen from './Omen';
import M21 from './M21';
import MemoryCorridor from './MemoryCorridor';
import CustomCelidAsap from './CustomCelidAsap';
import CustomDeckCover from './CustomDeckCover';
import CustomMarginCelidAsap from './CustomMarginCelidAsap';
import CustomNeon from './CustomNeon';
import CustomDualLands from './CustomDualLands';
import CustomMagraoKaldheim from './CustomMagraoKaldheim';
import DMUStainedGlass from './DMUStainedGlass';
import DNDModule from './DNDModule';
import DNDSourcebook from './DNDSourcebook';
import Dossier from './Dossier';
import Dungeon from './Dungeon';
import DoubleFeature from './DoubleFeature';
import DoubleFeatureTransform from './DoubleFeatureTransform';
import Kaldheim2 from './Kaldheim-2';
import KaldheimNonleg from './KaldheimNonleg';
import MH2 from './MH2';
import Equinox from './Equinox';
import EquinoxBack from './EquinoxBack';
import EquinoxFront from './EquinoxFront';
import EternalNight from './EternalNight';
import FABClasses from './FABClasses';
import FABElemental from './FABElemental';
import FABFabled from './FABFabled';
import FABHeroes from './FABHeroes';
import FABLight from './FABLight';
import FABRegular from './FABRegular';
import FABShadow from './FABShadow';
import FCA from './FCA';
import FableECL from './FableECL';
import Fang from './Fang';
import FNM from './FNM';
import Fuse from './Fuse';
import FutureRegular from './FutureRegular';
import FeuerAmeiseIxalan from './FeuerAmeiseIxalan';
import M15BoxTopper from './M15BoxTopper';
import M15ClearTextboxes from './M15ClearTextboxes';
import M15Eighth from './M15Eighth';
import M15EighthNyx from './M15EighthNyx';
import M15EighthSnow from './M15EighthSnow';
import M15EighthTransformBack from './M15EighthTransformBack';
import M15EighthTransformFront from './M15EighthTransformFront';
import M15EighthTransformNyxBack from './M15EighthTransformNyxBack';
import M15EighthTransformNyxFront from './M15EighthTransformNyxFront';
import M15EighthTransformSnowBack from './M15EighthTransformSnowBack';
import M15EighthTransformSnowFront from './M15EighthTransformSnowFront';
import M15EighthTransformUBBack from './M15EighthTransformUBBack';
import M15EighthTransformUBFront from './M15EighthTransformUBFront';
import M15EighthUB from './M15EighthUB';
import M15EighthModal from './M15EighthModal';
import M15EighthModalNyx from './M15EighthModalNyx';
import M15EighthModalSnow from './M15EighthModalSnow';
import M15EighthModalUB from './M15EighthModalUB';
import M15EighthToken from './M15EighthToken';
import M15EighthNyxToken from './M15EighthNyxToken';
import M15EighthSnowToken from './M15EighthSnowToken';
import M15EighthUBToken from './M15EighthUBToken';
import M15EighthTokenTextless from './M15EighthTokenTextless';
import M15EighthNyxTokenTextless from './M15EighthNyxTokenTextless';
import M15EighthSnowTokenTextless from './M15EighthSnowTokenTextless';
import M15EighthUBTokenTextless from './M15EighthUBTokenTextless';
import M15ExtendedArtShort from './M15ExtendedArtShort';
import PlaneswalkerBorderless from './PlaneswalkerBorderless';
import PlaneswalkerBoxTopper from './PlaneswalkerBoxTopper';
import PlaneswalkerRegular from './PlaneswalkerRegular';
import PlaneswalkerSeventh from './PlaneswalkerSeventh';
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
import TokenUnglued from './TokenUnglued';
import TokenOld from './TokenOld';
import EOEBasics from './EOEBasics';
import TextlessBasics2022 from './TextlessBasics2022';
import TextlessBasics2022UB from './TextlessBasics2022UB';
import TextlessBasicsSNC from './TextlessBasicsSNC';
import TextlessBasics from './TextlessBasics-1';
import ZendikarBasic1 from './ZendikarBasic-1';
import FullartBasicRoundBottom from './FullartBasicRoundBottom';
import Unfinity from './Unfinity';
import Unhinged from './Unhinged';
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
import JapanShowcase from './JapanShowcase';
import Paranormal from './Paranormal';
import JMPFront from './JMPFront';
import UB from './UB';
import UBFull from './UBFull';
import UBExtendedArt from './UBExtendedArt';
import UBExtendedArtNew from './UBExtendedArtNew';
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
import UBLegendCrownsFloatingNew from './UBLegendCrownsFloatingNew';
import Vanguard from './Vanguard';
import Vault from './Vault';
import M15RegularNew from './M15RegularNew';
import M15ExtendedArtNew from './M15ExtendedArtNew-1';
import M15LegendCrownsNew from './M15LegendCrownsNew-1';
import M15InnerCrownsNew from './M15InnerCrownsNew-1';
import FullArtNew from './FullArtNew';
import SnowNew from './SnowNew-1';
import M15TransformSnowFront from './M15TransformSnowFront';
import M15TransformUBFront from './M15TransformUBFront';
import NEONeonShort from './NEONeonShort';
import TransformBorderlessAltBack from './TransformBorderlessAltBack';
import TransformBorderlessAltFront from './TransformBorderlessAltFront';
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
import TransformLegendCrownsFloatingBackRight from './TransformLegendCrownsFloatingBackRight';
import TransformLegendCrownsNickname from './TransformLegendCrownsNickname';
import MarginFableECL from './MarginFableECL';
import M15NyxNew from './M15NyxNew-1';
import UBNew from './UBNew-1';
import UBLegendCrownsNew from './UBLegendCrownsNew-1';
import BorderlessStellarSights from './BorderlessStellarSights';
import MiscCustom from './MiscCustom';
import MysticalArchive from './MysticalArchive';
import MysticalArchiveJP from './MysticalArchiveJP';
import MysticalArchiveJPHorizontal from './MysticalArchiveJPHorizontal';
import MysticalArchiveSOA from './MysticalArchiveSOA';
import NeoBasics from './NeoBasics';
import NeoNeon from './NeoNeon';
import NeoNinja from './NeoNinja';
import NeoSamurai from './NeoSamurai';
import StationRegular from './StationRegular';
import StationBorderless from './StationBorderless';
import SNCSkyscraper from './SNCSkyscraper';
import StorybookMUL from './StorybookMUL';
import StorybookWOE from './StorybookWOE';
import SDCC15 from './SDCC15';
import Elemental from './Elemental';
import EquinoxTextless from './EquinoxTextless';
import Classicshifted from './Classicshifted';
import ClassicshiftedNickname from './ClassicshiftedNickname';
import ClassicshiftedLands from './ClassicshiftedLands';
import ClassicshiftedSaga from './ClassicshiftedSaga';
import Class from './Class';
import ClassicshiftedCIPips from './ClassicshiftedCIPips';
import ClassicshiftedPlaneswalker from './ClassicshiftedPlaneswalker';
import ClassicshiftedPlaneswalkerTransform from './ClassicshiftedPlaneswalkerTransform';
import ClassicshiftedDFC from './ClassicshiftedDFC';
import ClassicshiftedTransform from './ClassicshiftedTransform';
import EnchantingTales from './EnchantingTales';
import Etched from './Etched';
import EtchedNyx from './EtchedNyx';
import EtchedSnow from './EtchedSnow';
import ExpeditionBFZ1 from './ExpeditionBFZ-1';
import ExpeditionZNR1 from './ExpeditionZNR-1';
import InnerCrownsEtched from './InnerCrownsEtched';
import Invention from './Invention';
import Invocation from './Invocation';
import InvocationMUL from './InvocationMUL';
import Ixalan from './Ixalan';
import IkoShort from './IkoShort';
import LegendCrownsEtched from './LegendCrownsEtched';
import Legends from './Legends';
import Praetors from './Praetors';
import FullText from './FullText';
import FullTextAlt from './FullTextAlt';
import StoneCutterDeluxe from './StoneCutterDeluxe';
import StoneCutterDeluxeNicknameAddons from './StoneCutterDeluxeNicknameAddons';
import TARDIS from './TARDIS';
import Tarkir from './Tarkir';
import Tapped from './Tapped';
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
import Pipboy from './Pipboy';
import Planechase from './Planechase';
import PixelTMT from './PixelTMT';
import SewerTMT from './SewerTMT';
import MarginSewerTMT from './MarginSewerTMT';
import Playtest from './Playtest';
import Ravnica from './Ravnica';
import Room from './Room';
import RoomUB from './RoomUB';
import Ring from './Ring';
import Flip from './Flip';
import Cardback from './Cardback';
import Cartoony from './Cartoony';
import Case from './Case';
import Scroll from './Scroll';
import ShatteredGlass from './ShatteredGlass';
import SignatureSpellbook from './SignatureSpellbook';
import SNCArtDeco from './SNCArtDeco';
import SNCGilded from './SNCGilded';
import M15Mutate from './M15Mutate';
import Prototype from './Prototype';
import PrototypeExtended from './PrototypeExtended';
import FeuerAmeiseKaldheim from './FeuerAmeiseKaldheim';
import Fourth from './Fourth';
import Seventh from './Seventh';
import SeventhButFifth from './SeventhButFifth';
import SeventhSnowLands from './SeventhSnowLands';
import SeventhTextless from './SeventhTextless';
import TextlessInvention from './TextlessInvention';
import Woodland from './Woodland';
import Ghostfire from './Ghostfire';
import IxalanCoin from './IxalanCoin';
import IxalanLegends1 from './IxalanLegends1';
import IxalanLegends2 from './IxalanLegends2';
import IxalanLegends3 from './IxalanLegends3';
import NeonInk from './NeonInk';
import NeonInkTextless from './NeonInkTextless';
import NeonInkTransformFront from './NeonInkTransformFront';
import NeonInkTransformBack from './NeonInkTransformBack';
import NeonInkTransformFrontTextless from './NeonInkTransformFrontTextless';
import NeonInkTransformBackTextless from './NeonInkTransformBackTextless';
import OldFloating from './OldFloating';
import OldFloatingShort from './OldFloatingShort';
import OldSaga from './OldSaga';
import SNCGildedColored from './SNCGildedColored';
import SNCGildedTextless from './SNCGildedTextless';
import StoneCutterDeluxeCase from './StoneCutterDeluxeCase';
import StoneCutterDeluxeClass from './StoneCutterDeluxeClass';
import StoneCutterDeluxeDFC from './StoneCutterDeluxeDFC';
import StoneCutterDeluxeExtended from './StoneCutterDeluxeExtended';
import StoneCutterDeluxePlaneswalker from './StoneCutterDeluxePlaneswalker';
import StoneCutterDeluxePlaneswalkerExtended from './StoneCutterDeluxePlaneswalkerExtended';
import StoneCutterDeluxePlaneswalkerTransformAddons from './StoneCutterDeluxePlaneswalkerTransformAddons';
import StoneCutterDeluxeSaga from './StoneCutterDeluxeSaga';
import StoneCutterDeluxeTransformAddons from './StoneCutterDeluxeTransformAddons';
import TransformAddonMDFC from './TransformAddonMDFC';
import TransformAddonMDFCUB from './TransformAddonMDFCUB';
import TransformAddonMDFCBorderless from './TransformAddonMDFCBorderless';
import TransformAddonMDFCSnow from './TransformAddonMDFCSnow';
import TransformAddonMDFCExtended from './TransformAddonMDFCExtended';
import MarginEOEBasics from './MarginEOEBasics';
import MarginBorderlessStellarSights from './MarginBorderlessStellarSights';
import MarginDraconic from './MarginDraconic';
import MarginIxalanLegends from './MarginIxalanLegends';
import MarginMemoryCorridor from './MarginMemoryCorridor';
import MarginBreakingNews from './MarginBreakingNews';
import MarginVault from './MarginVault';
import MarginWanted from './MarginWanted';
import MarginJapanShowcase from './MarginJapanShowcase';
import MarginEnchantingTales from './MarginEnchantingTales';
import MarginRing from './MarginRing';
import MarginDNDModule from './MarginDNDModule';
import MarginMysticalArchive from './MarginMysticalArchive';
import MarginUnfinity from './MarginUnfinity';
import MarginUnstable from './MarginUnstable';
import MarginInvocation from './MarginInvocation';
import MarginNew from './MarginNew';
import MarginElemental from './MarginElemental';

/**
 * Pack registry - maps pack IDs to their modules
 */
const PACK_REGISTRY: Record<string, FramePackTemplate> = {
  'ABU': ABU,
  '8th': Eighth,
  '8thColorshifted': EighthColorshifted,
  '8thLegendCrowns': EighthLegendCrowns,
  '8thPlaytest': EighthPlaytest,
  '8thSnow': EighthSnow,
  '8thTransformBack': EighthTransformBack,
  '8thTransformFront': EighthTransformFront,
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
  'NeoNeon': NeoNeon,
  'NeoNinja': NeoNinja,
  'NeoSamurai': NeoSamurai,
  'M15LegendCrowns': M15LegendCrowns,
  'M15LegendCrownsFloating': M15LegendCrownsFloating,
  'M15LegendCrownsFloatingNew': M15LegendCrownsFloatingNew,
  'M15InnerCrowns': M15InnerCrowns,
  'M15Nickname': M15Nickname,
  'M15Nickname-2': M15Nickname2,
  'M15SmoothNickname': M15SmoothNickname,
  'M15Miracle': M15Miracle,
  'M15Mutate': M15Mutate,
  'M15HoloStamps': M15HoloStamps,
  'M15DarkPT': M15DarkPT,
  'M15Eighth': M15Eighth,
  'M15EighthNyx': M15EighthNyx,
  'M15EighthSnow': M15EighthSnow,
  'M15EighthTransformBack': M15EighthTransformBack,
  'M15EighthTransformFront': M15EighthTransformFront,
  'M15EighthTransformNyxBack': M15EighthTransformNyxBack,
  'M15EighthTransformNyxFront': M15EighthTransformNyxFront,
  'M15EighthTransformSnowBack': M15EighthTransformSnowBack,
  'M15EighthTransformSnowFront': M15EighthTransformSnowFront,
  'M15EighthTransformUBBack': M15EighthTransformUBBack,
  'M15EighthTransformUBFront': M15EighthTransformUBFront,
  'M15EighthUB': M15EighthUB,
  'M15EighthModal': M15EighthModal,
  'M15EighthModalNyx': M15EighthModalNyx,
  'M15EighthModalSnow': M15EighthModalSnow,
  'M15EighthModalUB': M15EighthModalUB,
  'M15EighthToken': M15EighthToken,
  'M15EighthNyxToken': M15EighthNyxToken,
  'M15EighthSnowToken': M15EighthSnowToken,
  'M15EighthUBToken': M15EighthUBToken,
  'M15EighthTokenTextless': M15EighthTokenTextless,
  'M15EighthNyxTokenTextless': M15EighthNyxTokenTextless,
  'M15EighthSnowTokenTextless': M15EighthSnowTokenTextless,
  'M15EighthUBTokenTextless': M15EighthUBTokenTextless,
  'M15Borders': M15Borders,
  'M15CIPips': M15CIPips,
  'TheList': TheList,
  'M15Lands': M15Lands,
  'Spree': Spree,
  'Split': Split,
  'SpreeUB': SpreeUB,
  'SimpleInventions': SimpleInventions,
  'Adventure': Adventure,
  'AKHInvocationExtended': AKHInvocationExtended,
  'Aftermath': Aftermath,
  'Attraction': Attraction,
  'M15Devoid': M15Devoid,
  'M15Snow': M15Snow,
  'Leveler': Leveler,
  'Conspiracy': Conspiracy,
  'Cardback': Cardback,
  'Cartoony': Cartoony,
  'Case': Case,
  'Colorshifted': Colorshifted,
  'Battle': Battle,
  'BloomburrowBorderless': BloomburrowBorderless,
  'Borderless': Borderless,
  'BorderlessGlow': BorderlessGlow,
  'Brawl': Brawl,
  'BreakingNews': BreakingNews,
  'BurningRevelation': BurningRevelation,
  'Circuit': Circuit,
  'CommanderLegends': CommanderLegends,
  'Crystal': Crystal,
  'GenericShowcase': GenericShowcase,
  'M15NyxShowcase': M15NyxShowcase,
  'Margin-1': Margin1,
  'MarginBorderlessStellarSights': MarginBorderlessStellarSights,
  'MarginBreakingNews': MarginBreakingNews,
  'MarginDraconic': MarginDraconic,
  'MarginEOEBasics': MarginEOEBasics,
  'MarginIxalanLegends': MarginIxalanLegends,
  'MarginMemoryCorridor': MarginMemoryCorridor,
  'MarginVault': MarginVault,
  'MarginWanted': MarginWanted,
  'MarginJapanShowcase': MarginJapanShowcase,
  'MarginEnchantingTales': MarginEnchantingTales,
  'MarginRing': MarginRing,
  'MarginDNDModule': MarginDNDModule,
  'MarginMysticalArchive': MarginMysticalArchive,
  'MarginUnfinity': MarginUnfinity,
  'MarginUnstable': MarginUnstable,
  'MarginInvocation': MarginInvocation,
  'MarginNew': MarginNew,
  'MarginElemental': MarginElemental,
  'Storybook': Storybook,
  'ZendikarRising': ZendikarRising,
  'Wanted': Wanted,
  'OilSlick': OilSlick,
  'Omen': Omen,
  'M21': M21,
  'MH2': MH2,
  'MemoryCorridor': MemoryCorridor,
  'CustomCelidAsap': CustomCelidAsap,
  'CustomDeckCover': CustomDeckCover,
  'CustomMarginCelidAsap': CustomMarginCelidAsap,
  'CustomNeon': CustomNeon,
  'CustomDualLands': CustomDualLands,
  'CustomMagraoKaldheim': CustomMagraoKaldheim,
  'DMUStainedGlass': DMUStainedGlass,
  'DNDModule': DNDModule,
  'DNDSourcebook': DNDSourcebook,
  'Dossier': Dossier,
  'Draconic': Draconic,
  'Dungeon': Dungeon,
  'DoubleFeature': DoubleFeature,
  'DoubleFeatureTransform': DoubleFeatureTransform,
  'Equinox': Equinox,
  'EquinoxBack': EquinoxBack,
  'EquinoxFront': EquinoxFront,
  'EternalNight': EternalNight,
  'FABClasses': FABClasses,
  'FABElemental': FABElemental,
  'FABFabled': FABFabled,
  'FableECL': FableECL,
  'FABHeroes': FABHeroes,
  'FABLight': FABLight,
  'FABRegular': FABRegular,
  'FABShadow': FABShadow,
  'FCA': FCA,
  'Fang': Fang,
  'FNM': FNM,
  'Fuse': Fuse,
  'FutureRegular': FutureRegular,
  'Flip': Flip,
  'Fourth': Fourth,
  'Seventh': Seventh,
  'SeventhButFifth': SeventhButFifth,
  'SeventhSnowLands': SeventhSnowLands,
  'SeventhTextless': SeventhTextless,
  'M15BoxTopper': M15BoxTopper,
  'M15ClearTextboxes': M15ClearTextboxes,
  'M15ExtendedArtShort': M15ExtendedArtShort,
  'PlaneswalkerBorderless': PlaneswalkerBorderless,
  'PlaneswalkerBoxTopper': PlaneswalkerBoxTopper,
  'PlaneswalkerRegular': PlaneswalkerRegular,
  'PlaneswalkerSeventh': PlaneswalkerSeventh,
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
  'TokenUnglued': TokenUnglued,
  'TokenOld': TokenOld,
  'EOEBasics': EOEBasics,
  'TextlessBasics2022': TextlessBasics2022,
  'TextlessBasics2022UB': TextlessBasics2022UB,
  'TextlessBasicsSNC': TextlessBasicsSNC,
  'TextlessBasics': TextlessBasics,
  'ZendikarBasic-1': ZendikarBasic1,
  'FullartBasicRoundBottom': FullartBasicRoundBottom,
  'Unfinity': Unfinity,
  'Unhinged': Unhinged,
  'Unstable': Unstable,
  'TextlessGenericShowcase': TextlessGenericShowcase,
  'MagicFest': MagicFest,
  'PromoOpenHouse': PromoOpenHouse,
  'PromoRegular-1': PromoRegular1,
  'PromoNyx': PromoNyx,
  'PromoExtended': PromoExtended,
  'PromoNickname': PromoNickname,
  'PromoGenericShowcase': PromoGenericShowcase,
  'Prototype': Prototype,
  'PrototypeExtended': PrototypeExtended,
  'FeuerAmeiseIxalan': FeuerAmeiseIxalan,
  'FeuerAmeiseKaldheim': FeuerAmeiseKaldheim,
  'TextlessInvention': TextlessInvention,
  'J22Front': J22Front,
  'JapanShowcase': JapanShowcase,
  'JapanShowcaseNicknames': JapanShowcaseNicknames,
  'Paranormal': Paranormal,
  'JMPFront': JMPFront,
  'Kaldheim-2': Kaldheim2,
  'KaldheimNonleg': KaldheimNonleg,
  'Room': Room,
  'RoomUB': RoomUB,
  'Ring': Ring,
  'Scroll': Scroll,
  'ShatteredGlass': ShatteredGlass,
  'SignatureSpellbook': SignatureSpellbook,
  'SNCArtDeco': SNCArtDeco,
  'SNCGilded': SNCGilded,
  'SNCSkyscraper': SNCSkyscraper,
  'SDCC15': SDCC15,
  'UB': UB,
  'UBFull': UBFull,
  'UBExtendedArt': UBExtendedArt,
  'UBExtendedArtNew': UBExtendedArtNew,
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
  'Vanguard': Vanguard,
  'Vault': Vault,
  'M15RegularNew': M15RegularNew,
  'M15ExtendedArtNew': M15ExtendedArtNew,
  'M15LegendCrownsNew': M15LegendCrownsNew,
  'M15InnerCrownsNew': M15InnerCrownsNew,
  'FullArtNew': FullArtNew,
  'Ghostfire': Ghostfire,
  'IxalanCoin': IxalanCoin,
  'IxalanLegends1': IxalanLegends1,
  'IxalanLegends2': IxalanLegends2,
  'IxalanLegends3': IxalanLegends3,
  'SnowNew': SnowNew,
  'M15NyxNew': M15NyxNew,
  'UBNew': UBNew,
  'UBLegendCrownsNew': UBLegendCrownsNew,
  'UBLegendCrownsFloatingNew': UBLegendCrownsFloatingNew,
  'BorderlessStellarSights': BorderlessStellarSights,
  'MiscCustom': MiscCustom,
  'MysticalArchive': MysticalArchive,
  'MysticalArchiveJP': MysticalArchiveJP,
  'MysticalArchiveJPHorizontal': MysticalArchiveJPHorizontal,
  'MysticalArchiveSOA': MysticalArchiveSOA,
  'NEONeonShort': NEONeonShort,
  'NeonInk': NeonInk,
  'NeonInkTextless': NeonInkTextless,
  'NeonInkTransformFront': NeonInkTransformFront,
  'NeonInkTransformBack': NeonInkTransformBack,
  'NeonInkTransformFrontTextless': NeonInkTransformFrontTextless,
  'NeonInkTransformBackTextless': NeonInkTransformBackTextless,
  'OldFloating': OldFloating,
  'OldFloatingShort': OldFloatingShort,
  'OldSaga': OldSaga,
  'SNCGildedColored': SNCGildedColored,
  'SNCGildedTextless': SNCGildedTextless,
  'StoneCutterDeluxeCase': StoneCutterDeluxeCase,
  'StoneCutterDeluxeClass': StoneCutterDeluxeClass,
  'StoneCutterDeluxeDFC': StoneCutterDeluxeDFC,
  'StoneCutterDeluxeExtended': StoneCutterDeluxeExtended,
  'StoneCutterDeluxePlaneswalker': StoneCutterDeluxePlaneswalker,
  'StoneCutterDeluxePlaneswalkerExtended': StoneCutterDeluxePlaneswalkerExtended,
  'StoneCutterDeluxePlaneswalkerTransformAddons': StoneCutterDeluxePlaneswalkerTransformAddons,
  'StoneCutterDeluxeSaga': StoneCutterDeluxeSaga,
  'StoneCutterDeluxeTransformAddons': StoneCutterDeluxeTransformAddons,
  'StoneCutterDeluxe': StoneCutterDeluxe,
  'StoneCutterDeluxeNicknameAddons': StoneCutterDeluxeNicknameAddons,
  'TARDIS': TARDIS,
  'Tarkir': Tarkir,
  'Tapped': Tapped,
  'StationRegular': StationRegular,
  'StationBorderless': StationBorderless,
  'Class': Class,
  'StorybookMUL': StorybookMUL,
  'StorybookWOE': StorybookWOE,
  'Elemental': Elemental,
  'EnchantingTales': EnchantingTales,
  'EquinoxTextless': EquinoxTextless,
  'Etched': Etched,
  'EtchedNyx': EtchedNyx,
  'EtchedSnow': EtchedSnow,
  'ExpeditionBFZ-1': ExpeditionBFZ1,
  'ExpeditionZNR-1': ExpeditionZNR1,
  'InnerCrownsEtched': InnerCrownsEtched,
  'Invention': Invention,
  'Invocation': Invocation,
  'InvocationMUL': InvocationMUL,
  'Ixalan': Ixalan,
  'IkoShort': IkoShort,
  'LegendCrownsEtched': LegendCrownsEtched,
  'Legends': Legends,
  'Praetors': Praetors,
  'FullText': FullText,
  'FullTextAlt': FullTextAlt,
  'Classicshifted': Classicshifted,
  'ClassicshiftedNickname': ClassicshiftedNickname,
  'ClassicshiftedLands': ClassicshiftedLands,
  'ClassicshiftedSaga': ClassicshiftedSaga,
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
  'Pipboy': Pipboy,
  'Planechase': Planechase,
  'PixelTMT': PixelTMT,
  'SewerTMT': SewerTMT,
  'MarginSewerTMT': MarginSewerTMT,
  'Playtest': Playtest,
  'Ravnica': Ravnica,
  'M15TransformSnowFront': M15TransformSnowFront,
  'M15TransformUBFront': M15TransformUBFront,
  'TransformBorderlessAltBack': TransformBorderlessAltBack,
  'TransformBorderlessAltFront': TransformBorderlessAltFront,
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
  'M15TransformTypesBack': M15TransformTypesBack,
  'M15TransformBack': M15TransformBack,
  'M15TransformNyxBack': M15TransformNyxBack,
  'M15TransformSnowBack': M15TransformSnowBack,
  'M15TransformUBBack': M15TransformUBBack,
  'TransformSDCC15': TransformSDCC15,
  'TransformLegendCrowns': TransformLegendCrowns,
  'TransformLegendCrownsFloating': TransformLegendCrownsFloating,
  'TransformLegendCrownsFloatingBackRight': TransformLegendCrownsFloatingBackRight,
  'TransformLegendCrownsNickname': TransformLegendCrownsNickname,
  'TransformAddonMDFC': TransformAddonMDFC,
  'TransformAddonMDFCUB': TransformAddonMDFCUB,
  'TransformAddonMDFCBorderless': TransformAddonMDFCBorderless,
  'TransformAddonMDFCSnow': TransformAddonMDFCSnow,
  'TransformAddonMDFCExtended': TransformAddonMDFCExtended,
  'MarginFableECL': MarginFableECL,
  'Woodland': Woodland,
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
