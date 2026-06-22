export interface TeamMeta {
  flag: string;
  rank: number;
  form: string;
}

export const teams: Record<string, TeamMeta> = {
  "Argentina":           { flag:"🇦🇷", rank:2,   form:"WWWWW" },
  "Austria":             { flag:"🇦🇹", rank:25,  form:"WWWWL" },
  "France":              { flag:"🇫🇷", rank:3,   form:"WWWWW" },
  "Iraq":                { flag:"🇮🇶", rank:80,  form:"LLWLL" },
  "Norway":              { flag:"🇳🇴", rank:11,  form:"WWWLW" },
  "Senegal":             { flag:"🇸🇳", rank:20,  form:"LWWDL" },
  "Jordan":              { flag:"🇯🇴", rank:87,  form:"WLLLL" },
  "Algeria":             { flag:"🇩🇿", rank:32,  form:"LWWLL" },
  "Portugal":            { flag:"🇵🇹", rank:6,   form:"WWDWW" },
  "Uzbekistan":          { flag:"🇺🇿", rank:74,  form:"LWDLL" },
  "England":             { flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", rank:4,   form:"WWWWW" },
  "Ghana":               { flag:"🇬🇭", rank:60,  form:"WLWDW" },
  "Panama":              { flag:"🇵🇦", rank:72,  form:"LWLLL" },
  "Croatia":             { flag:"🇭🇷", rank:10,  form:"WDWLL" },
  "Colombia":            { flag:"🇨🇴", rank:12,  form:"WWWWW" },
  "DR Congo":            { flag:"🇨🇩", rank:56,  form:"WDLLW" },
  "Switzerland":         { flag:"🇨🇭", rank:19,  form:"WDWDW" },
  "Canada":              { flag:"🇨🇦", rank:39,  form:"DWWWW" },
  "Bosnia-Herzegovina":  { flag:"🇧🇦", rank:55,  form:"LDLLL" },
  "Qatar":               { flag:"🇶🇦", rank:60,  form:"DLLLL" },
  "Scotland":            { flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", rank:38,  form:"WDWDL" },
  "Brazil":              { flag:"🇧🇷", rank:5,   form:"WWWWW" },
  "Morocco":             { flag:"🇲🇦", rank:14,  form:"WWWWW" },
  "Haiti":               { flag:"🇭🇹", rank:95,  form:"LLWLL" },
  "Czechia":             { flag:"🇨🇿", rank:35,  form:"WDWLL" },
  "Mexico":              { flag:"🇲🇽", rank:15,  form:"WWWWW" },
  "South Africa":        { flag:"🇿🇦", rank:68,  form:"LDWLL" },
  "South Korea":         { flag:"🇰🇷", rank:23,  form:"WWLWW" },
  "Ecuador":             { flag:"🇪🇨", rank:46,  form:"LLDLL" },
  "Germany":             { flag:"🇩🇪", rank:13,  form:"WWWWW" },
  "Curacao":             { flag:"🇨🇼", rank:99,  form:"DLLLL" },
  "Ivory Coast":         { flag:"🇨🇮", rank:47,  form:"WLLLL" },
  "Japan":               { flag:"🇯🇵", rank:19,  form:"DDWWW" },
  "Sweden":              { flag:"🇸🇪", rank:30,  form:"WDLLW" },
  "Tunisia":             { flag:"🇹🇳", rank:51,  form:"LLLLL" },
  "Netherlands":         { flag:"🇳🇱", rank:7,   form:"DWWWW" },
  "Turkey":              { flag:"🇹🇷", rank:36,  form:"LLLLL" },
  "USA":                 { flag:"🇺🇸", rank:14,  form:"WWWWW" },
  "Paraguay":            { flag:"🇵🇾", rank:63,  form:"LWWLL" },
  "Australia":           { flag:"🇦🇺", rank:23,  form:"WWLWW" },
  "Spain":               { flag:"🇪🇸", rank:1,   form:"DWWWW" },
  "Uruguay":             { flag:"🇺🇾", rank:18,  form:"DDDLW" },
  "Saudi Arabia":        { flag:"🇸🇦", rank:56,  form:"DLLLL" },
  "Cabo Verde":          { flag:"🇨🇻", rank:76,  form:"DWDLL" },
  "Egypt":               { flag:"🇪🇬", rank:45,  form:"WDDWW" },
  "Iran":                { flag:"🇮🇷", rank:25,  form:"DDLWL" },
  "New Zealand":         { flag:"🇳🇿", rank:101, form:"DLLLL" },
  "Belgium":             { flag:"🇧🇪", rank:4,   form:"DDDWW" },
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
  { id:"m1",  date:"Jun 22", home:"Argentina",          away:"Austria",         group:"J", venue:"AT&T Stadium, Arlington TX",     time:"1:00 PM ET" },
  { id:"m2",  date:"Jun 22", home:"France",             away:"Iraq",            group:"I", venue:"Lincoln Financial, Philadelphia", time:"5:00 PM ET" },
  { id:"m3",  date:"Jun 22", home:"Norway",             away:"Senegal",         group:"I", venue:"MetLife, East Rutherford NJ",    time:"8:00 PM ET" },
  { id:"m4",  date:"Jun 22", home:"Jordan",             away:"Algeria",         group:"J", venue:"Levi's Stadium, San Francisco",  time:"11:00 PM ET" },
  { id:"m5",  date:"Jun 23", home:"Portugal",           away:"Uzbekistan",      group:"K", venue:"NRG Stadium, Houston TX",        time:"1:00 PM ET" },
  { id:"m6",  date:"Jun 23", home:"England",            away:"Ghana",           group:"L", venue:"Gillette Stadium, Foxborough MA",time:"4:00 PM ET" },
  { id:"m7",  date:"Jun 23", home:"Panama",             away:"Croatia",         group:"L", venue:"BMO Field, Toronto",             time:"7:00 PM ET" },
  { id:"m8",  date:"Jun 23", home:"Colombia",           away:"DR Congo",        group:"K", venue:"Estadio Akron, Guadalajara",     time:"10:00 PM ET" },
  { id:"m9",  date:"Jun 24", home:"Switzerland",        away:"Canada",          group:"B", venue:"BC Place, Vancouver",            time:"3:00 PM ET" },
  { id:"m10", date:"Jun 24", home:"Bosnia-Herzegovina", away:"Qatar",           group:"B", venue:"Lumen Field, Seattle",           time:"3:00 PM ET" },
  { id:"m11", date:"Jun 24", home:"Scotland",           away:"Brazil",          group:"C", venue:"Hard Rock Stadium, Miami",       time:"6:00 PM ET" },
  { id:"m12", date:"Jun 24", home:"Morocco",            away:"Haiti",           group:"C", venue:"Mercedes-Benz Stadium, Atlanta", time:"6:00 PM ET" },
  { id:"m13", date:"Jun 24", home:"Czechia",            away:"Mexico",          group:"A", venue:"Estadio Azteca, Mexico City",    time:"9:00 PM ET" },
  { id:"m14", date:"Jun 24", home:"South Africa",       away:"South Korea",     group:"A", venue:"Estadio Akron, Guadalajara",     time:"9:00 PM ET" },
  { id:"m15", date:"Jun 25", home:"Ecuador",            away:"Germany",         group:"E", venue:"Lincoln Financial, Philadelphia",time:"4:00 PM ET" },
  { id:"m16", date:"Jun 25", home:"Curacao",            away:"Ivory Coast",     group:"E", venue:"Arrowhead Stadium, Kansas City", time:"4:00 PM ET" },
  { id:"m17", date:"Jun 25", home:"Japan",              away:"Sweden",          group:"F", venue:"AT&T Stadium, Arlington TX",     time:"7:00 PM ET" },
  { id:"m18", date:"Jun 25", home:"Tunisia",            away:"Netherlands",     group:"F", venue:"Estadio BBVA, Monterrey",        time:"7:00 PM ET" },
  { id:"m19", date:"Jun 25", home:"Turkey",             away:"USA",             group:"D", venue:"SoFi Stadium, Los Angeles",      time:"10:00 PM ET" },
  { id:"m20", date:"Jun 25", home:"Paraguay",           away:"Australia",       group:"D", venue:"Levi's Stadium, San Francisco",  time:"10:00 PM ET" },
  { id:"m21", date:"Jun 26", home:"Norway",             away:"France",          group:"I", venue:"Gillette Stadium, Foxborough MA",time:"3:00 PM ET" },
  { id:"m22", date:"Jun 26", home:"Senegal",            away:"Iraq",            group:"I", venue:"BMO Field, Toronto",             time:"3:00 PM ET" },
  { id:"m23", date:"Jun 26", home:"Cabo Verde",         away:"Saudi Arabia",    group:"H", venue:"NRG Stadium, Houston TX",        time:"8:00 PM ET" },
  { id:"m24", date:"Jun 26", home:"Uruguay",            away:"Spain",           group:"H", venue:"Estadio Akron, Guadalajara",     time:"8:00 PM ET" },
  { id:"m25", date:"Jun 26", home:"Egypt",              away:"Iran",            group:"G", venue:"Lumen Field, Seattle",           time:"11:00 PM ET" },
  { id:"m26", date:"Jun 26", home:"New Zealand",        away:"Belgium",         group:"G", venue:"BC Place, Vancouver",            time:"11:00 PM ET" },
  { id:"m27", date:"Jun 27", home:"Panama",             away:"England",         group:"L", venue:"MetLife, East Rutherford NJ",    time:"5:00 PM ET" },
  { id:"m28", date:"Jun 27", home:"Croatia",            away:"Ghana",           group:"L", venue:"Lincoln Financial, Philadelphia",time:"5:00 PM ET" },
  { id:"m29", date:"Jun 27", home:"Colombia",           away:"Portugal",        group:"K", venue:"Hard Rock Stadium, Miami",       time:"7:30 PM ET" },
  { id:"m30", date:"Jun 27", home:"DR Congo",           away:"Uzbekistan",      group:"K", venue:"Mercedes-Benz Stadium, Atlanta", time:"7:30 PM ET" },
  { id:"m31", date:"Jun 27", home:"Jordan",             away:"Argentina",       group:"J", venue:"AT&T Stadium, Arlington TX",     time:"10:00 PM ET" },
  { id:"m32", date:"Jun 27", home:"Algeria",            away:"Austria",         group:"J", venue:"Arrowhead Stadium, Kansas City", time:"10:00 PM ET" },
];

export const DAYS = ["Jun 22", "Jun 23", "Jun 24", "Jun 25", "Jun 26", "Jun 27"];

export const standings = {
  A: [{ team:"Mexico",pts:6 }, { team:"South Korea",pts:3 }, { team:"Czechia",pts:1 }, { team:"South Africa",pts:1 }],
  B: [{ team:"Canada",pts:4 }, { team:"Switzerland",pts:4 }, { team:"Bosnia-Herzegovina",pts:1 }, { team:"Qatar",pts:1 }],
  C: [{ team:"Brazil",pts:4 }, { team:"Morocco",pts:4 }, { team:"Scotland",pts:3 }, { team:"Haiti",pts:0 }],
  D: [{ team:"USA",pts:6 }, { team:"Australia",pts:3 }, { team:"Paraguay",pts:3 }, { team:"Turkey",pts:0 }],
  E: [{ team:"Germany",pts:6 }, { team:"Ivory Coast",pts:3 }, { team:"Ecuador",pts:1 }, { team:"Curacao",pts:1 }],
  F: [{ team:"Netherlands",pts:4 }, { team:"Japan",pts:4 }, { team:"Sweden",pts:3 }, { team:"Tunisia",pts:0 }],
  G: [{ team:"Egypt",pts:4 }, { team:"Iran",pts:2 }, { team:"Belgium",pts:2 }, { team:"New Zealand",pts:1 }],
  H: [{ team:"Spain",pts:4 }, { team:"Uruguay",pts:2 }, { team:"Cabo Verde",pts:2 }, { team:"Saudi Arabia",pts:1 }],
  I: [{ team:"France",pts:3 }, { team:"Norway",pts:3 }, { team:"Senegal",pts:0 }, { team:"Iraq",pts:0 }],
  J: [{ team:"Argentina",pts:3 }, { team:"Austria",pts:3 }, { team:"Algeria",pts:0 }, { team:"Jordan",pts:0 }],
  K: [{ team:"Colombia",pts:3 }, { team:"Portugal",pts:1 }, { team:"DR Congo",pts:1 }, { team:"Uzbekistan",pts:0 }],
  L: [{ team:"England",pts:3 }, { team:"Ghana",pts:3 }, { team:"Croatia",pts:0 }, { team:"Panama",pts:0 }],
};
