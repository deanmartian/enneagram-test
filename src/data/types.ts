import { EnneaTypeId } from "@/types";

export const ENNEA_TYPE_NAMES: Record<EnneaTypeId, string> = {
  1: "Type 1 – Prinsippfast",
  2: "Type 2 – Hjelperen",
  3: "Type 3 – Iverksetteren",
  4: "Type 4 – Individualisten",
  5: "Type 5 – Utforskeren",
  6: "Type 6 – Forberederen",
  7: "Type 7 – Entusiasten",
  8: "Type 8 – Pådriveren",
  9: "Type 9 – Megleren"
};

export const ENNEA_TYPE_BLURBS: Record<EnneaTypeId, string> = {
  1: "Setter pris på orden, rettferdighet og forbedring.",
  2: "Ser og støtter andres behov, ønsker å bidra.",
  3: "Målrettet, handlekraftig og opptatt av resultater.",
  4: "Søker autentisitet, dybde og uttrykk.",
  5: "Analytisk, selvstendig og kunnskapsdrevet.",
  6: "Trygghetssøkende, lojal og forberedt.",
  7: "Idérik, positiv og glad i variasjon.",
  8: "Direkte, beskyttende og kraftfull.",
  9: "Harmonisøkende, inkluderende og tålmodig."
};

export const ENNEA_TYPE_DESCRIPTIONS: Record<EnneaTypeId, string> = {
  1: "Type 1 er drevet av et ønske om å forbedre seg selv og verden. De har et sterkt indre kompass som viser dem rett og galt, og de arbeider hardt for å leve opp til sine høye standarder. De er organiserte, ansvarlige og har øye for detaljer. Type 1 kan være kritiske, både mot seg selv og andre, når standarder ikke møtes.",

  2: "Type 2 er naturlige hjelpere som føler seg best når de kan støtte andre. De har en intuitiv evne til å lese andres følelser og behov, og de gir generøst av sin tid og energi. De søker å bli verdsatt og elsket gjennom sin omsorgsfulle natur, men kan glemme sine egne behov i prosessen.",

  3: "Type 3 er målrettet og effektiv, drevet av et ønske om suksess og anerkjennelse. De er gode til å lese situasjoner og tilpasse seg for å oppnå ønskede resultater. De er energiske og inspirerende ledere, men kan bli for fokusert på image og prestasjoner på bekostning av autentiske relasjoner.",

  4: "Type 4 søker å forstå og uttrykke sin unike identitet. De har et rikt indre liv og sterke følelser, og de setter pris på autentisitet og dybde. De kan være kreative og innsiktsfulle, men også melankolske og selvopptatte. De lengter etter noe som føles som det mangler i livet deres.",

  5: "Type 5 er observatører og tenkere som søker å forstå verden gjennom kunnskap og analyse. De trenger tid alene for å prosessere og bygge kompetanse før de handler. De er objektive og insiktsfulle, men kan trekke seg tilbake og bli isolerte når de føler seg overveldet.",

  6: "Type 6 søker trygghet og støtte i en usikker verden. De er lojale og pålitelige teamspillere som tenker grundig gjennom risikoer og konsekvenser. De kan være både tillitsfulle og skeptiske, avhengige og selvstendige, alt etter situasjonen og deres sikkerhetsnivå.",

  7: "Type 7 er optimistiske og entusiastiske, alltid på jakt etter nye opplevelser og muligheter. De er spontane og energiske, med evnen til å se positive sider i de fleste situasjoner. De unngår negative følelser og kan ha vanskeligheter med å forplikte seg til én ting om gangen.",

  8: "Type 8 er kraftfulle og selvstendige, drevet av et ønske om å beskytte seg selv og andre. De konfronterer utfordringer direkte og er ikke redde for konflikt. De er naturlige ledere som kjemper for rettferdighet, men kan være altfor intense og kontrollerende.",

  9: "Type 9 søker harmoni og fred i alle aspekter av livet. De er diplomatiske og støttende, med evnen til å se alle sider av en situasjon. De unngår konflikt og kan være ubeslutsomme. De har en tendens til å minimere sine egne behov og kan streve med å ta initiativ."
};

export const ENNEA_TYPE_STRENGTHS: Record<EnneaTypeId, string[]> = {
  1: [
    "Høy integritet og etiske standarder",
    "Organisert og systematisk tilnærming",
    "Øye for detaljer og kvalitet",
    "Ansvarsfull og pålitelig",
    "Motivert til kontinuerlig forbedring"
  ],
  2: [
    "Empatisk og omsorgsgivende",
    "Intuitiv forståelse av andres behov",
    "Generøs med tid og ressurser",
    "Bygger sterke relasjoner",
    "Motiverende og støttende"
  ],
  3: [
    "Målrettet og resultatorientert",
    "Tilpasningsdyktig og fleksibel",
    "Karismatisk og inspirerende",
    "Effektiv og produktiv",
    "Naturlig lederskap"
  ],
  4: [
    "Autentisk og sannferdig",
    "Kreativ og kunstnerisk begavet",
    "Dyp emosjonell intelligens",
    "Unik perspektiv og originalitet",
    "Kapasitet for transformasjon"
  ],
  5: [
    "Analytisk og objektiv tenkemåte",
    "Dybde og kompetanse i interesseområder",
    "Uavhengig og selvhjulpen",
    "Rolig og stabil under press",
    "Innovativ problemløsning"
  ],
  6: [
    "Lojal og pålitelig",
    "Grundig risikoanalyse",
    "Sterkt fellesskapssinn",
    "Ansvarlig og pliktoppfyllende",
    "Evne til å identifisere problemer"
  ],
  7: [
    "Optimistisk og positiv innstilling",
    "Kreativ og idérik",
    "Energisk og entusiastisk",
    "Fleksibel og tilpasningsdyktig",
    "Inspirerende og motiverende"
  ],
  8: [
    "Kraftfull og selvsikker lederskap",
    "Beskytter de svake og sårbare",
    "Direkte og ærlig kommunikasjon",
    "Modig og besluttsom",
    "Rettferdighetssans"
  ],
  9: [
    "Diplomatisk og harmonisørende",
    "Inkluderende og støttende",
    "Stabil og pålitelig",
    "Objektiv og rettferdig",
    "Naturlig medgjerighet"
  ]
};

export const ENNEA_TYPE_CHALLENGES: Record<EnneaTypeId, string[]> = {
  1: [
    "Kan være altfor kritisk og perfeksjonistisk",
    "Vanskeligheter med å slappe av og nyte livet",
    "Irritasjon når standarder ikke møtes",
    "Kan være rigid og ufleksibel",
    "Undertrykker sinne og frustrasjon"
  ],
  2: [
    "Ignorerer egne behov og grenser",
    "Kan bli manipulerende for å få kjærlighet",
    "Overinvolvering i andres problemer",
    "Vanskeligheter med å si nei",
    "Kan bli forbitret hvis ikke verdsatt"
  ],
  3: [
    "Kan bli overfladisk og imagebevisst",
    "Vanskeligheter med å vise sårbarhet",
    "Kan løpe over andre for å oppnå mål",
    "Tap av kontakt med egne følelser",
    "Burn-out fra overarbeid"
  ],
  4: [
    "Kan bli selvopptatt og melankolsk",
    "Overdramatisering av problemer",
    "Misunnelse på andres lykke",
    "Vanskeligheter med hverdagsoppgaver",
    "Kan være stemningsladet og uforutsigbar"
  ],
  5: [
    "Kan bli isolert og tilbakeholden",
    "Vanskeligheter med følelsesmessig intimitet",
    "Kan være gjerrig med tid og energi",
    "Prokrastinering og avoidance",
    "Kan virke kaldt og distansert"
  ],
  6: [
    "Kronisk bekymring og angst",
    "Kan være mistenksom og skeptisk",
    "Vanskeligheter med å stole på egen vurdering",
    "Kan projisere egen angst på andre",
    "Pendling mellom avhengighet og opprør"
  ],
  7: [
    "Vanskeligheter med å fullføre prosjekter",
    "Unngår negative følelser og konflikter",
    "Kan være overfladisk og utålmodig",
    "FOMO (fear of missing out)",
    "Impulsive beslutninger"
  ],
  8: [
    "Kan være altfor kontrollerende og dominerende",
    "Vanskeligheter med å vise sårbarhet",
    "Kan være insensitiv overfor andres følelser",
    "Tilbøyelighet til sinne og konfrontasjon",
    "Kan skremme andre med sin intensitet"
  ],
  9: [
    "Prokrastinering og mangel på initiativ",
    "Vanskeligheter med å ta vanskelige beslutninger",
    "Kan miste seg selv i andres agendaer",
    "Passiv-aggressiv atferd",
    "Minimerer problemer og konflikter"
  ]
};

export const ENNEA_TYPE_GROWTH_PATHS: Record<EnneaTypeId, string[]> = {
  1: [
    "Praktiser selvaksept og mildhet mot deg selv",
    "Lær å slappe av og nyte øyeblikket",
    "Uttrykk sinne på sunne måter",
    "Fokuser på fremgang fremfor perfeksjon",
    "Anerkjenn andres forskjellige tilnærminger"
  ],
  2: [
    "Identifiser og kommuniser dine egne behov",
    "Praktiser selvomsorg uten skyldfølelse",
    "Lær å motta hjelp fra andre",
    "Sett sunne grenser i relasjoner",
    "Utvikle forhold til deg selv uavhengig av andre"
  ],
  3: [
    "Koble deg til dine ekte følelser og verdier",
    "Praktiser sårbarhet og autentisitet",
    "Verdsett prosess like mye som resultater",
    "Ta deg tid til hvile og refleksjon",
    "Bygg dype, meningsfulle relasjoner"
  ],
  4: [
    "Praktiser takknemlighet for det du har",
    "Engasjer deg i praktiske, daglige aktiviteter",
    "Fokuser på det som fungerer i livet ditt",
    "Kanalisér følelser til kreativ uttrykk",
    "Bygg rutinier som gir stabilitet"
  ],
  5: [
    "Praktiser følelsesmessig tilgjjengelighet",
    "Del kunnskap og kompetanse med andre",
    "Ta initiativ til sosiale aktiviteter",
    "Eksperimenter med nye opplevelser",
    "Tillat deg å være sårbar og åpen"
  ],
  6: [
    "Utvikle tillit til din egen vurderingsevne",
    "Praktiser mindfulness for å redusere angst",
    "Ta små risikoer for å bygge selvtillit",
    "Fokuser på fakta fremfor bekymringer",
    "Bygg et nettverk av trygg støtte"
  ],
  7: [
    "Praktiser dybde og tålmodighet",
    "Fullør prosjekter før du starter nye",
    "Opplev og bearbeid negative følelser",
    "Kommitter deg til viktige relasjoner",
    "Praktiser mindfulness og tilstedeværelse"
  ],
  8: [
    "Praktiser sårbarhet og mykere kommunikasjon",
    "Utvikle empati og følsomhet for andre",
    "Lær å dele makt og kontroll",
    "Kanalisér energi til konstruktive formål",
    "Anerkjenn din påvirkning på andre"
  ],
  9: [
    "Identifiser og følg dine egne prioriteter",
    "Ta initiativ uten å vente på perfekte forhold",
    "Konfronter konflikter konstruktivt",
    "Uttrykk din mening og dine behov",
    "Sett og nå personlige mål"
  ]
};

export const ENNEA_TYPE_MOTIVATIONS: Record<EnneaTypeId, string> = {
  1: "Å være god, riktig og perfekt; å forbedre alt omkring seg; å unngå feil og sinne",
  2: "Å føle seg elsket og verdsatt; å uttrykke følelser for andre; å være trengt og verdsatt",
  3: "Å føle seg verdsatt og verdifull; å være beundret; å skille seg ut fra andre",
  4: "Å finne seg selv og sin betydning; å uttrykke sin individualitet; å skape skjønnhet",
  5: "Å være kapabel og kompetent; å forstå verden; å beskytte sin energi og uavhengighet",
  6: "Å ha trygghet og støtte; å teste andres intensjoner; å kjempe mot angst og usikkerhet",
  7: "Å opprettholde lykke og entusiasme; å planlegge stimulerende opplevelser; å unngå smerte",
  8: "Å være selvstyrende og kontrollere sitt eget liv; å beskytte seg selv og andre; å motstå svakhet",
  9: "Å opprettholde indre og ytre fred; å unngå konflikt og spenning; å bevare ting som de er"
};

// TODO: Legg til informasjon om Enneagram-vinger (1w9, 1w2, etc.)
// TODO: Implementer stress- og sikkerhetspiler
// TODO: Legg til kompatibilitet mellom typer
// TODO: Legg til anbefalte bøker og ressurser per type
