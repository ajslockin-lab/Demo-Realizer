export type TeamData = [string, number, string, number, number]; // [flag, FIFA rank, last5form, WC_GF, WC_GA]

export const teams: Record<string, TeamData> = {
  "Argentina":["🇦🇷",2,"WWWWW",7,0], "Austria":["🇦🇹",25,"WWWWL",4,2], "France":["🇫🇷",3,"WWWWW",6,1],
  "Iraq":["🇮🇶",80,"LLWLL",1,4], "Norway":["🇳🇴",11,"WWWLW",5,2], "Senegal":["🇸🇳",20,"LWWDL",1,3],
  "Jordan":["🇯🇴",87,"WLLLL",1,3], "Algeria":["🇩🇿",32,"LWWLL",0,3], "Portugal":["🇵🇹",6,"WWDWW",5,2],
  "Uzbekistan":["🇺🇿",74,"LWDLL",1,3], "England":["🏴󠁧󠁢󠁥󠁮󠁧󠁿",4,"WWWWW",8,3], "Ghana":["🇬🇭",60,"WLWDW",3,1],
  "Panama":["🇵🇦",72,"LWLLL",0,1], "Croatia":["🇭🇷",10,"WDWLL",2,4], "Colombia":["🇨🇴",12,"WWWWW",4,2],
  "DR Congo":["🇨🇩",56,"WDLLW",2,4], "Switzerland":["🇨🇭",19,"WDWDW",5,2], "Canada":["🇨🇦",39,"DWWWW",7,1],
  "Bosnia-Herzegovina":["🇧🇦",55,"LDLLL",2,5], "Qatar":["🇶🇦",60,"DLLLL",1,7], "Scotland":["🏴󠁧󠁢󠁳󠁣󠁴󠁿",38,"WDWDL",1,1],
  "Brazil":["🇧🇷",5,"WWWWW",5,1], "Morocco":["🇲🇦",14,"WWWWW",3,1], "Haiti":["🇭🇹",95,"LLWLL",0,4],
  "Czechia":["🇨🇿",35,"WDWLL",2,3], "Mexico":["🇲🇽",15,"WWWWW",3,0], "South Africa":["🇿🇦",68,"LDWLL",1,3],
  "South Korea":["🇰🇷",23,"WWLWW",3,2], "Ecuador":["🇪🇨",46,"LLDLL",0,1], "Germany":["🇩🇪",13,"WWWWW",9,2],
  "Curacao":["🇨🇼",99,"DLLLL",1,7], "Ivory Coast":["🇨🇮",47,"WLLLL",2,3], "Japan":["🇯🇵",19,"DDWWW",6,2],
  "Sweden":["🇸🇪",30,"WDLLW",6,6], "Tunisia":["🇹🇳",51,"LLLLL",1,9], "Netherlands":["🇳🇱",7,"DWWWW",7,2],
  "Turkey":["🇹🇷",36,"LLLLL",0,4], "USA":["🇺🇸",14,"WWWWW",6,1], "Paraguay":["🇵🇾",63,"LWWLL",2,4],
  "Australia":["🇦🇺",23,"WWLWW",2,1], "Spain":["🇪🇸",1,"DWWWW",4,0], "Uruguay":["🇺🇾",18,"DDDLW",3,3],
  "Saudi Arabia":["🇸🇦",56,"DLLLL",1,5], "Cabo Verde":["🇨🇻",76,"DWDLL",2,3], "Egypt":["🇪🇬",45,"WDDWW",4,2],
  "Iran":["🇮🇷",25,"DDLWL",3,3], "New Zealand":["🇳🇿",101,"DLLLL",3,5], "Belgium":["🇧🇪",4,"DDDWW",2,2]
};

export interface Match {
  id: string;
  date: string;
  home: string;
  away: string;
  group: string;
  venue: string;
  time: string;
}

export const matches: Match[] = [
  { id: "m1", date: "Jun 22", home: "Argentina", away: "Austria", group: "J", venue: "AT&T Stadium Arlington TX", time: "1:00 PM ET" },
  { id: "m2", date: "Jun 22", home: "France", away: "Iraq", group: "I", venue: "Lincoln Financial", time: "5 PM ET" },
  { id: "m3", date: "Jun 22", home: "Norway", away: "Senegal", group: "I", venue: "MetLife", time: "8 PM ET" },
  { id: "m4", date: "Jun 22", home: "Jordan", away: "Algeria", group: "J", venue: "Levi's", time: "11 PM ET" },
  { id: "m5", date: "Jun 23", home: "Portugal", away: "Uzbekistan", group: "K", venue: "NRG Houston", time: "1 PM ET" },
  { id: "m6", date: "Jun 23", home: "England", away: "Ghana", group: "L", venue: "Gillette MA", time: "4 PM ET" },
  { id: "m7", date: "Jun 23", home: "Panama", away: "Croatia", group: "L", venue: "BMO Toronto", time: "7 PM ET" },
  { id: "m8", date: "Jun 23", home: "Colombia", away: "DR Congo", group: "K", venue: "Estadio Akron", time: "10 PM ET" },
  { id: "m9", date: "Jun 24", home: "Switzerland", away: "Canada", group: "B", venue: "BC Place", time: "3 PM ET" },
  { id: "m10", date: "Jun 24", home: "Bosnia-Herzegovina", away: "Qatar", group: "B", venue: "Lumen Field", time: "3 PM ET" },
  { id: "m11", date: "Jun 24", home: "Scotland", away: "Brazil", group: "C", venue: "Hard Rock Miami", time: "6 PM ET" },
  { id: "m12", date: "Jun 24", home: "Morocco", away: "Haiti", group: "C", venue: "Mercedes-Benz Atlanta", time: "6 PM ET" },
  { id: "m13", date: "Jun 24", home: "Czechia", away: "Mexico", group: "A", venue: "Estadio Azteca", time: "9 PM ET" },
  { id: "m14", date: "Jun 24", home: "South Africa", away: "South Korea", group: "A", venue: "Estadio Akron", time: "9 PM ET" },
  { id: "m15", date: "Jun 25", home: "Ecuador", away: "Germany", group: "E", venue: "Lincoln Financial", time: "4 PM ET" },
  { id: "m16", date: "Jun 25", home: "Curacao", away: "Ivory Coast", group: "E", venue: "Arrowhead KC", time: "4 PM ET" },
  { id: "m17", date: "Jun 25", home: "Japan", away: "Sweden", group: "F", venue: "AT&T Stadium", time: "7 PM ET" },
  { id: "m18", date: "Jun 25", home: "Tunisia", away: "Netherlands", group: "F", venue: "Estadio BBVA Monterrey", time: "7 PM ET" },
  { id: "m19", date: "Jun 25", home: "Turkey", away: "USA", group: "D", venue: "SoFi Stadium", time: "10 PM ET" },
  { id: "m20", date: "Jun 25", home: "Paraguay", away: "Australia", group: "D", venue: "Levi's SF", time: "10 PM ET" },
  { id: "m21", date: "Jun 26", home: "Norway", away: "France", group: "I", venue: "Gillette Boston", time: "3 PM ET" },
  { id: "m22", date: "Jun 26", home: "Senegal", away: "Iraq", group: "I", venue: "BMO Toronto", time: "3 PM ET" },
  { id: "m23", date: "Jun 26", home: "Cabo Verde", away: "Saudi Arabia", group: "H", venue: "NRG Houston", time: "8 PM ET" },
  { id: "m24", date: "Jun 26", home: "Uruguay", away: "Spain", group: "H", venue: "Estadio Akron", time: "8 PM ET" },
  { id: "m25", date: "Jun 26", home: "Egypt", away: "Iran", group: "G", venue: "Lumen Field", time: "11 PM ET" },
  { id: "m26", date: "Jun 26", home: "New Zealand", away: "Belgium", group: "G", venue: "BC Place", time: "11 PM ET" },
  { id: "m27", date: "Jun 27", home: "Panama", away: "England", group: "L", venue: "MetLife", time: "5 PM ET" },
  { id: "m28", date: "Jun 27", home: "Croatia", away: "Ghana", group: "L", venue: "Lincoln Financial", time: "5 PM ET" },
  { id: "m29", date: "Jun 27", home: "Colombia", away: "Portugal", group: "K", venue: "Hard Rock Miami", time: "7:30 PM ET" },
  { id: "m30", date: "Jun 27", home: "DR Congo", away: "Uzbekistan", group: "K", venue: "Mercedes-Benz Atlanta", time: "7:30 PM ET" },
  { id: "m31", date: "Jun 27", home: "Jordan", away: "Argentina", group: "J", venue: "AT&T Stadium", time: "10 PM ET" },
  { id: "m32", date: "Jun 27", home: "Algeria", away: "Austria", group: "J", venue: "Arrowhead KC", time: "10 PM ET" },
];

export const standings = {
  A: [ { team: "Mexico", pts: 6, text: "2W" }, { team: "South Korea", pts: 3, text: "1W" }, { team: "Czechia", pts: 1, text: "" }, { team: "South Africa", pts: 1, text: "" } ],
  B: [ { team: "Canada", pts: 4, text: "" }, { team: "Switzerland", pts: 4, text: "" }, { team: "Bosnia-Herzegovina", pts: 1, text: "" }, { team: "Qatar", pts: 1, text: "" } ],
  C: [ { team: "Brazil", pts: 4, text: "" }, { team: "Morocco", pts: 4, text: "" }, { team: "Scotland", pts: 3, text: "" }, { team: "Haiti", pts: 0, text: "" } ],
  D: [ { team: "USA", pts: 6, text: "2W" }, { team: "Australia", pts: 3, text: "" }, { team: "Paraguay", pts: 3, text: "" }, { team: "Turkey", pts: 0, text: "" } ],
  E: [ { team: "Germany", pts: 6, text: "2W" }, { team: "Ivory Coast", pts: 3, text: "" }, { team: "Ecuador", pts: 1, text: "" }, { team: "Curacao", pts: 1, text: "" } ],
  F: [ { team: "Netherlands", pts: 4, text: "" }, { team: "Japan", pts: 4, text: "" }, { team: "Sweden", pts: 3, text: "" }, { team: "Tunisia", pts: 0, text: "" } ],
  G: [ { team: "Egypt", pts: 4, text: "" }, { team: "Iran", pts: 2, text: "" }, { team: "Belgium", pts: 2, text: "" }, { team: "New Zealand", pts: 1, text: "" } ],
  H: [ { team: "Spain", pts: 4, text: "" }, { team: "Uruguay", pts: 2, text: "" }, { team: "Cabo Verde", pts: 2, text: "" }, { team: "Saudi Arabia", pts: 1, text: "" } ],
  I: [ { team: "France", pts: 3, text: "1played" }, { team: "Norway", pts: 3, text: "1played" }, { team: "Senegal", pts: 0, text: "1played" }, { team: "Iraq", pts: 0, text: "1played" } ],
  J: [ { team: "Argentina", pts: 3, text: "1played" }, { team: "Austria", pts: 3, text: "1played" }, { team: "Algeria", pts: 0, text: "1played" }, { team: "Jordan", pts: 0, text: "1played" } ],
  K: [ { team: "Colombia", pts: 3, text: "1played" }, { team: "Portugal", pts: 1, text: "1played" }, { team: "DR Congo", pts: 1, text: "1played" }, { team: "Uzbekistan", pts: 0, text: "1played" } ],
  L: [ { team: "England", pts: 3, text: "1played" }, { team: "Ghana", pts: 3, text: "1played" }, { team: "Croatia", pts: 0, text: "1played" }, { team: "Panama", pts: 0, text: "1played" } ]
};
