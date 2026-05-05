export type Song = {
  title: string;
  performer: string;
  role?: string;
  lyrics: string;
};

export type ProgramItem =
  | { kind: "moment"; time?: string; title: string; description?: string }
  | { kind: "session"; number: number; title: string; songs: Song[] };

const placeholderLyrics = (title: string) =>
  `[ ${title} ]\n\nየዘፈኑ ግጥም በቅርቡ ይታከላል።\nLyrics will be added soon — please follow along with the worship leader.`;

export const program: ProgramItem[] = [
  {
    kind: "moment",
    time: "12:00",
    title: "የጸሎት ጊዜ · Opening Prayer",
    description: "የምሽቱን አምልኮ በጸሎት እንጀምራለን።",
  },
  {
    kind: "session",
    number: 1,
    title: "Session One",
    songs: [
      { title: "ምንም ቢሆን", performer: "Nardos Abebe", role: "Lead Singer", lyrics: placeholderLyrics("ምንም ቢሆን") },
      { title: "ጉዞ", performer: "Melat Biniyam", role: "Lead Singer", lyrics: placeholderLyrics("ጉዞ") },
      { title: "ፍቅር ማለት እንደአንተ ነዉ", performer: "Yeabsira", role: "Lead Singer", lyrics: placeholderLyrics("ፍቅር ማለት እንደአንተ ነዉ") },
    ],
  },
  {
    kind: "moment",
    title: "Announcements · ማስታወቂያ",
    description: "አጭር የማስታወቂያ ጊዜ።",
  },
  {
    kind: "session",
    number: 2,
    title: "Session Two",
    songs: [
      { title: "ሕይወት አግኝቻለሁ", performer: "Isayas", role: "Choir · Lead Singer", lyrics: placeholderLyrics("ሕይወት አግኝቻለሁ") },
      { title: "ኢየሱስ ከፍሎታል", performer: "Acoustic Worship", role: "Acoustic Set", lyrics: placeholderLyrics("ኢየሱስ ከፍሎታል") },
      { title: "ከወርቅ በበለጠ", performer: "Yonatan", role: "Lead Singer", lyrics: placeholderLyrics("ከወርቅ በበለጠ") },
      { title: "አመለጠች በራ", performer: "Ermiyas Fantu & Tsion", role: "Lead Singers", lyrics: placeholderLyrics("አመለጠች በራ") },
    ],
  },
  {
    kind: "moment",
    title: "የስብከት ጊዜ · The Word",
    description: "ቃሉን የምንሰማበት ጊዜ።",
  },
  {
    kind: "session",
    number: 3,
    title: "Session Three",
    songs: [
      { title: "በክርስቶስ", performer: "Zerubabel Kapo", role: "Lead Singer", lyrics: placeholderLyrics("በክርስቶስ") },
      { title: "ድንቅ ነዉ", performer: "Bereketab Aychewu", role: "Lead Singer", lyrics: placeholderLyrics("ድንቅ ነዉ") },
      { title: "ተፈጸመ", performer: "Feven Endale", role: "Lead Singer", lyrics: placeholderLyrics("ተፈጸመ") },
      { title: "አዳነኝ በጸጋዉ", performer: "To be announced", role: "Lead Singer", lyrics: placeholderLyrics("አዳነኝ በጸጋዉ") },
    ],
  },
  {
    kind: "moment",
    title: "የመዝጊያ ጸሎት · Closing Prayer",
    description: "በጸሎት እንሰናበታለን።",
  },
];
