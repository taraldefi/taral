import { StacksMainnet, StacksMocknet } from "micro-stacks/network";

export interface Network {
  name: string;
  label: string;
  chain: string;
  url: string;
}
export const DEFAULT_MAINNET_SERVER =
  process.env.NEXT_PUBLIC_MAINNET_API_SERVER || "";
export const DEFAULT_TESTNET_SERVER =
  process.env.NEXT_PUBLIC_TESTNET_API_SERVER || "";
export const DEFAULT_REGTEST_SERVER =
  process.env.NEXT_PUBLIC_REGTEST_API_SERVER || "";
export const DEFAULT_LOCALNET_SERVER =
  process.env.NEXT_PUBLIC_LOCALNET_API_SERVER || "";
export const DEFAULT_NETWORK_LIST: Network[] = [
  {
    //index: 0,
    name: "mainnet",
    label: "hiro.so",
    chain: "mainnet",
    url: DEFAULT_MAINNET_SERVER,
  },
  {
    //index: 1,
    name: "testnet",
    label: "hiro.so",
    chain: "testnet",
    url: DEFAULT_TESTNET_SERVER,
  },
  {
    //index: 2,
    name: "signet",
    label: "hiro.so",
    chain: "testnet",
    url: DEFAULT_REGTEST_SERVER,
  },
  {
    //index: 3,
    name: "localnet",
    label: "localhost",
    chain: "testnet",
    url: DEFAULT_LOCALNET_SERVER,
  },
];
export const DEFAULT_NETWORK_INDEX = parseFloat(
  process.env.NEXT_PUBLIC_DEFAULT_NETWORK_INDEX || "0"
);

export const devnet = process.env.NODE_ENV === "development";

export const stacksNetwork =
  process.env.NODE_ENV === "production" ? StacksMainnet : StacksMocknet;

export const TARAL_IMPORTER_CONTRACT = devnet
  ? "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.taral-importer"
  : "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.taral-importer";

export const TARAL_BANK_CONTRACT = devnet
  ? "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.taral-bank-complete"
  : "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.taral-bank-complete";

export const CURRENCIES = [
  { cc: "AED", symbol: "\u062f.\u0625;", name: "UAE dirham" },
  { cc: "AFN", symbol: "Afs", name: "Afghan afghani" },
  { cc: "ALL", symbol: "L", name: "Albanian lek" },
  { cc: "AMD", symbol: "AMD", name: "Armenian dram" },
  { cc: "ANG", symbol: "NA\u0192", name: "Netherlands Antillean gulden" },
  { cc: "AOA", symbol: "Kz", name: "Angolan kwanza" },
  { cc: "ARS", symbol: "$", name: "Argentine peso" },
  { cc: "AUD", symbol: "$", name: "Australian dollar" },
  { cc: "AWG", symbol: "\u0192", name: "Aruban florin" },
  { cc: "AZN", symbol: "AZN", name: "Azerbaijani manat" },
  {
    cc: "BAM",
    symbol: "KM",
    name: "Bosnia and Herzegovina konvertibilna marka",
  },
  { cc: "BBD", symbol: "Bds$", name: "Barbadian dollar" },
  { cc: "BDT", symbol: "\u09f3", name: "Bangladeshi taka" },
  { cc: "BGN", symbol: "BGN", name: "Bulgarian lev" },
  { cc: "BHD", symbol: ".\u062f.\u0628", name: "Bahraini dinar" },
  { cc: "BIF", symbol: "FBu", name: "Burundi franc" },
  { cc: "BMD", symbol: "BD$", name: "Bermudian dollar" },
  { cc: "BND", symbol: "B$", name: "Brunei dollar" },
  { cc: "BOB", symbol: "Bs.", name: "Bolivian boliviano" },
  { cc: "BRL", symbol: "R$", name: "Brazilian real" },
  { cc: "BSD", symbol: "B$", name: "Bahamian dollar" },
  { cc: "BTN", symbol: "Nu.", name: "Bhutanese ngultrum" },
  { cc: "BWP", symbol: "P", name: "Botswana pula" },
  { cc: "BYR", symbol: "Br", name: "Belarusian ruble" },
  { cc: "BZD", symbol: "BZ$", name: "Belize dollar" },
  { cc: "CAD", symbol: "$", name: "Canadian dollar" },
  { cc: "CDF", symbol: "F", name: "Congolese franc" },
  { cc: "CHF", symbol: "Fr.", name: "Swiss franc" },
  { cc: "CLP", symbol: "$", name: "Chilean peso" },
  { cc: "CNY", symbol: "\u00a5", name: "Chinese/Yuan renminbi" },
  { cc: "COP", symbol: "Col$", name: "Colombian peso" },
  { cc: "CRC", symbol: "\u20a1", name: "Costa Rican colon" },
  { cc: "CUC", symbol: "$", name: "Cuban peso" },
  { cc: "CVE", symbol: "Esc", name: "Cape Verdean escudo" },
  { cc: "CZK", symbol: "K\u010d", name: "Czech koruna" },
  { cc: "DJF", symbol: "Fdj", name: "Djiboutian franc" },
  { cc: "DKK", symbol: "Kr", name: "Danish krone" },
  { cc: "DOP", symbol: "RD$", name: "Dominican peso" },
  { cc: "DZD", symbol: "\u062f.\u062c", name: "Algerian dinar" },
  { cc: "EEK", symbol: "KR", name: "Estonian kroon" },
  { cc: "EGP", symbol: "\u00a3", name: "Egyptian pound" },
  { cc: "ERN", symbol: "Nfa", name: "Eritrean nakfa" },
  { cc: "ETB", symbol: "Br", name: "Ethiopian birr" },
  { cc: "EUR", symbol: "\u20ac", name: "European Euro" },
  { cc: "FJD", symbol: "FJ$", name: "Fijian dollar" },
  { cc: "FKP", symbol: "\u00a3", name: "Falkland Islands pound" },
  { cc: "GBP", symbol: "\u00a3", name: "British pound" },
  { cc: "GEL", symbol: "GEL", name: "Georgian lari" },
  { cc: "GHS", symbol: "GH\u20b5", name: "Ghanaian cedi" },
  { cc: "GIP", symbol: "\u00a3", name: "Gibraltar pound" },
  { cc: "GMD", symbol: "D", name: "Gambian dalasi" },
  { cc: "GNF", symbol: "FG", name: "Guinean franc" },
  { cc: "GQE", symbol: "CFA", name: "Central African CFA franc" },
  { cc: "GTQ", symbol: "Q", name: "Guatemalan quetzal" },
  { cc: "GYD", symbol: "GY$", name: "Guyanese dollar" },
  { cc: "HKD", symbol: "HK$", name: "Hong Kong dollar" },
  { cc: "HNL", symbol: "L", name: "Honduran lempira" },
  { cc: "HRK", symbol: "kn", name: "Croatian kuna" },
  { cc: "HTG", symbol: "G", name: "Haitian gourde" },
  { cc: "HUF", symbol: "Ft", name: "Hungarian forint" },
  { cc: "IDR", symbol: "Rp", name: "Indonesian rupiah" },
  { cc: "ILS", symbol: "\u20aa", name: "Israeli new sheqel" },
  { cc: "INR", symbol: "\u20B9", name: "Indian rupee" },
  { cc: "IQD", symbol: "\u062f.\u0639", name: "Iraqi dinar" },
  { cc: "IRR", symbol: "IRR", name: "Iranian rial" },
  { cc: "ISK", symbol: "kr", name: "Icelandic kr\u00f3na" },
  { cc: "JMD", symbol: "J$", name: "Jamaican dollar" },
  { cc: "JOD", symbol: "JOD", name: "Jordanian dinar" },
  { cc: "JPY", symbol: "\u00a5", name: "Japanese yen" },
  { cc: "KES", symbol: "KSh", name: "Kenyan shilling" },
  { cc: "KGS", symbol: "\u0441\u043e\u043c", name: "Kyrgyzstani som" },
  { cc: "KHR", symbol: "\u17db", name: "Cambodian riel" },
  { cc: "KMF", symbol: "KMF", name: "Comorian franc" },
  { cc: "KPW", symbol: "W", name: "North Korean won" },
  { cc: "KRW", symbol: "W", name: "South Korean won" },
  { cc: "KWD", symbol: "KWD", name: "Kuwaiti dinar" },
  { cc: "KYD", symbol: "KY$", name: "Cayman Islands dollar" },
  { cc: "KZT", symbol: "T", name: "Kazakhstani tenge" },
  { cc: "LAK", symbol: "KN", name: "Lao kip" },
  { cc: "LBP", symbol: "\u00a3", name: "Lebanese lira" },
  { cc: "LKR", symbol: "Rs", name: "Sri Lankan rupee" },
  { cc: "LRD", symbol: "L$", name: "Liberian dollar" },
  { cc: "LSL", symbol: "M", name: "Lesotho loti" },
  { cc: "LTL", symbol: "Lt", name: "Lithuanian litas" },
  { cc: "LVL", symbol: "Ls", name: "Latvian lats" },
  { cc: "LYD", symbol: "LD", name: "Libyan dinar" },
  { cc: "MAD", symbol: "MAD", name: "Moroccan dirham" },
  { cc: "MDL", symbol: "MDL", name: "Moldovan leu" },
  { cc: "MGA", symbol: "FMG", name: "Malagasy ariary" },
  { cc: "MKD", symbol: "MKD", name: "Macedonian denar" },
  { cc: "MMK", symbol: "K", name: "Myanma kyat" },
  { cc: "MNT", symbol: "\u20ae", name: "Mongolian tugrik" },
  { cc: "MOP", symbol: "P", name: "Macanese pataca" },
  { cc: "MRO", symbol: "UM", name: "Mauritanian ouguiya" },
  { cc: "MUR", symbol: "Rs", name: "Mauritian rupee" },
  { cc: "MVR", symbol: "Rf", name: "Maldivian rufiyaa" },
  { cc: "MWK", symbol: "MK", name: "Malawian kwacha" },
  { cc: "MXN", symbol: "$", name: "Mexican peso" },
  { cc: "MYR", symbol: "RM", name: "Malaysian ringgit" },
  { cc: "MZM", symbol: "MTn", name: "Mozambican metical" },
  { cc: "NAD", symbol: "N$", name: "Namibian dollar" },
  { cc: "NGN", symbol: "\u20a6", name: "Nigerian naira" },
  { cc: "NIO", symbol: "C$", name: "Nicaraguan c\u00f3rdoba" },
  { cc: "NOK", symbol: "kr", name: "Norwegian krone" },
  { cc: "NPR", symbol: "NRs", name: "Nepalese rupee" },
  { cc: "NZD", symbol: "NZ$", name: "New Zealand dollar" },
  { cc: "OMR", symbol: "OMR", name: "Omani rial" },
  { cc: "PAB", symbol: "B./", name: "Panamanian balboa" },
  { cc: "PEN", symbol: "S/.", name: "Peruvian nuevo sol" },
  { cc: "PGK", symbol: "K", name: "Papua New Guinean kina" },
  { cc: "PHP", symbol: "\u20b1", name: "Philippine peso" },
  { cc: "PKR", symbol: "Rs.", name: "Pakistani rupee" },
  { cc: "PLN", symbol: "z\u0142", name: "Polish zloty" },
  { cc: "PYG", symbol: "\u20b2", name: "Paraguayan guarani" },
  { cc: "QAR", symbol: "QR", name: "Qatari riyal" },
  { cc: "RON", symbol: "L", name: "Romanian leu" },
  { cc: "RSD", symbol: "din.", name: "Serbian dinar" },
  { cc: "RUB", symbol: "R", name: "Russian ruble" },
  { cc: "SAR", symbol: "SR", name: "Saudi riyal" },
  { cc: "SBD", symbol: "SI$", name: "Solomon Islands dollar" },
  { cc: "SCR", symbol: "SR", name: "Seychellois rupee" },
  { cc: "SDG", symbol: "SDG", name: "Sudanese pound" },
  { cc: "SEK", symbol: "kr", name: "Swedish krona" },
  { cc: "SGD", symbol: "S$", name: "Singapore dollar" },
  { cc: "SHP", symbol: "\u00a3", name: "Saint Helena pound" },
  { cc: "SLL", symbol: "Le", name: "Sierra Leonean leone" },
  { cc: "SOS", symbol: "Sh.", name: "Somali shilling" },
  { cc: "SRD", symbol: "$", name: "Surinamese dollar" },
  { cc: "SYP", symbol: "LS", name: "Syrian pound" },
  { cc: "SZL", symbol: "E", name: "Swazi lilangeni" },
  { cc: "THB", symbol: "\u0e3f", name: "Thai baht" },
  { cc: "TJS", symbol: "TJS", name: "Tajikistani somoni" },
  { cc: "TMT", symbol: "m", name: "Turkmen manat" },
  { cc: "TND", symbol: "DT", name: "Tunisian dinar" },
  { cc: "TRY", symbol: "TRY", name: "Turkish new lira" },
  { cc: "TTD", symbol: "TT$", name: "Trinidad and Tobago dollar" },
  { cc: "TWD", symbol: "NT$", name: "New Taiwan dollar" },
  { cc: "TZS", symbol: "TZS", name: "Tanzanian shilling" },
  { cc: "UAH", symbol: "UAH", name: "Ukrainian hryvnia" },
  { cc: "UGX", symbol: "USh", name: "Ugandan shilling" },
  { cc: "USD", symbol: "US$", name: "United States dollar" },
  { cc: "UYU", symbol: "$U", name: "Uruguayan peso" },
  { cc: "UZS", symbol: "UZS", name: "Uzbekistani som" },
  { cc: "VEB", symbol: "Bs", name: "Venezuelan bolivar" },
  { cc: "VND", symbol: "\u20ab", name: "Vietnamese dong" },
  { cc: "VUV", symbol: "VT", name: "Vanuatu vatu" },
  { cc: "WST", symbol: "WS$", name: "Samoan tala" },
  { cc: "XAF", symbol: "CFA", name: "Central African CFA franc" },
  { cc: "XCD", symbol: "EC$", name: "East Caribbean dollar" },
  { cc: "XDR", symbol: "SDR", name: "Special Drawing Rights" },
  { cc: "XOF", symbol: "CFA", name: "West African CFA franc" },
  { cc: "XPF", symbol: "F", name: "CFP franc" },
  { cc: "YER", symbol: "YER", name: "Yemeni rial" },
  { cc: "ZAR", symbol: "R", name: "South African rand" },
  { cc: "ZMK", symbol: "ZK", name: "Zambian kwacha" },
  { cc: "ZWR", symbol: "Z$", name: "Zimbabwean dollar" },
];
export const countries = [
  { id: 4, alpha2: "af", alpha3: "afg", name: "Afghanistan" },
  { id: 8, alpha2: "al", alpha3: "alb", name: "Albania" },
  { id: 12, alpha2: "dz", alpha3: "dza", name: "Algeria" },
  { id: 20, alpha2: "ad", alpha3: "and", name: "Andorra" },
  { id: 24, alpha2: "ao", alpha3: "ago", name: "Angola" },
  { id: 28, alpha2: "ag", alpha3: "atg", name: "Antigua and Barbuda" },
  { id: 32, alpha2: "ar", alpha3: "arg", name: "Argentina" },
  { id: 51, alpha2: "am", alpha3: "arm", name: "Armenia" },
  { id: 36, alpha2: "au", alpha3: "aus", name: "Australia" },
  { id: 40, alpha2: "at", alpha3: "aut", name: "Austria" },
  { id: 31, alpha2: "az", alpha3: "aze", name: "Azerbaijan" },
  { id: 44, alpha2: "bs", alpha3: "bhs", name: "Bahamas" },
  { id: 48, alpha2: "bh", alpha3: "bhr", name: "Bahrain" },
  { id: 50, alpha2: "bd", alpha3: "bgd", name: "Bangladesh" },
  { id: 52, alpha2: "bb", alpha3: "brb", name: "Barbados" },
  { id: 112, alpha2: "by", alpha3: "blr", name: "Belarus" },
  { id: 56, alpha2: "be", alpha3: "bel", name: "Belgium" },
  { id: 84, alpha2: "bz", alpha3: "blz", name: "Belize" },
  { id: 204, alpha2: "bj", alpha3: "ben", name: "Benin" },
  { id: 64, alpha2: "bt", alpha3: "btn", name: "Bhutan" },
  {
    id: 68,
    alpha2: "bo",
    alpha3: "bol",
    name: "Bolivia (Plurinational State of)",
  },
  { id: 70, alpha2: "ba", alpha3: "bih", name: "Bosnia and Herzegovina" },
  { id: 72, alpha2: "bw", alpha3: "bwa", name: "Botswana" },
  { id: 76, alpha2: "br", alpha3: "bra", name: "Brazil" },
  { id: 96, alpha2: "bn", alpha3: "brn", name: "Brunei Darussalam" },
  { id: 100, alpha2: "bg", alpha3: "bgr", name: "Bulgaria" },
  { id: 854, alpha2: "bf", alpha3: "bfa", name: "Burkina Faso" },
  { id: 108, alpha2: "bi", alpha3: "bdi", name: "Burundi" },
  { id: 132, alpha2: "cv", alpha3: "cpv", name: "Cabo Verde" },
  { id: 116, alpha2: "kh", alpha3: "khm", name: "Cambodia" },
  { id: 120, alpha2: "cm", alpha3: "cmr", name: "Cameroon" },
  { id: 124, alpha2: "ca", alpha3: "can", name: "Canada" },
  { id: 140, alpha2: "cf", alpha3: "caf", name: "Central African Republic" },
  { id: 148, alpha2: "td", alpha3: "tcd", name: "Chad" },
  { id: 152, alpha2: "cl", alpha3: "chl", name: "Chile" },
  { id: 156, alpha2: "cn", alpha3: "chn", name: "China" },
  { id: 170, alpha2: "co", alpha3: "col", name: "Colombia" },
  { id: 174, alpha2: "km", alpha3: "com", name: "Comoros" },
  { id: 178, alpha2: "cg", alpha3: "cog", name: "Congo" },
  {
    id: 180,
    alpha2: "cd",
    alpha3: "cod",
    name: "Congo, Democratic Republic of the",
  },
  { id: 188, alpha2: "cr", alpha3: "cri", name: "Costa Rica" },
  { id: 384, alpha2: "ci", alpha3: "civ", name: "Côte d'Ivoire" },
  { id: 191, alpha2: "hr", alpha3: "hrv", name: "Croatia" },
  { id: 192, alpha2: "cu", alpha3: "cub", name: "Cuba" },
  { id: 196, alpha2: "cy", alpha3: "cyp", name: "Cyprus" },
  { id: 203, alpha2: "cz", alpha3: "cze", name: "Czechia" },
  { id: 208, alpha2: "dk", alpha3: "dnk", name: "Denmark" },
  { id: 262, alpha2: "dj", alpha3: "dji", name: "Djibouti" },
  { id: 212, alpha2: "dm", alpha3: "dma", name: "Dominica" },
  { id: 214, alpha2: "do", alpha3: "dom", name: "Dominican Republic" },
  { id: 218, alpha2: "ec", alpha3: "ecu", name: "Ecuador" },
  { id: 818, alpha2: "eg", alpha3: "egy", name: "Egypt" },
  { id: 222, alpha2: "sv", alpha3: "slv", name: "El Salvador" },
  { id: 226, alpha2: "gq", alpha3: "gnq", name: "Equatorial Guinea" },
  { id: 232, alpha2: "er", alpha3: "eri", name: "Eritrea" },
  { id: 233, alpha2: "ee", alpha3: "est", name: "Estonia" },
  { id: 748, alpha2: "sz", alpha3: "swz", name: "Eswatini" },
  { id: 231, alpha2: "et", alpha3: "eth", name: "Ethiopia" },
  { id: 242, alpha2: "fj", alpha3: "fji", name: "Fiji" },
  { id: 246, alpha2: "fi", alpha3: "fin", name: "Finland" },
  { id: 250, alpha2: "fr", alpha3: "fra", name: "France" },
  { id: 266, alpha2: "ga", alpha3: "gab", name: "Gabon" },
  { id: 270, alpha2: "gm", alpha3: "gmb", name: "Gambia" },
  { id: 268, alpha2: "ge", alpha3: "geo", name: "Georgia" },
  { id: 276, alpha2: "de", alpha3: "deu", name: "Germany" },
  { id: 288, alpha2: "gh", alpha3: "gha", name: "Ghana" },
  { id: 300, alpha2: "gr", alpha3: "grc", name: "Greece" },
  { id: 308, alpha2: "gd", alpha3: "grd", name: "Grenada" },
  { id: 320, alpha2: "gt", alpha3: "gtm", name: "Guatemala" },
  { id: 324, alpha2: "gn", alpha3: "gin", name: "Guinea" },
  { id: 624, alpha2: "gw", alpha3: "gnb", name: "Guinea-Bissau" },
  { id: 328, alpha2: "gy", alpha3: "guy", name: "Guyana" },
  { id: 332, alpha2: "ht", alpha3: "hti", name: "Haiti" },
  { id: 340, alpha2: "hn", alpha3: "hnd", name: "Honduras" },
  { id: 348, alpha2: "hu", alpha3: "hun", name: "Hungary" },
  { id: 352, alpha2: "is", alpha3: "isl", name: "Iceland" },
  { id: 356, alpha2: "in", alpha3: "ind", name: "India" },
  { id: 360, alpha2: "id", alpha3: "idn", name: "Indonesia" },
  { id: 364, alpha2: "ir", alpha3: "irn", name: "Iran (Islamic Republic of)" },
  { id: 368, alpha2: "iq", alpha3: "irq", name: "Iraq" },
  { id: 372, alpha2: "ie", alpha3: "irl", name: "Ireland" },
  { id: 376, alpha2: "il", alpha3: "isr", name: "Israel" },
  { id: 380, alpha2: "it", alpha3: "ita", name: "Italy" },
  { id: 388, alpha2: "jm", alpha3: "jam", name: "Jamaica" },
  { id: 392, alpha2: "jp", alpha3: "jpn", name: "Japan" },
  { id: 400, alpha2: "jo", alpha3: "jor", name: "Jordan" },
  { id: 398, alpha2: "kz", alpha3: "kaz", name: "Kazakhstan" },
  { id: 404, alpha2: "ke", alpha3: "ken", name: "Kenya" },
  { id: 296, alpha2: "ki", alpha3: "kir", name: "Kiribati" },
  {
    id: 408,
    alpha2: "kp",
    alpha3: "prk",
    name: "Korea (Democratic People's Republic of)",
  },
  { id: 410, alpha2: "kr", alpha3: "kor", name: "Korea, Republic of" },
  { id: 414, alpha2: "kw", alpha3: "kwt", name: "Kuwait" },
  { id: 417, alpha2: "kg", alpha3: "kgz", name: "Kyrgyzstan" },
  {
    id: 418,
    alpha2: "la",
    alpha3: "lao",
    name: "Lao People's Democratic Republic",
  },
  { id: 428, alpha2: "lv", alpha3: "lva", name: "Latvia" },
  { id: 422, alpha2: "lb", alpha3: "lbn", name: "Lebanon" },
  { id: 426, alpha2: "ls", alpha3: "lso", name: "Lesotho" },
  { id: 430, alpha2: "lr", alpha3: "lbr", name: "Liberia" },
  { id: 434, alpha2: "ly", alpha3: "lby", name: "Libya" },
  { id: 438, alpha2: "li", alpha3: "lie", name: "Liechtenstein" },
  { id: 440, alpha2: "lt", alpha3: "ltu", name: "Lithuania" },
  { id: 442, alpha2: "lu", alpha3: "lux", name: "Luxembourg" },
  { id: 450, alpha2: "mg", alpha3: "mdg", name: "Madagascar" },
  { id: 454, alpha2: "mw", alpha3: "mwi", name: "Malawi" },
  { id: 458, alpha2: "my", alpha3: "mys", name: "Malaysia" },
  { id: 462, alpha2: "mv", alpha3: "mdv", name: "Maldives" },
  { id: 466, alpha2: "ml", alpha3: "mli", name: "Mali" },
  { id: 470, alpha2: "mt", alpha3: "mlt", name: "Malta" },
  { id: 584, alpha2: "mh", alpha3: "mhl", name: "Marshall Islands" },
  { id: 478, alpha2: "mr", alpha3: "mrt", name: "Mauritania" },
  { id: 480, alpha2: "mu", alpha3: "mus", name: "Mauritius" },
  { id: 484, alpha2: "mx", alpha3: "mex", name: "Mexico" },
  {
    id: 583,
    alpha2: "fm",
    alpha3: "fsm",
    name: "Micronesia (Federated States of)",
  },
  { id: 498, alpha2: "md", alpha3: "mda", name: "Moldova, Republic of" },
  { id: 492, alpha2: "mc", alpha3: "mco", name: "Monaco" },
  { id: 496, alpha2: "mn", alpha3: "mng", name: "Mongolia" },
  { id: 499, alpha2: "me", alpha3: "mne", name: "Montenegro" },
  { id: 504, alpha2: "ma", alpha3: "mar", name: "Morocco" },
  { id: 508, alpha2: "mz", alpha3: "moz", name: "Mozambique" },
  { id: 104, alpha2: "mm", alpha3: "mmr", name: "Myanmar" },
  { id: 516, alpha2: "na", alpha3: "nam", name: "Namibia" },
  { id: 520, alpha2: "nr", alpha3: "nru", name: "Nauru" },
  { id: 524, alpha2: "np", alpha3: "npl", name: "Nepal" },
  { id: 528, alpha2: "nl", alpha3: "nld", name: "Netherlands" },
  { id: 554, alpha2: "nz", alpha3: "nzl", name: "New Zealand" },
  { id: 558, alpha2: "ni", alpha3: "nic", name: "Nicaragua" },
  { id: 562, alpha2: "ne", alpha3: "ner", name: "Niger" },
  { id: 566, alpha2: "ng", alpha3: "nga", name: "Nigeria" },
  { id: 807, alpha2: "mk", alpha3: "mkd", name: "North Macedonia" },
  { id: 578, alpha2: "no", alpha3: "nor", name: "Norway" },
  { id: 512, alpha2: "om", alpha3: "omn", name: "Oman" },
  { id: 586, alpha2: "pk", alpha3: "pak", name: "Pakistan" },
  { id: 585, alpha2: "pw", alpha3: "plw", name: "Palau" },
  { id: 591, alpha2: "pa", alpha3: "pan", name: "Panama" },
  { id: 598, alpha2: "pg", alpha3: "png", name: "Papua New Guinea" },
  { id: 600, alpha2: "py", alpha3: "pry", name: "Paraguay" },
  { id: 604, alpha2: "pe", alpha3: "per", name: "Peru" },
  { id: 608, alpha2: "ph", alpha3: "phl", name: "Philippines" },
  { id: 616, alpha2: "pl", alpha3: "pol", name: "Poland" },
  { id: 620, alpha2: "pt", alpha3: "prt", name: "Portugal" },
  { id: 634, alpha2: "qa", alpha3: "qat", name: "Qatar" },
  { id: 642, alpha2: "ro", alpha3: "rou", name: "Romania" },
  { id: 643, alpha2: "ru", alpha3: "rus", name: "Russian Federation" },
  { id: 646, alpha2: "rw", alpha3: "rwa", name: "Rwanda" },
  { id: 659, alpha2: "kn", alpha3: "kna", name: "Saint Kitts and Nevis" },
  { id: 662, alpha2: "lc", alpha3: "lca", name: "Saint Lucia" },
  {
    id: 670,
    alpha2: "vc",
    alpha3: "vct",
    name: "Saint Vincent and the Grenadines",
  },
  { id: 882, alpha2: "ws", alpha3: "wsm", name: "Samoa" },
  { id: 674, alpha2: "sm", alpha3: "smr", name: "San Marino" },
  { id: 678, alpha2: "st", alpha3: "stp", name: "Sao Tome and Principe" },
  { id: 682, alpha2: "sa", alpha3: "sau", name: "Saudi Arabia" },
  { id: 686, alpha2: "sn", alpha3: "sen", name: "Senegal" },
  { id: 688, alpha2: "rs", alpha3: "srb", name: "Serbia" },
  { id: 690, alpha2: "sc", alpha3: "syc", name: "Seychelles" },
  { id: 694, alpha2: "sl", alpha3: "sle", name: "Sierra Leone" },
  { id: 702, alpha2: "sg", alpha3: "sgp", name: "Singapore" },
  { id: 703, alpha2: "sk", alpha3: "svk", name: "Slovakia" },
  { id: 705, alpha2: "si", alpha3: "svn", name: "Slovenia" },
  { id: 90, alpha2: "sb", alpha3: "slb", name: "Solomon Islands" },
  { id: 706, alpha2: "so", alpha3: "som", name: "Somalia" },
  { id: 710, alpha2: "za", alpha3: "zaf", name: "South Africa" },
  { id: 728, alpha2: "ss", alpha3: "ssd", name: "South Sudan" },
  { id: 724, alpha2: "es", alpha3: "esp", name: "Spain" },
  { id: 144, alpha2: "lk", alpha3: "lka", name: "Sri Lanka" },
  { id: 729, alpha2: "sd", alpha3: "sdn", name: "Sudan" },
  { id: 740, alpha2: "sr", alpha3: "sur", name: "Suriname" },
  { id: 752, alpha2: "se", alpha3: "swe", name: "Sweden" },
  { id: 756, alpha2: "ch", alpha3: "che", name: "Switzerland" },
  { id: 760, alpha2: "sy", alpha3: "syr", name: "Syrian Arab Republic" },
  { id: 762, alpha2: "tj", alpha3: "tjk", name: "Tajikistan" },
  {
    id: 834,
    alpha2: "tz",
    alpha3: "tza",
    name: "Tanzania, United Republic of",
  },
  { id: 764, alpha2: "th", alpha3: "tha", name: "Thailand" },
  { id: 626, alpha2: "tl", alpha3: "tls", name: "Timor-Leste" },
  { id: 768, alpha2: "tg", alpha3: "tgo", name: "Togo" },
  { id: 776, alpha2: "to", alpha3: "ton", name: "Tonga" },
  { id: 780, alpha2: "tt", alpha3: "tto", name: "Trinidad and Tobago" },
  { id: 788, alpha2: "tn", alpha3: "tun", name: "Tunisia" },
  { id: 792, alpha2: "tr", alpha3: "tur", name: "Türkiye" },
  { id: 795, alpha2: "tm", alpha3: "tkm", name: "Turkmenistan" },
  { id: 798, alpha2: "tv", alpha3: "tuv", name: "Tuvalu" },
  { id: 800, alpha2: "ug", alpha3: "uga", name: "Uganda" },
  { id: 804, alpha2: "ua", alpha3: "ukr", name: "Ukraine" },
  { id: 784, alpha2: "ae", alpha3: "are", name: "United Arab Emirates" },
  {
    id: 826,
    alpha2: "gb",
    alpha3: "gbr",
    name: "United Kingdom of Great Britain and Northern Ireland",
  },
  { id: 840, alpha2: "us", alpha3: "usa", name: "United States of America" },
  { id: 858, alpha2: "uy", alpha3: "ury", name: "Uruguay" },
  { id: 860, alpha2: "uz", alpha3: "uzb", name: "Uzbekistan" },
  { id: 548, alpha2: "vu", alpha3: "vut", name: "Vanuatu" },
  {
    id: 862,
    alpha2: "ve",
    alpha3: "ven",
    name: "Venezuela (Bolivarian Republic of)",
  },
  { id: 704, alpha2: "vn", alpha3: "vnm", name: "Viet Nam" },
  { id: 887, alpha2: "ye", alpha3: "yem", name: "Yemen" },
  { id: 894, alpha2: "zm", alpha3: "zmb", name: "Zambia" },
  { id: 716, alpha2: "zw", alpha3: "zwe", name: "Zimbabwe" },
];

export const industries = [
  { id: 0, name: "Accommodation" },
  { id: 1, name: "Accommodation and Food Services" },
  { id: 2, name: "Administrative and Support Services" },
  {
    id: 3,
    name: "Administrative and Support and Waste Management and Remediation Services",
  },
  { id: 4, name: "Agriculture, Forestry, Fishing and Hunting" },
  { id: 5, name: "Air Transportation" },
  { id: 6, name: "Ambulatory Health Care Services" },
  { id: 7, name: "Amusement, Gambling, and Recreation Industries" },
  { id: 8, name: "Animal Production" },
  { id: 9, name: "Apparel Manufacturing" },
  { id: 10, name: "Arts, Entertainment, and Recreation" },
  { id: 11, name: "Beverage and Tobacco Product Manufacturing" },
  { id: 12, name: "Broadcasting (except Internet)" },
  {
    id: 13,
    name: "Building Material and Garden Equipment and Supplies Dealers",
  },
  {
    id: 14,
    name: "Chemical Manufacturing",
  },
  {
    id: 15,
    name: "Clothing and Clothing Accessories Stores",
  },
  {
    id: 16,
    name: "Computer and Electronic Product Manufacturing",
  },
  {
    id: 17,
    name: "Construction",
  },
  {
    id: 18,
    name: "Construction of Buildings",
  },
  {
    id: 19,
    name: "Couriers and Messengers",
  },
  {
    id: 20,
    name: "Credit Intermediation and Related Activities",
  },
  {
    id: 21,
    name: "Crop Production",
  },
  {
    id: 22,
    name: " Data Processing, Hosting, and Related Services",
  },
  {
    id: 23,
    name: "Education and Health Services",
  },
  {
    id: 24,
    name: "Educational Services",
  },
  {
    id: 25,
    name: "Electrical Equipment, Appliance, and Component Manufacturing",
  },
  {
    id: 26,
    name: "Electronics and Appliance Stores",
  },
  {
    id: 27,
    name: "Fabricated Metal Product Manufacturing",
  },
  {
    id: 28,
    name: "Finance and Insurance",
  },
  {
    id: 29,
    name: "Financial Activities",
  },
  {
    id: 30,
    name: "Fishing, Hunting and Trapping",
  },
  {
    id: 31,
    name: "Food Manufacturing",
  },
  {
    id: 32,
    name: "Food Services and Drinking Places",
  },
  {
    id: 33,
    name: "Food and Beverage Stores",
  },
  {
    id: 34,
    name: "Forestry and Logging",
  },
  {
    id: 35,
    name: "Funds, Trusts, and Other Financial Vehicles",
  },
  {
    id: 36,
    name: "Furniture and Home Furnishings Stores ",
  },
  {
    id: 37,
    name: "Furniture and Related Product Manufacturing",
  },
  {
    id: 38,
    name: "Gasoline Stations",
  },
  {
    id: 39,
    name: "General Merchandise Stores",
  },
  {
    id: 40,
    name: "Goods-Producing Industries",
  },
  {
    id: 41,
    name: "Health Care and Social Assistance ",
  },
  {
    id: 42,
    name: "Health and Personal Care Stores",
  },
  {
    id: 43,
    name: "Heavy and Civil Engineering Construction",
  },
  {
    id: 44,
    name: "Hospitals",
  },
  {
    id: 45,
    name: "Information",
  },
  {
    id: 46,
    name: "Insurance Carriers and Related Activities",
  },
  {
    id: 47,
    name: "Internet Publishing and Broadcasting",
  },

  {
    id: 48,
    name: "Leather and Allied Product Manufacturing",
  },
  {
    id: 49,
    name: "Leisure and Hospitality",
  },
  {
    id: 50,
    name: "Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)",
  },
  {
    id: 51,
    name: "Machinery Manufacturing",
  },
  {
    id: 52,
    name: "Management of Companies and Enterprises",
  },

  {
    id: 53,
    name: "Manufacturing",
  },
  {
    id: 54,
    name: "Merchant Wholesalers, Durable Goods",
  },
  {
    id: 55,
    name: "Merchant Wholesalers, Nondurable Goods",
  },
  {
    id: 56,
    name: "Mining (except Oil and Gas)",
  },
  {
    id: 57,
    name: "Mining, Quarrying, and Oil and Gas Extraction",
  },
  {
    id: 58,
    name: "Miscellaneous Manufacturing",
  },
  {
    id: 59,
    name: "Miscellaneous Store Retailers",
  },
  {
    id: 60,
    name: "Monetary Authorities - Central Bank",
  },
  {
    id: 61,
    name: "Motion Picture and Sound Recording Industries",
  },
  {
    id: 62,
    name: "Motor Vehicle and Parts Dealers",
  },
  {
    id: 63,
    name: "Museums, Historical Sites, and Similar Institutions",
  },
  {
    id: 64,
    name: "Natural Resources and Mining",
  },
  {
    id: 65,
    name: "Nonmetallic Mineral Product Manufacturing",
  },
  {
    id: 66,
    name: "Nonstore Retailers",
  },
  {
    id: 67,
    name: "Nursing and Residential Care Facilities",
  },
  {
    id: 68,
    name: "Oil and Gas Extraction",
  },
  {
    id: 69,
    name: "Other Information Services",
  },
  {
    id: 70,
    name: "Other Services (except Public Administration)",
  },
  {
    id: 71,
    name: "Paper Manufacturing",
  },
  {
    id: 72,
    name: "Performing Arts, Spectator Sports, and Related Industries",
  },
  {
    id: 73,
    name: "Personal and Laundry Services",
  },
  {
    id: 74,
    name: "Petroleum and Coal Products Manufacturing",
  },
  {
    id: 75,
    name: "Pipeline Transportation",
  },
  {
    id: 76,
    name: "Plastics and Rubber Products Manufacturing",
  },
  {
    id: 77,
    name: "Primary Metal Manufacturing",
  },
  {
    id: 78,
    name: "Printing and Related Support Activities",
  },
  {
    id: 79,
    name: "Private Households",
  },
  {
    id: 80,
    name: "Professional and Business Services",
  },
  {
    id: 81,
    name: "Professional, Scientific, and Technical Services",
  },
  {
    id: 82,
    name: "Publishing Industries (except Internet) ",
  },
  {
    id: 83,
    name: "Rail Transportation ",
  },
  {
    id: 84,
    name: "Real Estate",
  },
  {
    id: 85,
    name: "Real Estate and Rental and Leasing",
  },
  {
    id: 86,
    name: "Religious, Grantmaking, Civic, Professional, and Similar Organizations",
  },
  {
    id: 87,
    name: "Rental and Leasing Services",
  },
  {
    id: 88,
    name: "Repair and Maintenance",
  },
  {
    id: 89,
    name: "Scenic and Sightseeing Transportation",
  },
  {
    id: 90,
    name: "Securities, Commodity Contracts, and Other Financial Investments and Related Activities",
  },
  {
    id: 91,
    name: "Service-Providing Industries",
  },
  {
    id: 92,
    name: "Social Assistance",
  },
  {
    id: 93,
    name: "Specialty Trade Contractors",
  },
  {
    id: 94,
    name: "Sporting Goods, Hobby, Book, and Music Stores",
  },
  {
    id: 95,
    name: "Support Activities for Agriculture and Forestry",
  },
  {
    id: 96,
    name: "Support Activities for Mining",
  },
  {
    id: 97,
    name: "Support Activities for Transportation",
  },
  {
    id: 98,
    name: "Telecommunications",
  },
  {
    id: 99,
    name: "Textile Mills",
  },
  {
    id: 100,
    name: "Textile Product Mills",
  },
  {
    id: 101,
    name: "Trade, Transportation, and Utilities",
  },
  {
    id: 102,
    name: "Transit and Ground Passenger Transportation",
  },
  {
    id: 103,
    name: "Transportation Equipment Manufacturing",
  },
  {
    id: 104,
    name: "Transportation and Warehousing",
  },
  {
    id: 105,
    name: "Truck Transportation",
  },
  {
    id: 106,
    name: "Utilities",
  },
  {
    id: 107,
    name: "Warehousing and Storage",
  },
  {
    id: 108,
    name: "Waste Management and Remediation Services",
  },
  {
    id: 109,
    name: "Water Transportation",
  },
  {
    id: 110,
    name: "Wholesale Electronic Markets and Agents and Brokers",
  },
  {
    id: 111,
    name: "Wholesale Trade",
  },
  {
    id: 112,
    name: "Wood Product Manufacturing",
  },
];
