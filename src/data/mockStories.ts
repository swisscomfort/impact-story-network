import { Story } from '../types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'Flirt verpatzt am Zürich HB & letztes Geld für Drink ausgegeben: Ticket nach Luzern fehlt!',
    author: 'Robin M.',
    authorReputation: 120,
    city: 'Zürich',
    country: 'CH',
    category: 'Heimkommen',
    situation: 'Ich stand bis eben in einer Bar an der Europaallee. Ein eigentlich vielversprechendes Date hat sich um 23:45 Uhr in Luft aufgelöst (sie meinte, sie geht kurz zur Toilette und ward nie mehr gesehen).',
    problem: 'Mein ganzes Bargeld und mein Tageslimit auf der Debitkarte sind für zwei überteuerte Gin-Tonic draufgegangen. Jetzt stehe ich am Gleis 4 am Zürich HB und der letzte IR nach Luzern fährt in 25 Minuten. Mir fehlen genau 24 CHF für das SBB Halbtax-Ticket.',
    mission: 'Ticket Zürich HB → Luzern zweckgebunden finanzieren, damit Robin nicht auf der Holzbank im Bahnhof übernachten muss.',
    targetAmount: 24,
    currentAmount: 18,
    currency: 'CHF',
    purposeTag: 'SBB Zugticket',
    status: 'turning',
    createdAt: 'Vor 18 Minuten',
    donations: [
      { id: 'd-1', supporterName: 'Beat K.', amount: 10, currency: 'CHF', timestamp: 'Vor 12 Min', note: 'Klassiker am Zürich HB... fahr gut heim!' },
      { id: 'd-2', supporterName: 'Laura_ZH', amount: 8, currency: 'CHF', timestamp: 'Vor 5 Min', note: 'Die Gin-Tonic-Rechnung tut weh. Hier sind 8 Stutz für den Zug.' }
    ],
    updates: [
      {
        id: 'u-1',
        timestamp: 'Vor 4 Minuten',
        title: 'Fast geschafft – Schalter hat noch 10 Min offen!',
        content: 'Unglaublich Leute, es fehlen nur noch 6 CHF! Ich stehe schon in der Schlange am Automaten. Wenn das klappt, mach ich ein Foto vom gelösten Ticket am Gleis!',
      }
    ],
    comments: [
      {
        id: 'c-1',
        author: 'Sandro_LU',
        roleTag: 'Zweifler',
        text: 'Wieso hast du dein Tageslimit für Drinks ausgereizt, wenn du wusstest, dass du nach Hause musst? 😂 Aber hey, wer von uns war noch nie so verpeilt.',
        timestamp: 'Vor 15 Min',
        likes: 14,
        isHelpfulAdvice: false
      },
      {
        id: 'c-2',
        author: 'Elena_Z',
        roleTag: 'Tippgeber',
        text: 'Wichtig: Kauf das Ticket vor dem Einsteigen in der SBB-App oder am Automat, die Kontrolleure im Nachtzug nach Luzern sind knallhart.',
        timestamp: 'Vor 10 Min',
        likes: 21,
        isHelpfulAdvice: true
      },
      {
        id: 'c-3',
        author: 'Marc B.',
        roleTag: 'Retter',
        text: 'Hab 10 CHF beigesteuert. Lern draus fürs nächste Date: Rückfahrt immer zuerst buchen! 😉',
        timestamp: 'Vor 7 Min',
        likes: 9,
        isHelpfulAdvice: false
      }
    ],
    views: 480,
    reactionsCount: 38
  },
  {
    id: 'story-2',
    title: 'Fahrradkette & Schlauch im Platzregen zerrissen – 45 Min vor Bewerbungsgespräch in Berlin',
    author: 'Samira K.',
    authorReputation: 210,
    city: 'Berlin',
    country: 'DE',
    category: 'Kleine Alltagspanne',
    situation: 'Ich fahre auf der Torstraße Richtung Rosenthaler Platz zu meinem Traum-Interview für eine Junior-Architekten-Stelle. Meine Mappe ist wasserdicht verpackt.',
    problem: 'Schlagloch übersehen: Kette blockiert, hinterer Schlauch mit lautem Knall explodiert. Um mich herum Platzregen. Der nächste Fahrradladen "Kette & Ritzel" ist 200m entfernt, hat den passenden Schlauch, aber meine Tasche mit Portemonnaie liegt noch auf dem Schreibtisch daheim in Neukölln.',
    mission: 'Ersatzschlauch + Express-Pumpen im Laden (19 €) finanzieren, damit Samira pünktlich trocken ankommt.',
    targetAmount: 19,
    currentAmount: 19,
    currency: 'EUR',
    purposeTag: 'Fahrrad-Reparatur-Set',
    status: 'good_end',
    createdAt: 'Vor 2 Stunden',
    goodEndSummary: 'Mission geglückt! Ersatzschlauch bezahlt, Fahrradmechaniker hat es in 8 Minuten montiert. Samira war 10 Minuten vor dem Interview da und hat die Zusage für die zweite Runde!',
    donations: [
      { id: 'd-3', supporterName: 'Felix_Kreuzberg', amount: 10, currency: 'EUR', timestamp: 'Vor 1 Stunde', note: 'Rock das Vorstellungsgespräch!' },
      { id: 'd-4', supporterName: 'Anna_Pnk', amount: 9, currency: 'EUR', timestamp: 'Vor 1 Stunde', note: 'Architekten halten zusammen!' }
    ],
    updates: [
      {
        id: 'u-2',
        timestamp: 'Vor 1 Stunde',
        title: 'Im Laden – Reparatur läuft!',
        content: 'Der Mechaniker wechselt den Schlauch gerade im Rekordtempo. Ihr seid lebensrettend!',
      },
      {
        id: 'u-3',
        timestamp: 'Vor 35 Minuten',
        title: '🎉 Gutes Ende: Interview geschafft!',
        content: 'Sitze jetzt beim Kaffee nach dem Gespräch. Sie waren mega beeindruckt von der Story und wollen mich nächste Woche zum Probearbeiten sehen! Danke an alle!!',
        isGoodEnd: true
      }
    ],
    comments: [
      {
        id: 'c-4',
        author: 'Jonas_Rad',
        roleTag: 'Tippgeber',
        text: 'Frag den Verkäufer, ob er direkt mit Paypal oder Karte per Telefon abrechnen kann, falls er Impact Story Network schon kennt.',
        timestamp: 'Vor 1h 45m',
        likes: 12,
        isHelpfulAdvice: true
      },
      {
        id: 'c-5',
        author: 'Clara_M',
        roleTag: 'Retter',
        text: 'Das ist genau das, wofür diese Plattform da ist. 9 Euro gesendet, viel Erfolg beim Interview!',
        timestamp: 'Vor 1h 20m',
        likes: 18,
        isHelpfulAdvice: false
      }
    ],
    views: 890,
    reactionsCount: 76
  },
  {
    id: 'story-3',
    title: 'Letztes Geld für Spezial-Matcha verpulvert & Hausschlüssel im Büro eingeschlossen (Wien)',
    author: 'Florian W.',
    authorReputation: 85,
    city: 'Wien',
    country: 'AT',
    category: 'Peinlicher Fehler',
    situation: 'Ich wollte mir am Neubau einen "handgeernteten ceremonial grade Matcha Latte" gönnen, weil ich dachte, es ist Freitag. Es war aber Donnerstag.',
    problem: 'Vor der Haustür im 7. Bezirk gemerkt: Schlüsselbund liegt brav auf dem Bürotisch im 1. Bezirk. Das Bürogebäude ist bereits mit Alarm gesichert. Der Schlüsseldienst mit Not-Türöffnung verlangt einen Selbstbehalt von 38 €, mein Bankkonto steht nach dem Matcha auf genau 1,20 €.',
    mission: 'Aufsperr-Notdienst-Zuschlag zweckgebunden finanzieren (38 €), damit Florian nicht im Hausflur schlafen muss.',
    targetAmount: 38,
    currentAmount: 14,
    currency: 'EUR',
    purposeTag: 'Notfall-Aufsperrdienst',
    status: 'open',
    createdAt: 'Vor 42 Minuten',
    donations: [
      { id: 'd-5', supporterName: 'Stefan_Wien', amount: 8, currency: 'EUR', timestamp: 'Vor 20 Min', note: 'Matcha für 12 Euro... selber schuld, aber frieren musst du nicht.' },
      { id: 'd-6', supporterName: 'Mia_93', amount: 6, currency: 'EUR', timestamp: 'Vor 11 Min', note: 'Ein Gruß aus dem 7. Bezirk! Tür bald wieder offen.' }
    ],
    updates: [],
    comments: [
      {
        id: 'c-6',
        author: 'KaffeeGott',
        roleTag: 'Zweifler',
        text: 'Wie viel hat bitte dieser Matcha gekostet, dass das Konto danach auf 1,20 € ist?! Brauchst du da nicht eher einen Finanzberater? 😂',
        timestamp: 'Vor 35 Min',
        likes: 34,
        isHelpfulAdvice: false
      },
      {
        id: 'c-7',
        author: 'Florian W.',
        roleTag: 'Creator',
        text: 'Er hat 9,50 € gekostet und war nicht mal süß... Ich bereue alles. Sitze auf der Treppe.',
        timestamp: 'Vor 28 Min',
        likes: 45,
        isHelpfulAdvice: false
      },
      {
        id: 'c-8',
        author: 'SchlosserPepi',
        roleTag: 'Tippgeber',
        text: 'Ist die Tür nur zugefallen oder versperrt? Wenn nur zugefallen: Plastikkarte aus dem Geldbeutel oder PET-Flasche zurechtschneiden, spart dir 38 €!',
        timestamp: 'Vor 18 Min',
        likes: 29,
        isHelpfulAdvice: true
      }
    ],
    views: 620,
    reactionsCount: 52
  },
  {
    id: 'story-4',
    title: 'Akku bei 2% am Bahnhof Bern – Ladekabel im Zug vergessen und ich muss meinen Arbeitgeber anrufen',
    author: 'Céline T.',
    authorReputation: 160,
    city: 'Bern',
    country: 'CH',
    category: 'Mini-Mission',
    situation: 'Ich bin umgestiegen in Bern von Basel nach Interlaken. Mein Rucksack ist da, aber meine Zubehörtasche mit Ladekabel und Powerbank ist im vorherigen Zug geblieben.',
    problem: 'Mein Handy hat noch 2% Akku. Ich muss meinen Chef vor 18 Uhr anrufen, um eine dringende Freigabe zu bestätigen, sonst platzt ein Kundenauftrag. Kiosk am Gleis hat USB-C Kabel für 16 CHF, aber Twint geht bei 1% gleich aus und mein Bargeld reicht um 6 CHF nicht.',
    mission: 'USB-C Kabel am Kiosk Bern (16 CHF) kaufen, bevor der Akku auf 0% sinkt.',
    targetAmount: 16,
    currentAmount: 16,
    currency: 'CHF',
    purposeTag: 'USB-C Ladekabel Kiosk',
    status: 'good_end',
    createdAt: 'Vor 4 Stunden',
    goodEndSummary: 'Zweckbetrag innerhalb von 6 Minuten erreicht! Kioskmitarbeiter hat das Kabel direkt mit dem Code übergeben. Anruf beim Chef ging mit 1% Akku im Lademodus raus!',
    donations: [
      { id: 'd-7', supporterName: 'Pascal_BE', amount: 10, currency: 'CHF', timestamp: 'Vor 3h 50m', note: 'Rette deinen Feierabend!' },
      { id: 'd-8', supporterName: 'Monika_CH', amount: 6, currency: 'CHF', timestamp: 'Vor 3h 48m', note: 'Schnell anstecken!' }
    ],
    updates: [
      {
        id: 'u-4',
        timestamp: 'Vor 3h 40m',
        title: '🎉 Kabel gekauft & Anruf erledigt!',
        content: 'Akku war buchstäblich bei 1%, als das Kabel angesteckt wurde. Chef hat abgenommen, Projekt freigegeben. Ihr seid die Besten!',
        isGoodEnd: true
      }
    ],
    comments: [
      {
        id: 'c-9',
        author: 'TechnikNerd_CH',
        roleTag: 'Tippgeber',
        text: 'Am SBB Informationsschalter kann man manchmal für 5 Min kostenlos laden, falls das Kabel noch dauert!',
        timestamp: 'Vor 3h 52m',
        likes: 15,
        isHelpfulAdvice: true
      }
    ],
    views: 740,
    reactionsCount: 61
  },
  {
    id: 'story-5',
    title: 'Bachelorarbeit-Abgabe in 2,5 Stunden: Druckerpatrone komplett eingetrocknet (München)',
    author: 'Maximilian E.',
    authorReputation: 95,
    city: 'München',
    country: 'DE',
    category: 'Spontane Wendung',
    situation: 'Ich sitze in meiner WG am Max-Weber-Platz. Die 72 Seiten Bachelorarbeit über Stadtökologie müssen bis 15:30 Uhr gebunden im Prüfungsamt der LMU liegen.',
    problem: 'Mein WG-Drucker hat bei Seite 8 gestreikt – Patrone leer. Der Express-Copyshop an der Schellingstraße druckt und bindet es in 20 Minuten, kostet aber 22 € Expressgebühr. Mir fehlen genau 11 €, weil mein BAföG erst am Monatsende kommt.',
    mission: 'Express-Druck & Ringbindung im Copyshop finanzieren (11 € Restbetrag).',
    targetAmount: 22,
    currentAmount: 17,
    currency: 'EUR',
    purposeTag: 'Copyshop Express-Druck',
    status: 'turning',
    createdAt: 'Vor 25 Minuten',
    donations: [
      { id: 'd-9', supporterName: 'Alumna_LMU', amount: 10, currency: 'EUR', timestamp: 'Vor 15 Min', note: 'Kenn das Drama noch aus meiner eigenen Uni-Zeit. Viel Erfolg!' },
      { id: 'd-10', supporterName: 'Tobi_Muc', amount: 7, currency: 'EUR', timestamp: 'Vor 8 Min', note: 'Nur noch 5 Euro bis zur fertigen Arbeit!' }
    ],
    updates: [
      {
        id: 'u-5',
        timestamp: 'Vor 6 Minuten',
        title: 'Auf dem Weg zum Copyshop',
        content: 'Fahre mit der U-Bahn zur Schellingstraße. PDF ist schon per Mail an den Copyshop gesendet! Noch 5 € und ich kann die Bindung bezahlen!',
      }
    ],
    comments: [
      {
        id: 'c-10',
        author: 'Prof_Humor',
        roleTag: 'Zweifler',
        text: 'Wer druckt denn 2,5 Stunden vor Frist? 😅 Aber Hauptsache der Inhalt stimmt! Gib Gas.',
        timestamp: 'Vor 20 Min',
        likes: 19,
        isHelpfulAdvice: false
      },
      {
        id: 'c-11',
        author: 'Julia_M',
        roleTag: 'Tippgeber',
        text: 'Nimm unbedingt deinen Studentenausweis mit in den Shop, manche Läden an der Schellingstraße geben 10% Rabatt!',
        timestamp: 'Vor 14 Min',
        likes: 11,
        isHelpfulAdvice: true
      }
    ],
    views: 510,
    reactionsCount: 42
  }
];
