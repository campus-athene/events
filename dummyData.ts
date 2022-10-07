export type Organiser = {
  id: number;
  name: string;
  desc: string;
  headerImg: string;
  logo: string;
};

export type Event = {
  id: number;
  title: string;
  organiser: { id: number; name: string };
  date: Date;
  venue: string;
  price: string;
  desc: string;
  image: string;
};

const dummyData: { events: Event[]; organisers: Organiser[] } = {
  events: [
    {
      id: 1,
      title: "E-Learning Stammtisch",
      organiser: { id: 1, name: "Hochschuldidaktische Arbeitsstelle" },
      date: new Date("14. September, 15:00 Uhr"),
      venue: "Online Event",
      price: "Kostenlos",
      desc: `
        In hybriden Lehrsettings nimmt ein Teil der Studierenden in Präsenz vor Ort an der Universität, der andere Teil der Studierenden online (z.B. von zu Hause) an der jeweiligen Lehrveranstaltung teil. Je nach Charakter der Lehrveranstaltung sind unterschiedliche Szenarien hierbei geeignet. Die Online-Teilnahme kann synchron oder asynchron stattfinden. Online- und Präsenz-Teilnahme sind gegebenenfalls im Wechsel organisiert. Die Durchführung von hybrider Lehre stellt somit vielfältige didaktische und technische Herausforderungen an Lehrende und Studierende, bietet aber gleichzeitig neue Möglichkeiten und flexible Zugänge.
        Im Rahmen dieses Stammtisches berichtet Prof. Dr. Andy Schürr aus dem Fachbereich Elektro- und Informationstechnik an der TU Darmstadt über seine gemachten Erfahrungen mit dem Einsatz hybrider Lehrkonzepte im Sommersemester 2022.`,
      image:
        "https://www.hda.tu-darmstadt.de/media/hda/zz_hda_medienarchiv/img/news_5/elearning__Stammtisch_Square_web_870x0.jpg",
    },
    {
      id: 2,
      title: "Fußball",
      organiser: {
        id: 2,
        name: "Fußball Verein",
      },
      date: new Date("10. September, 10:00 Uhr"),
      venue: "Sportplatz",
      price: "Kostenlos",
      desc: `
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 

        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. `,
      image:
        "https://www.chartattack.com/wp-content/uploads/2019/10/soccer.jpg",
    },
    ...[
      "05. September, 15:00 Uhr",
      "12. September, 15:00 Uhr",
      "19. September, 15:00 Uhr",
      "26. September, 15:00 Uhr",
      "03. Oktober, 15:00 Uhr",
      "10. Oktober, 15:00 Uhr",
      "17. Oktober, 15:00 Uhr",
    ].map((date, i) => ({
      id: 30 + i,
      title: "Fechten",
      organiser: {
        id: 4,
        name: "Fechtverein",
      },
      date: new Date(date),
      venue: "Sporthalle",
      price: "12 € pro Monat",
      desc: `
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 

        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. `,
      image:
        "https://www.osp-rheinland.nrw/wp-content/uploads/2018/12/Saebelfechten.jpg",
    })),
    ...[
      "07. September, 20:00 Uhr",
      "14. September, 20:00 Uhr",
      "21. September, 20:00 Uhr",
      "28. September, 20:00 Uhr",
      "05. Oktober, 20:00 Uhr",
      "12. Oktober, 20:00 Uhr",
    ].map((date, i) => ({
      id: 40 + i,
      title: "Bücherkreis",
      organiser: {
        id: 3,
        name: "Leseratte e.V.",
      },
      date: new Date(date),
      venue: "Bücherei",
      price: "Kostenlos",
      desc: `
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 

        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. `,
      image:
        "https://2.bp.blogspot.com/-rEIg1QmTeOw/V4xJ9d6PxuI/AAAAAAAADvE/hVsSJEJPemQarZDRNXE_j20uhXvo-TkkACLcB/w1200-h630-p-k-no-nu/-882475_w1020h450c1cx509cy249.jpg",
    })),
    {
      id: 5,
      title: "Start-up & Innovation Day 2022",
      organiser: {
        id: 5,
        name: "HIGHEST Innovations- & Gründungszentrum ",
      },
      date: new Date("20. Oktober 2022"),
      venue: "darmstadtium",
      price: "Kostenlos",
      desc: `
        Endlich wieder live! Am 20. Oktober 2022 öffnen sich die Türen des darmstadiums zum 6. Start-up & Innovation Day der TU Darmstadt. Hier treffen Founderspirit und Innovationsgeist auf Wirtschaft, Wissenschaft und Politik.
        Auf der Start-up Messe erwarten Sie einen ganzen Tag lang Innovationsprojekte und (Tech)Start-ups von ersten Ideen oder frühen Innovationen bis hin zu wissens-und technologiebasierten Gründungen, die bereits einen erfolgreichen Markteintritt geschafft haben. Auch sind zahlreiche Netzwerkpartner und Gründungsunterstützende Organisationen aus der Gründerszene des Rhein-Main-Gebiets mit Ständen vor Ort und zeigen die enorme Innovationskraft der Region.
        Begleitet wird die Messe von einem spannenden Rahmenprogramm, u.a. mit Tom Plümmer (Co-founder, Wingcopter), Bettine Schmitz (auxxo, Investorin des Jahres 2022) und Simon Müller (watxx, Viessmann Group), einer Pitch Corner und zahlreichen Möglichkeiten zum Austausch und Netzwerken – z.B. auf der HIGHEST xchange area.
        Lassen Sie sich am #Innoday2022 vom Erfindergeist und der lebendigen (Tech)Start-up-Szene inspirieren, knüpfen Sie wertvolle Kontakte und bahnen neue Kooperationen an. Sichern Sie sich JETZT Ihr kostenfreies Ticket!
        `,
      image:
        "https://www.tu-darmstadt.de/media/daa_responsives_design/04_wissenstransfer_medien/highest/veranstaltungen_8/startup___innovation_da/bilder_26/Header-Innoday_0x570.jpg",
    },
  ],
  organisers: [
    {
      id: 1,
      name: "Hochschuldidaktische Arbeitsstelle",
      desc: `
        In hybriden Lehrsettings nimmt ein Teil der Studierenden in Präsenz vor Ort an der Universität, der andere Teil der Studierenden online (z.B. von zu Hause) an der jeweiligen Lehrveranstaltung teil. Je nach Charakter der Lehrveranstaltung sind unterschiedliche Szenarien hierbei geeignet. Die Online-Teilnahme kann synchron oder asynchron stattfinden. Online- und Präsenz-Teilnahme sind gegebenenfalls im Wechsel organisiert. Die Durchführung von hybrider Lehre stellt somit vielfältige didaktische und technische Herausforderungen an Lehrende und Studierende, bietet aber gleichzeitig neue Möglichkeiten und flexible Zugänge.
        Im Rahmen dieses Stammtisches berichtet Prof. Dr. Andy Schürr aus dem Fachbereich Elektro- und Informationstechnik an der TU Darmstadt über seine gemachten Erfahrungen mit dem Einsatz hybrider Lehrkonzepte im Sommersemester 2022.`,
      headerImg:
        "https://www.hda.tu-darmstadt.de/media/hda/hda_dachseite/01_start_hda/StartseiteHDA_Buehnenbild_Campus-27_ellenlewis.jpg",
      logo: "https://www.hda.tu-darmstadt.de/media/hda/zentrale_hda_medien/2013-10-hda-logo_1024px.png",
    },
    {
      id: 2,
      name: "Fußball Verein",
      desc: `
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 

        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. `,
      headerImg:
        "https://www.chartattack.com/wp-content/uploads/2019/10/soccer.jpg",
      logo: "https://image.shutterstock.com/image-vector/football-logo-mascot-vector-tiger-260nw-1934023577.jpg",
    },
    {
      id: 3,
      name: "Leseratte e.V.",
      desc: `
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 

        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. `,
      headerImg:
        "https://2.bp.blogspot.com/-rEIg1QmTeOw/V4xJ9d6PxuI/AAAAAAAADvE/hVsSJEJPemQarZDRNXE_j20uhXvo-TkkACLcB/w1200-h630-p-k-no-nu/-882475_w1020h450c1cx509cy249.jpg",
      logo: "https://image.shutterstock.com/image-vector/vector-illustration-reading-club-600w-1543314920.jpg",
    },
    {
      id: 4,
      name: "Fechtverein",
      desc: `
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 

        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. `,
      headerImg:
        "https://www.osp-rheinland.nrw/wp-content/uploads/2018/12/Saebelfechten.jpg",
      logo: "https://image.shutterstock.com/image-vector/classic-sport-premium-club-black-600w-411900751.jpg",
    },
    {
      id: 5,
      name: "HIGHEST Innovations- & Gründungszentrum",
      desc: `
        Ob es um eine Erfindungsmeldung oder eine Unternehmensgründung geht. Bei Interesse an der Zusammenarbeit mit Start-ups oder der Entwicklung von Patenten, das Team von HIGHEST hilft gerne weiter. Wir unterstützen Wissenschaftlerinnen und Wissenschaftler, Studierende und Unternehmen, wenn es um den Transfer von Ideen und Know-how in Wirtschaft und Gesellschaft geht.
        Unsere Beratungsteams gehen dabei individuell auf Bedürfnisse und Fragen ein, unterstützen Euch aus Ideen Produkte zu generieren und begleiten Euch auf dem Weg zum eigenen Start-up. Diese Leistungen sind kostenfrei und selbstverständlich streng vertraulich. Auch ohne eine konkret ausgearbeitete Idee für ein Gründungsvorhaben kann man sich an HIGHEST wenden und beraten lassen.
        `,
      headerImg:
        "https://www.tu-darmstadt.de/media/daa_responsives_design/04_wissenstransfer_medien/highest/Header_Startseiten_01.png",
      logo: "https://www.tu-darmstadt.de/media/daa_responsives_design/04_wissenstransfer_medien/highest/HIGHEST_200827_gross_HIGHEST.jpg",
    },
  ],
};

export const getEventById = (id: number) =>
  dummyData.events.filter((e) => e.id === id)[0];
export const event1 = getEventById(1);
export const event2 = getEventById(2);
export const event3 = getEventById(33);
export const event4 = getEventById(40);
export const event5 = getEventById(5);

export const getOrganiserById = (id: number) =>
  dummyData.organisers.filter((o) => o.id === id)[0];

export default dummyData;
