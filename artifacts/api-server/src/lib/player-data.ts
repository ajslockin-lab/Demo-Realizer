/**
 * Key player roster data for WC 2026
 * Used to inform the AI goalscorer prediction model.
 * scoringRate = average goals per 90 mins at international level
 */

export interface Player {
  name: string;
  position: string;
  scoringRate: number; // goals per game (international)
  wcGoals: number;     // WC 2026 goals scored so far
  club: string;
}

export const PLAYERS: Record<string, Player[]> = {
  Argentina: [
    { name: "L. Messi",       position: "AM",  scoringRate: 0.68, wcGoals: 2, club: "Inter Miami" },
    { name: "J. Álvarez",     position: "ST",  scoringRate: 0.52, wcGoals: 1, club: "Atlético Madrid" },
    { name: "A. Di María",    position: "LW",  scoringRate: 0.28, wcGoals: 0, club: "Benfica" },
    { name: "Mac Allister",   position: "CM",  scoringRate: 0.18, wcGoals: 0, club: "Liverpool" },
    { name: "N. Molina",      position: "RB",  scoringRate: 0.12, wcGoals: 0, club: "Atlético Madrid" },
  ],
  Austria: [
    { name: "M. Sabitzer",    position: "CM",  scoringRate: 0.28, wcGoals: 1, club: "Borussia Dortmund" },
    { name: "C. Baumgartner", position: "AM",  scoringRate: 0.24, wcGoals: 1, club: "RB Leipzig" },
    { name: "K. Arnautovic",  position: "ST",  scoringRate: 0.38, wcGoals: 1, club: "Inter Milan" },
    { name: "P. Wimmer",      position: "RW",  scoringRate: 0.15, wcGoals: 0, club: "VfB Stuttgart" },
  ],
  France: [
    { name: "K. Mbappé",      position: "ST",  scoringRate: 0.72, wcGoals: 1, club: "Real Madrid" },
    { name: "A. Griezmann",   position: "AM",  scoringRate: 0.45, wcGoals: 1, club: "Atlético Madrid" },
    { name: "O. Giroud",      position: "ST",  scoringRate: 0.38, wcGoals: 1, club: "LA Galaxy" },
    { name: "O. Dembélé",     position: "RW",  scoringRate: 0.22, wcGoals: 0, club: "PSG" },
    { name: "A. Tchouaméni",  position: "CM",  scoringRate: 0.08, wcGoals: 0, club: "Real Madrid" },
  ],
  Iraq: [
    { name: "A. Mohanad",     position: "ST",  scoringRate: 0.32, wcGoals: 1, club: "Al-Quwa Al-Jawiya" },
    { name: "A. Al-Tamimi",   position: "AM",  scoringRate: 0.18, wcGoals: 0, club: "Al-Zawraa" },
    { name: "H. Al-Shatri",   position: "LW",  scoringRate: 0.14, wcGoals: 0, club: "Enppi SC" },
  ],
  Norway: [
    { name: "E. Haaland",     position: "ST",  scoringRate: 1.12, wcGoals: 3, club: "Man City" },
    { name: "M. Ødegaard",    position: "AM",  scoringRate: 0.38, wcGoals: 1, club: "Arsenal" },
    { name: "A. Sörloth",     position: "ST",  scoringRate: 0.42, wcGoals: 0, club: "Atlético Madrid" },
    { name: "A. Larsen Søbakken", position: "RW", scoringRate: 0.20, wcGoals: 0, club: "OGC Nice" },
  ],
  Senegal: [
    { name: "S. Mané",        position: "LW",  scoringRate: 0.52, wcGoals: 1, club: "Al-Nassr" },
    { name: "B. Diallo",      position: "ST",  scoringRate: 0.35, wcGoals: 0, club: "Borussia Dortmund" },
    { name: "I. Sarr",        position: "RW",  scoringRate: 0.28, wcGoals: 0, club: "Marseille" },
    { name: "P.A. Sarr",      position: "AM",  scoringRate: 0.22, wcGoals: 0, club: "Tottenham" },
  ],
  Jordan: [
    { name: "M. Al-Naimat",   position: "ST",  scoringRate: 0.28, wcGoals: 1, club: "Al-Wehdat" },
    { name: "Y. Al-Rawabdeh", position: "AM",  scoringRate: 0.14, wcGoals: 0, club: "Al-Ahly Amman" },
    { name: "M. Al-Deek",     position: "LW",  scoringRate: 0.10, wcGoals: 0, club: "Shabab Al-Urdun" },
  ],
  Algeria: [
    { name: "R. Mahrez",      position: "RW",  scoringRate: 0.38, wcGoals: 0, club: "Al-Ahli" },
    { name: "I. Slimani",     position: "ST",  scoringRate: 0.42, wcGoals: 0, club: "Belouizdad" },
    { name: "I. Benrahma",    position: "AM",  scoringRate: 0.20, wcGoals: 0, club: "Lyon" },
    { name: "B. Bounedjah",   position: "ST",  scoringRate: 0.35, wcGoals: 0, club: "Al-Sadd" },
  ],
  Portugal: [
    { name: "C. Ronaldo",     position: "ST",  scoringRate: 0.68, wcGoals: 1, club: "Al-Nassr" },
    { name: "R. Leão",        position: "LW",  scoringRate: 0.38, wcGoals: 0, club: "AC Milan" },
    { name: "B. Fernandes",   position: "AM",  scoringRate: 0.32, wcGoals: 0, club: "Man United" },
    { name: "J. Félix",       position: "ST",  scoringRate: 0.28, wcGoals: 0, club: "Barcelona" },
    { name: "R. Horta",       position: "RW",  scoringRate: 0.22, wcGoals: 0, club: "Sporting CP" },
  ],
  Uzbekistan: [
    { name: "E. Shomurodov",  position: "ST",  scoringRate: 0.38, wcGoals: 1, club: "Roma" },
    { name: "O. Tursunov",    position: "AM",  scoringRate: 0.20, wcGoals: 0, club: "Lokomotiv Tashkent" },
    { name: "J. Komilov",     position: "LW",  scoringRate: 0.15, wcGoals: 0, club: "Pakhtakor" },
  ],
  England: [
    { name: "H. Kane",        position: "ST",  scoringRate: 0.72, wcGoals: 2, club: "Bayern Munich" },
    { name: "J. Bellingham",  position: "AM",  scoringRate: 0.42, wcGoals: 1, club: "Real Madrid" },
    { name: "B. Saka",        position: "RW",  scoringRate: 0.32, wcGoals: 1, club: "Arsenal" },
    { name: "P. Foden",       position: "LW",  scoringRate: 0.28, wcGoals: 0, club: "Man City" },
    { name: "C. Palmer",      position: "AM",  scoringRate: 0.24, wcGoals: 0, club: "Chelsea" },
  ],
  Ghana: [
    { name: "J. Kudus",       position: "AM",  scoringRate: 0.38, wcGoals: 1, club: "West Ham" },
    { name: "J. Ayew",        position: "ST",  scoringRate: 0.30, wcGoals: 0, club: "Le Havre" },
    { name: "A. Doku",        position: "LW",  scoringRate: 0.22, wcGoals: 0, club: "Man City" },
    { name: "A. Fatawu",      position: "RW",  scoringRate: 0.20, wcGoals: 0, club: "Leicester City" },
  ],
  Panama: [
    { name: "A. Fajardo",     position: "ST",  scoringRate: 0.20, wcGoals: 0, club: "Millonarios" },
    { name: "R. Córdoba",     position: "AM",  scoringRate: 0.15, wcGoals: 0, club: "Olimpia" },
    { name: "C. Davis",       position: "CB",  scoringRate: 0.08, wcGoals: 0, club: "Nashville SC" },
  ],
  Croatia: [
    { name: "L. Modrić",      position: "CM",  scoringRate: 0.18, wcGoals: 0, club: "Real Madrid" },
    { name: "A. Kramarić",    position: "ST",  scoringRate: 0.52, wcGoals: 1, club: "Hoffenheim" },
    { name: "I. Perišić",     position: "LW",  scoringRate: 0.28, wcGoals: 0, club: "Hajduk Split" },
    { name: "M. Brozović",    position: "CM",  scoringRate: 0.12, wcGoals: 0, club: "Atlético Madrid" },
    { name: "B. Sosa",        position: "LB",  scoringRate: 0.10, wcGoals: 0, club: "Atlético Madrid" },
  ],
  Colombia: [
    { name: "J. Rodríguez",   position: "AM",  scoringRate: 0.42, wcGoals: 1, club: "Rayo Vallecano" },
    { name: "L. Díaz",        position: "LW",  scoringRate: 0.32, wcGoals: 1, club: "Liverpool" },
    { name: "R. Falcao",      position: "ST",  scoringRate: 0.55, wcGoals: 1, club: "Millonarios" },
    { name: "C. Cuesta",      position: "CB",  scoringRate: 0.08, wcGoals: 0, club: "Genk" },
  ],
  "DR Congo": [
    { name: "C. Banza",       position: "ST",  scoringRate: 0.40, wcGoals: 1, club: "Brentford" },
    { name: "M. Bope Lobilo", position: "LW",  scoringRate: 0.22, wcGoals: 0, club: "FC Nantes" },
    { name: "A. Kakese",      position: "AM",  scoringRate: 0.15, wcGoals: 0, club: "KAS Eupen" },
  ],
  Switzerland: [
    { name: "B. Embolo",      position: "ST",  scoringRate: 0.40, wcGoals: 2, club: "Monaco" },
    { name: "X. Shaqiri",     position: "AM",  scoringRate: 0.28, wcGoals: 1, club: "Chicago Fire" },
    { name: "R. Vargas",      position: "LW",  scoringRate: 0.22, wcGoals: 1, club: "Nice" },
    { name: "G. Amdouni",     position: "ST",  scoringRate: 0.35, wcGoals: 1, club: "Burnley" },
  ],
  Canada: [
    { name: "A. Davies",      position: "LB",  scoringRate: 0.15, wcGoals: 1, club: "Bayern Munich" },
    { name: "J. David",       position: "ST",  scoringRate: 0.58, wcGoals: 3, club: "LOSC Lille" },
    { name: "C. Buchanan",    position: "LW",  scoringRate: 0.25, wcGoals: 1, club: "Club Brugge" },
    { name: "L. Larin",       position: "ST",  scoringRate: 0.40, wcGoals: 1, club: "Club Brugge" },
    { name: "T. Arfield",     position: "CM",  scoringRate: 0.12, wcGoals: 1, club: "Rangers" },
  ],
  "Bosnia-Herzegovina": [
    { name: "E. Džeko",       position: "ST",  scoringRate: 0.48, wcGoals: 1, club: "Fenerbahçe" },
    { name: "A. Šunjić",      position: "AM",  scoringRate: 0.18, wcGoals: 0, club: "Birmingham City" },
    { name: "E. Ahmedhodzic", position: "CB",  scoringRate: 0.10, wcGoals: 0, club: "Nottingham Forest" },
    { name: "A. Rahmanović",  position: "LW",  scoringRate: 0.15, wcGoals: 0, club: "FK Sarajevo" },
  ],
  Qatar: [
    { name: "A. Afif",        position: "LW",  scoringRate: 0.32, wcGoals: 1, club: "Al-Sadd" },
    { name: "A. Almoez",      position: "ST",  scoringRate: 0.38, wcGoals: 0, club: "Al-Duhail" },
    { name: "H. Al-Haydos",   position: "AM",  scoringRate: 0.20, wcGoals: 0, club: "Al-Sadd" },
  ],
  Scotland: [
    { name: "L. Dykes",       position: "ST",  scoringRate: 0.30, wcGoals: 0, club: "QPR" },
    { name: "J. McGinn",      position: "CM",  scoringRate: 0.18, wcGoals: 0, club: "Aston Villa" },
    { name: "C. McGregor",    position: "CM",  scoringRate: 0.12, wcGoals: 1, club: "Celtic" },
    { name: "S. Nisbet",      position: "LW",  scoringRate: 0.18, wcGoals: 0, club: "Rangers" },
  ],
  Brazil: [
    { name: "Vinícius Jr.",   position: "LW",  scoringRate: 0.55, wcGoals: 2, club: "Real Madrid" },
    { name: "Rodrygo",        position: "RW",  scoringRate: 0.35, wcGoals: 1, club: "Real Madrid" },
    { name: "Raphinha",       position: "RW",  scoringRate: 0.30, wcGoals: 1, club: "Barcelona" },
    { name: "Richarlison",    position: "ST",  scoringRate: 0.42, wcGoals: 0, club: "Tottenham" },
    { name: "Lucas Paquetá",  position: "AM",  scoringRate: 0.20, wcGoals: 0, club: "West Ham" },
  ],
  Morocco: [
    { name: "H. Ziyech",      position: "RW",  scoringRate: 0.28, wcGoals: 0, club: "Galatasaray" },
    { name: "Y. En-Nesyri",   position: "ST",  scoringRate: 0.45, wcGoals: 1, club: "Fenerbahçe" },
    { name: "S. Amrabat",     position: "CM",  scoringRate: 0.05, wcGoals: 0, club: "Fiorentina" },
    { name: "A. Ounahi",      position: "AM",  scoringRate: 0.15, wcGoals: 0, club: "Marseille" },
    { name: "B. Bounou",      position: "GK",  scoringRate: 0.00, wcGoals: 0, club: "Al-Hilal" },
  ],
  Haiti: [
    { name: "K. St-Juste",    position: "CB",  scoringRate: 0.08, wcGoals: 0, club: "Sporting CP" },
    { name: "D. Singelton",   position: "ST",  scoringRate: 0.18, wcGoals: 0, club: "Livingston" },
    { name: "G. Nangis",      position: "LW",  scoringRate: 0.12, wcGoals: 0, club: "Red Star" },
  ],
  Czechia: [
    { name: "P. Schick",      position: "ST",  scoringRate: 0.48, wcGoals: 1, club: "Bayer Leverkusen" },
    { name: "A. Hlozek",      position: "AM",  scoringRate: 0.28, wcGoals: 0, club: "Bayer Leverkusen" },
    { name: "T. Soucek",      position: "CM",  scoringRate: 0.15, wcGoals: 1, club: "West Ham" },
    { name: "V. Cerny",       position: "LW",  scoringRate: 0.18, wcGoals: 0, club: "VfL Wolfsburg" },
  ],
  Mexico: [
    { name: "H. Lozano",      position: "RW",  scoringRate: 0.30, wcGoals: 1, club: "PSV" },
    { name: "R. Jiménez",     position: "ST",  scoringRate: 0.42, wcGoals: 1, club: "Fulham" },
    { name: "A. Vega",        position: "LW",  scoringRate: 0.22, wcGoals: 1, club: "Tigres UANL" },
    { name: "E. Álvarez",     position: "AM",  scoringRate: 0.15, wcGoals: 0, club: "Club América" },
  ],
  "South Africa": [
    { name: "P. Tau",         position: "LW",  scoringRate: 0.25, wcGoals: 0, club: "Al-Ahly" },
    { name: "B. Mothiba",     position: "ST",  scoringRate: 0.28, wcGoals: 0, club: "RC Strasbourg" },
    { name: "E. Dolly",       position: "AM",  scoringRate: 0.15, wcGoals: 1, club: "Kaizer Chiefs" },
    { name: "S. Zwane",       position: "RW",  scoringRate: 0.18, wcGoals: 0, club: "Kaizer Chiefs" },
  ],
  "South Korea": [
    { name: "H. Son",         position: "LW",  scoringRate: 0.48, wcGoals: 1, club: "Tottenham" },
    { name: "H. Hwang",       position: "ST",  scoringRate: 0.35, wcGoals: 1, club: "Wolves" },
    { name: "J. Lee",         position: "CM",  scoringRate: 0.15, wcGoals: 1, club: "Nottingham Forest" },
    { name: "K. Lee",         position: "AM",  scoringRate: 0.18, wcGoals: 0, club: "Bayer Leverkusen" },
  ],
  Ecuador: [
    { name: "E. Valencia",    position: "ST",  scoringRate: 0.42, wcGoals: 0, club: "Independiente" },
    { name: "A. Caicedo",     position: "CM",  scoringRate: 0.12, wcGoals: 0, club: "Chelsea" },
    { name: "J. Plata",       position: "LW",  scoringRate: 0.22, wcGoals: 0, club: "Club América" },
    { name: "G. Cifuentes",   position: "AM",  scoringRate: 0.15, wcGoals: 0, club: "Lyon" },
  ],
  Germany: [
    { name: "K. Havertz",     position: "ST",  scoringRate: 0.42, wcGoals: 3, club: "Arsenal" },
    { name: "F. Wirtz",       position: "AM",  scoringRate: 0.38, wcGoals: 2, club: "Bayer Leverkusen" },
    { name: "L. Gnabry",      position: "RW",  scoringRate: 0.30, wcGoals: 1, club: "Bayern Munich" },
    { name: "T. Müller",      position: "AM",  scoringRate: 0.28, wcGoals: 2, club: "Bayern Munich" },
    { name: "J. Musiala",     position: "LW",  scoringRate: 0.25, wcGoals: 1, club: "Bayern Munich" },
  ],
  Curacao: [
    { name: "G. Lentz",       position: "ST",  scoringRate: 0.20, wcGoals: 1, club: "Beerschot" },
    { name: "K. Rijssel",     position: "AM",  scoringRate: 0.12, wcGoals: 0, club: "Jong Ajax" },
    { name: "B. Royer",       position: "LW",  scoringRate: 0.10, wcGoals: 0, club: "Hobocken" },
  ],
  "Ivory Coast": [
    { name: "S. Haller",      position: "ST",  scoringRate: 0.50, wcGoals: 1, club: "Borussia Dortmund" },
    { name: "F. Kessie",      position: "CM",  scoringRate: 0.15, wcGoals: 0, club: "Al-Ahli" },
    { name: "N. Pépé",        position: "RW",  scoringRate: 0.25, wcGoals: 0, club: "Trabzonspor" },
    { name: "S. Fofana",      position: "CM",  scoringRate: 0.12, wcGoals: 0, club: "Real Madrid" },
    { name: "W. Zaha",        position: "LW",  scoringRate: 0.20, wcGoals: 1, club: "Galatasaray" },
  ],
  Japan: [
    { name: "D. Ito",         position: "LW",  scoringRate: 0.32, wcGoals: 2, club: "Stuttgart" },
    { name: "T. Minamino",    position: "AM",  scoringRate: 0.28, wcGoals: 2, club: "Monaco" },
    { name: "H. Furuhashi",   position: "ST",  scoringRate: 0.30, wcGoals: 1, club: "Celtic" },
    { name: "R. Doan",        position: "RW",  scoringRate: 0.22, wcGoals: 1, club: "Freiburg" },
    { name: "K. Mitoma",      position: "LW",  scoringRate: 0.25, wcGoals: 0, club: "Brighton" },
  ],
  Sweden: [
    { name: "V. Gyökeres",    position: "ST",  scoringRate: 0.68, wcGoals: 3, club: "Sporting CP" },
    { name: "A. Isak",        position: "ST",  scoringRate: 0.52, wcGoals: 2, club: "Newcastle" },
    { name: "E. Forsberg",    position: "AM",  scoringRate: 0.25, wcGoals: 1, club: "RB Leipzig" },
    { name: "D. Kulusevski",  position: "RW",  scoringRate: 0.22, wcGoals: 0, club: "Tottenham" },
  ],
  Tunisia: [
    { name: "H. Msakni",      position: "AM",  scoringRate: 0.22, wcGoals: 0, club: "Al-Ahli Jeddah" },
    { name: "F. Ben Yedder",  position: "ST",  scoringRate: 0.40, wcGoals: 1, club: "Paris FC" },
    { name: "N. Bronn",       position: "CB",  scoringRate: 0.05, wcGoals: 0, club: "Al-Ahly" },
  ],
  Netherlands: [
    { name: "V. van Dijk",    position: "CB",  scoringRate: 0.12, wcGoals: 0, club: "Liverpool" },
    { name: "C. Gakpo",       position: "LW",  scoringRate: 0.42, wcGoals: 2, club: "Liverpool" },
    { name: "M. Depay",       position: "ST",  scoringRate: 0.45, wcGoals: 3, club: "Corinthians" },
    { name: "X. Simons",      position: "AM",  scoringRate: 0.25, wcGoals: 1, club: "Paris SG" },
    { name: "S. Bergwijn",    position: "RW",  scoringRate: 0.22, wcGoals: 1, club: "Ajax" },
  ],
  Turkey: [
    { name: "B. Yilmaz",      position: "ST",  scoringRate: 0.38, wcGoals: 0, club: "Trabzonspor" },
    { name: "H. Çalhanoğlu",  position: "CM",  scoringRate: 0.22, wcGoals: 0, club: "Inter Milan" },
    { name: "K. Aktürkoğlu",  position: "LW",  scoringRate: 0.20, wcGoals: 0, club: "Benfica" },
    { name: "A. Yildiz",      position: "AM",  scoringRate: 0.28, wcGoals: 0, club: "Juventus" },
  ],
  USA: [
    { name: "C. Pulisic",     position: "AM",  scoringRate: 0.35, wcGoals: 2, club: "AC Milan" },
    { name: "G. Reyna",       position: "AM",  scoringRate: 0.22, wcGoals: 1, club: "Borussia Dortmund" },
    { name: "T. Weah",        position: "RW",  scoringRate: 0.20, wcGoals: 1, club: "Juventus" },
    { name: "J. Morris",      position: "ST",  scoringRate: 0.28, wcGoals: 1, club: "Seattle Sounders" },
    { name: "F. Aaronson",    position: "LW",  scoringRate: 0.15, wcGoals: 1, club: "Union Berlin" },
  ],
  Paraguay: [
    { name: "M. Almiron",     position: "AM",  scoringRate: 0.22, wcGoals: 1, club: "Newcastle" },
    { name: "R. Sanabria",    position: "ST",  scoringRate: 0.35, wcGoals: 1, club: "Torino" },
    { name: "A. Enciso",      position: "LW",  scoringRate: 0.18, wcGoals: 0, club: "Brighton" },
  ],
  Australia: [
    { name: "M. Leckie",      position: "RW",  scoringRate: 0.18, wcGoals: 1, club: "Melbourne City" },
    { name: "M. Goodwin",     position: "ST",  scoringRate: 0.28, wcGoals: 1, club: "Leicester City" },
    { name: "A. Hrustic",     position: "AM",  scoringRate: 0.15, wcGoals: 0, club: "Hellas Verona" },
    { name: "J. Irvine",      position: "CM",  scoringRate: 0.10, wcGoals: 0, club: "Burnley" },
  ],
  Spain: [
    { name: "A. Morata",      position: "ST",  scoringRate: 0.40, wcGoals: 1, club: "Atlético Madrid" },
    { name: "L. Yamal",       position: "RW",  scoringRate: 0.32, wcGoals: 1, club: "Barcelona" },
    { name: "P. Pedri",       position: "CM",  scoringRate: 0.20, wcGoals: 1, club: "Barcelona" },
    { name: "D. Olmo",        position: "AM",  scoringRate: 0.25, wcGoals: 0, club: "RB Leipzig" },
    { name: "F. Torres",      position: "ST",  scoringRate: 0.35, wcGoals: 1, club: "Barcelona" },
  ],
  Uruguay: [
    { name: "L. Suárez",      position: "ST",  scoringRate: 0.52, wcGoals: 1, club: "Nacional" },
    { name: "D. Núñez",       position: "ST",  scoringRate: 0.45, wcGoals: 1, club: "Liverpool" },
    { name: "F. Valverde",    position: "CM",  scoringRate: 0.18, wcGoals: 1, club: "Real Madrid" },
    { name: "R. Bentancur",   position: "CM",  scoringRate: 0.10, wcGoals: 0, club: "Tottenham" },
  ],
  "Saudi Arabia": [
    { name: "S. Al-Dawsari",  position: "LW",  scoringRate: 0.30, wcGoals: 0, club: "Al-Hilal" },
    { name: "M. Al-Burayk",   position: "LB",  scoringRate: 0.08, wcGoals: 0, club: "Al-Hilal" },
    { name: "F. Al-Muwallad", position: "RW",  scoringRate: 0.20, wcGoals: 1, club: "Al-Hilal" },
  ],
  "Cabo Verde": [
    { name: "R. Tavares",     position: "AM",  scoringRate: 0.18, wcGoals: 1, club: "Udinese" },
    { name: "E. Andrade",     position: "ST",  scoringRate: 0.25, wcGoals: 1, club: "Vitória Guimarães" },
    { name: "J. Lopes",       position: "LW",  scoringRate: 0.12, wcGoals: 0, club: "Arouca" },
  ],
  Egypt: [
    { name: "M. Salah",       position: "RW",  scoringRate: 0.58, wcGoals: 2, club: "Liverpool" },
    { name: "O. Marmoush",    position: "ST",  scoringRate: 0.45, wcGoals: 1, club: "Man City" },
    { name: "T. Hamdi",       position: "LW",  scoringRate: 0.22, wcGoals: 0, club: "Hatayspor" },
    { name: "Nasser Maher",   position: "CM",  scoringRate: 0.12, wcGoals: 1, club: "Zamalek" },
  ],
  Iran: [
    { name: "S. Azmoun",      position: "ST",  scoringRate: 0.48, wcGoals: 1, club: "AS Roma" },
    { name: "M. Taremi",      position: "ST",  scoringRate: 0.45, wcGoals: 2, club: "Inter Milan" },
    { name: "A. Hajsafi",     position: "LB",  scoringRate: 0.08, wcGoals: 0, club: "AEK Athens" },
    { name: "A. Jahanbakhsh", position: "RW",  scoringRate: 0.22, wcGoals: 0, club: "Brighton" },
  ],
  "New Zealand": [
    { name: "C. Wood",        position: "ST",  scoringRate: 0.38, wcGoals: 2, club: "Newcastle" },
    { name: "B. Rufer",       position: "LW",  scoringRate: 0.22, wcGoals: 1, club: "Werder Bremen" },
    { name: "M. Cacace",      position: "LB",  scoringRate: 0.08, wcGoals: 0, club: "Empoli" },
  ],
  Belgium: [
    { name: "R. Lukaku",      position: "ST",  scoringRate: 0.55, wcGoals: 1, club: "Roma" },
    { name: "K. De Bruyne",   position: "CM",  scoringRate: 0.22, wcGoals: 1, club: "Man City" },
    { name: "E. Hazard",      position: "LW",  scoringRate: 0.28, wcGoals: 0, club: "Retirement" },
    { name: "J. Doku",        position: "LW",  scoringRate: 0.20, wcGoals: 0, club: "Man City" },
    { name: "L. Trossard",    position: "AM",  scoringRate: 0.18, wcGoals: 0, club: "Arsenal" },
  ],
};

export function getPlayersForTeam(team: string): Player[] {
  return PLAYERS[team] ?? [];
}
