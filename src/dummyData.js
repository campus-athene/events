const dummyData = {
  events: [
    {
      id: 1,
      title: "E-Learning Stammtisch",
      organiser: { id: 1, name: "Hochschuldidaktische Arbeitsstelle" },
      date: "14. September, 15:00 Uhr",
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
      date: "10. September, 10:00 Uhr",
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
      date,
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
      date,
      venue: "Bücherei",
      price: "Kostenlos",
      desc: `
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 

        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. `,
      image:
        "https://2.bp.blogspot.com/-rEIg1QmTeOw/V4xJ9d6PxuI/AAAAAAAADvE/hVsSJEJPemQarZDRNXE_j20uhXvo-TkkACLcB/w1200-h630-p-k-no-nu/-882475_w1020h450c1cx509cy249.jpg",
    })),
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
  ],
};

export const getEventById = (id) =>
  dummyData.events.filter((e) => e.id === id)[0];
export const event1 = getEventById(1);
export const event2 = getEventById(2);
export const event3 = getEventById(33);
export const event4 = getEventById(40);

export const getOrganiserById = (id) =>
  dummyData.organisers.filter((o) => o.id === id)[0];

export default dummyData;
