# Entgegen unter eigener Domain – Schritt für Schritt

Diese Anleitung setzt **keine Vorkenntnisse** voraus. Alle Befehle sind zum
Kopieren gedacht; ersetze nur, was ausdrücklich dabeisteht. Als Beispiel dient
durchgehend `entgegen.me` – setz deine eigene Adresse ein.

Am Ende läuft die App unter deiner Adresse, mit HTTPS.

Es gibt drei Wege dorthin; welcher passt, klärt der nächste Abschnitt in einer
Minute.

---

## Zuerst: welcher Weg passt?

Es gibt drei, und sie unterscheiden sich stark im Aufwand. Der Unterschied
hängt an einer einzigen Frage: **Soll der API-Schlüssel für die Rückfragen
versteckt sein?**

| | Weg | Aufwand | Kosten | Rückfragen am Vers |
|---|---|---|---|---|
| **A** | [GitHub Pages mit eigener Domain](#weg-a--github-pages-mit-eigener-domain) | 15 Min, kein Terminal | **0 €** | nur mit eigenem Schlüssel im Browser |
| **B** | [Webhosting bei IONOS](#weg-b--webhosting-hochladen) | 20 Min, kein Terminal | im Vertrag | nur mit eigenem Schlüssel im Browser |
| **C** | [Eigener Server](#weg-c--eigener-server) | 45 Min, Terminal | ab ~4 €/Monat | Schlüssel bleibt auf dem Server |

**Weg A ist für die meisten der richtige.** Er kostet nichts, die App liegt
schon dort, und HTTPS macht GitHub von selbst. Wechseln kannst du später
jederzeit – die Domain bleibt dieselbe.

**Weg C brauchst du nur**, wenn die Rückfragen für alle Besucher funktionieren
sollen, ohne dass jeder seinen eigenen Schlüssel einträgt.

### Was hast du bei IONOS eigentlich gebucht?

Für Weg B und C musst du das wissen. Melde dich bei IONOS an und schau unter
**Menü → Verträge**:

- **Nur „Domain"** → Weg A (oder Weg C mit einem Server woanders)
- **„Webhosting"** (Paket S/M/L, oft mit „Website & Shop") → Weg A oder B.
  Kein Weg C: Webhosting lässt keine dauerhaft laufenden eigenen Programme zu.
- **„VPS", „Cloud Server", „Server Flex" oder „Dedicated Server"** → alle drei
  Wege stehen offen, Weg C eingeschlossen.

---

## Weg A · GitHub Pages mit eigener Domain

Kostenlos, kein Server, HTTPS inklusive. Deine App liegt weiter bei GitHub,
erreichbar ist sie unter `https://entgegen.me`.

### A1 · Die Domain im Projekt hinterlegen

Lege im Repository eine Datei `public/CNAME` an, mit genau einer Zeile:

```
entgegen.me
```

Das ist alles – der Veröffentlichungs-Workflow erkennt die Datei und baut die
App dann für die Wurzel statt für den Unterordner `/Bible-study/`. Ohne diesen
Schritt bliebe die Seite unter der eigenen Domain **weiß**, weil alle Verweise
ins Leere zeigten.

```bash
echo "entgegen.me" > public/CNAME
git add public/CNAME
git commit -m "Eigene Domain entgegen.me"
git push
```

### A2 · Bei IONOS auf GitHub zeigen

IONOS-Konto → **Domains & SSL** → bei `entgegen.me` auf **DNS**.

Trag diese Einträge ein (vorhandene `A`-Einträge auf `@` vorher löschen):

| Typ | Host | Wert |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `roruffm.github.io.` |

> Die vier AAAA-Adressen sind nachgeprüft. Die vier IPv4-Adressen sind die von
> GitHub veröffentlichten; **maßgeblich ist, was GitHub dir selbst anzeigt** –
> siehe nächster Schritt, dort stehen sie bei einem Fehler im Klartext.

### A3 · Bei GitHub eintragen

Im Repository: **Settings → Pages → Custom domain** → `entgegen.me` eintragen
und **Save**.

GitHub prüft jetzt die DNS-Einträge. Das dauert von wenigen Minuten bis zu
einer Stunde. Danach ein Häkchen bei **Enforce HTTPS** setzen – das lässt sich
erst anklicken, wenn das Zertifikat da ist.

Fertig. `https://entgegen.me` zeigt die App.

### A4 · Die Rückfragen am Vers

Auf diesem Weg gibt es keinen Server, der einen Schlüssel verstecken könnte.
Jede Person, die die Rückfragen nutzen will, trägt unter **Ich → Rückfragen am
Vers → Eigener Schlüssel** ihren eigenen ein und zahlt ihren eigenen Verbrauch.

Willst du das nicht, brauchst du Weg C – oder du kombinierst: App bei GitHub,
und nur die Schnittstelle auf einem kleinen Server
(siehe [Die App bleibt auf GitHub Pages](../README.md#die-app-bleibt-auf-github-pages)).

---

## Weg B · Webhosting hochladen

Wenn du bei IONOS ein Webhosting-Paket hast: Die App besteht aus reinen
Dateien, die kannst du einfach hochladen.

### B1 · Bauen

Auf deinem eigenen Rechner, im Projektordner:

```bash
npm ci
npm run build
```

Im Ordner `dist` liegt jetzt alles, was hochgeladen werden muss – rund 5,6 MB.

> **Wichtig:** Ohne `BASE_PATH` bauen. Und lade **auch die versteckte Datei
> `.htaccess`** mit hoch, die dabei entsteht. Ohne sie funktioniert die App
> beim Klicken zwar, aber ein Neuladen auf `/bibel/joh/3` endet in einem 404.
> In FileZilla: **Server → Anzeige versteckter Dateien erzwingen**.

### B2 · Hochladen

IONOS-Konto → **Websites & Shops** → dein Paket → **SFTP-Zugang**. Dort stehen
Servername, Benutzer und Passwort.

Mit FileZilla (kostenlos) verbinden und den **Inhalt** von `dist` in das
Webroot legen – bei IONOS heißt der Ordner meist `/` oder `htdocs`. Nicht den
Ordner `dist` selbst hochladen, sondern was darin liegt.

### B3 · Domain zuweisen und HTTPS

IONOS-Konto → **Domains & SSL** → `entgegen.me` → **Ziel zuweisen** → auf dein
Webhosting-Paket zeigen lassen. SSL schaltet IONOS in denselben Menüs kostenlos
dazu („SSL-Zertifikat aktivieren").

Für die Rückfragen gilt dasselbe wie bei Weg A: eigener Schlüssel je Person.

---

## Weg C · Eigener Server

Ab hier die vollständige Anleitung für einen eigenen Server. Bei IONOS ist das
ein **VPS** oder **Cloud Server**; bei anderen Anbietern heißt es genauso.

> **IONOS-Besonderheit:** Cloud Server haben **zusätzlich zur Firewall im
> Betriebssystem eine eigene Firewall im IONOS-Konto**. Sind dort die Ports 80
> und 443 nicht freigegeben, bleibt die Seite unerreichbar, egal wie richtig
> alles andere ist. Zu finden unter **Server & Cloud → dein Server →
> Netzwerk → Firewall-Richtlinien**. Das ist der mit Abstand häufigste Grund,
> warum es bei IONOS „nicht geht".

---

### Was du für Weg C brauchst

Einen Server (VPS) und die Domain. Der API-Schlüssel von Anthropic ist optional
– ohne ihn läuft die ganze App, nur der Tab „Fragen“ bleibt aus.

**Servergröße:** Das Kleinste reicht. Zwei Gigabyte Arbeitsspeicher sind
bequem; das Bauen der App dauert dort etwa eine Minute und braucht 5,6 MB
Platz. Bei Hetzner ist das der Tarif **CX22**.

**Betriebssystem:** Wähle beim Bestellen **Ubuntu 24.04**. Alle Befehle hier
gehen davon aus.

---

## Schritt 1 · Server bestellen

Bestell den Server bei deinem Anbieter. Du bekommst danach zwei Dinge:

- eine **IP-Adresse**, etwa `203.0.113.42` – das ist die Hausnummer deines
  Servers im Internet,
- ein **Passwort** oder die Möglichkeit, einen SSH-Schlüssel zu hinterlegen.

Schreib dir die IP-Adresse auf. Du brauchst sie gleich zweimal.

---

## Schritt 2 · Adresse auf den Server zeigen lassen

Geh zu dem Anbieter, bei dem deine Domain liegt, und such die **DNS-Verwaltung**
(manchmal „Nameserver-Einträge“ oder „Zonenverwaltung“). Trag dort einen Eintrag
ein:

| Typ | Name | Wert |
|---|---|---|
| `A` | `@` | deine IP-Adresse, z. B. `203.0.113.42` |

Falls du zusätzlich `www.entgegen.me` willst, noch einen:

| Typ | Name | Wert |
|---|---|---|
| `A` | `www` | dieselbe IP-Adresse |

**Das dauert.** Bis die Änderung überall im Internet angekommen ist, vergehen
meist 5 bis 30 Minuten, gelegentlich ein paar Stunden. Mach in der Zwischenzeit
mit Schritt 3 weiter, aber warte mit Schritt 7 (HTTPS), bis dieser Befehl auf
deinem eigenen Rechner deine Server-IP zeigt:

```bash
ping entgegen.me
```

---

## Schritt 3 · Auf dem Server einloggen

Öffne auf deinem Rechner ein Terminal:

- **Mac:** Programm „Terminal“
- **Windows:** „PowerShell“ oder „Terminal“ aus dem Startmenü
- **Linux:** dein gewohntes Terminal

Dann (IP durch deine ersetzen):

```bash
ssh root@203.0.113.42
```

Beim ersten Mal fragt es „Are you sure you want to continue connecting?“ – tipp
`yes` und Enter. Danach das Passwort vom Anbieter.

Du bist drin, wenn die Zeile mit `root@…:~#` beginnt. **Alle folgenden Befehle
tippst du in dieses Fenster.**

---

## Schritt 4 · Grundausstattung installieren

Erst das System aktualisieren:

```bash
apt update && apt upgrade -y
```

Dann Node.js 22, Git und Caddy (das Programm, das später HTTPS erledigt):

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs git debian-keyring debian-archive-keyring apt-transport-https curl

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy
```

Prüfen, ob es geklappt hat:

```bash
node --version    # sollte v22.… zeigen
caddy version     # sollte v2.… zeigen
```

---

## Schritt 5 · App holen und bauen

```bash
git clone https://github.com/roruffm/Bible-study.git /opt/entgegen
cd /opt/entgegen
npm ci
npm run build
```

Das letzte Kommando dauert bis zu einer Minute. Danach liegt die fertige App im
Ordner `dist`. Kontrolle:

```bash
ls dist/index.html    # muss den Dateinamen ausgeben
```

> **Wichtig:** Hier **kein** `BASE_PATH` setzen. Das braucht nur die Fassung für
> GitHub Pages, die in einem Unterordner liegt. Auf deinem eigenen Server liegt
> die App direkt unter `/`.

---

## Schritt 6 · Schlüssel und Zugangswort hinterlegen

Der API-Schlüssel gehört **nicht** in den Ordner der App und nicht auf GitHub,
sondern in eine eigene Datei, die nur der Server lesen darf.

Denk dir zuerst ein **Zugangswort** aus – irgendein Wort, das nur du kennst. Es
verhindert, dass Fremde auf deine Rechnung Fragen stellen.

```bash
nano /etc/entgegen.env
```

Ein Texteditor öffnet sich. Tipp hinein (deine Werte einsetzen):

```
ANTHROPIC_API_KEY=sk-ant-hier-dein-schluessel
ENTGEGEN_PASSWORT=mein-geheimes-zugangswort
ENTGEGEN_HOST=127.0.0.1
ENTGEGEN_PROXY=1
```

Speichern und schließen: **Strg+O**, Enter, **Strg+X**.

Dann die Datei abschotten, damit sie niemand sonst lesen kann:

```bash
chmod 600 /etc/entgegen.env
```

Was die beiden letzten Zeilen bedeuten: `ENTGEGEN_HOST=127.0.0.1` sorgt dafür,
dass die App nur über Caddy erreichbar ist und nicht zusätzlich direkt.
`ENTGEGEN_PROXY=1` sagt der App, dass Caddy davorsteht – sonst hielte sie alle
Besucher für ein und dieselbe Person und würde nach 60 Fragen pro Stunde für
alle dichtmachen.

---

## Schritt 7 · Als Dienst einrichten

Damit die App weiterläuft, wenn du das Terminal schließt, und nach einem
Neustart von selbst wieder hochkommt:

```bash
nano /etc/systemd/system/entgegen.service
```

Das hier hineinkopieren – **unverändert**:

```ini
[Unit]
Description=Entgegen – Bibelstudium
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/entgegen
EnvironmentFile=/etc/entgegen.env
ExecStart=/usr/bin/node server/entgegen-server.mjs
Restart=always
RestartSec=5

DynamicUser=yes
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true

[Install]
WantedBy=multi-user.target
```

Speichern (**Strg+O**, Enter, **Strg+X**), dann starten:

```bash
systemctl daemon-reload
systemctl enable --now entgegen
systemctl status entgegen
```

Bei `active (running)` in grün läuft alles. Mit **q** kommst du wieder heraus.

Schnelle Gegenprobe:

```bash
curl http://127.0.0.1:8080/gesund     # muss "ok" ausgeben
```

---

## Schritt 8 · HTTPS einschalten

Jetzt fehlt nur noch das Schloss in der Adresszeile. Caddy holt das Zertifikat
von selbst – du musst nur sagen, für welche Adresse.

```bash
nano /etc/caddy/Caddyfile
```

**Alles löschen** (Strg+K hält die Taste gedrückt und löscht Zeile für Zeile)
und stattdessen das hier hineinschreiben – `entgegen.me` durch deine Adresse
ersetzen:

```
entgegen.me, www.entgegen.me {
    encode gzip
    reverse_proxy 127.0.0.1:8080
}
```

Speichern, dann:

```bash
systemctl reload caddy
```

Caddy besorgt jetzt im Hintergrund ein Zertifikat. Das dauert einige Sekunden
bis wenige Minuten.

> Klappt es nicht, zeigt `journalctl -u caddy -n 30` warum. Fast immer ist die
> Antwort: Die Adresse aus Schritt 2 zeigt noch nicht auf den Server. Dann
> einfach zehn Minuten warten und `systemctl reload caddy` wiederholen.

---

## Schritt 9 · Tür abschließen

Nur die Türen offen lassen, die gebraucht werden:

```bash
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw --force enable
```

Port 8080 bleibt bewusst zu – dorthin soll nur Caddy sprechen, von innen.

---

## Fertig – jetzt ausprobieren

Ruf **https://entgegen.me** im Browser auf. Du solltest die App sehen, mit
Schloss in der Adresszeile.

Für die Rückfragen am Vers noch einmal in der App selbst:

1. Unten oder oben auf **Ich**
2. Runter zu **Rückfragen am Vers**
3. **Eigener Server** anklicken
4. Adresse: `https://entgegen.me`
5. Zugangswort: dasselbe wie in Schritt 6

Dann ein Kapitel aufschlagen, einen Vers antippen, Tab **Fragen** – und fragen.

---

## Später: die App aktualisieren

Wenn es eine neue Fassung gibt:

```bash
cd /opt/entgegen
git pull
npm ci
npm run build
systemctl restart entgegen
```

---

## Wenn etwas nicht geht

| Was du siehst | Woran es meist liegt | Was hilft |
|---|---|---|
| Browser: „Seite nicht erreichbar“ | Die Adresse zeigt noch nicht auf den Server | `ping entgegen.me` – kommt deine IP? Sonst warten |
| Browser: „Nicht sicher“ / Zertifikatswarnung | Caddy hat das Zertifikat noch nicht | `journalctl -u caddy -n 30` ansehen, dann `systemctl reload caddy` |
| Weiße Seite | Die App wurde nicht gebaut | `ls /opt/entgegen/dist/index.html`, sonst `npm run build` |
| Alles da, nur „Fragen“ meldet einen Fehler | Zugangswort stimmt nicht überein | In der App unter „Ich“ mit `/etc/entgegen.env` vergleichen |
| „Zu viele Anfragen“ | 60 Fragen pro Stunde erreicht | Warten, oder `ENTGEGEN_LIMIT=200` in `/etc/entgegen.env` |
| Dienst startet nicht | Fehler in der Konfiguration | `journalctl -u entgegen -n 40` zeigt die Ursache im Klartext |

Der Dienst schreibt beim Start eine Übersicht mit, ob Zugangswort und
Proxy-Erkennung gesetzt sind:

```bash
journalctl -u entgegen -n 20
```

---

## Was mit GitHub Pages passiert

Nichts. Die alte Adresse läuft weiter, bis du sie abschaltest. Willst du das,
geh im Repository auf **Settings → Pages** und stell die Quelle auf „None“, oder
lösch `.github/workflows/deploy.yml`.

Beides parallel zu betreiben ist auch in Ordnung – die Fassungen wissen
nichts voneinander.

---

## Weg C ohne eigenen Server: fertige Plattformen

Wenn du die versteckten Schlüssel willst, aber keinen Server verwalten magst:
Anbieter wie **Railway**, **Render** oder **Fly.io** bauen direkt aus dem
Repository und geben dir eine fertige HTTPS-Adresse. Der Ablauf ist überall ähnlich:

1. Beim Anbieter anmelden, GitHub verbinden, dieses Repository auswählen.
2. Als Bauanleitung `server/Dockerfile` angeben – die liegt schon dabei.
3. Zwei Umgebungsvariablen setzen: `ANTHROPIC_API_KEY` und
   `ENTGEGEN_PASSWORT`. Dazu `ENTGEGEN_PROXY=1`, weil auch dort ein Proxy
   davorsteht.
4. Starten.

Du bekommst eine Adresse wie `entgegen-production.up.railway.app`; eine eigene
Domain lässt sich dort meist mit zwei Klicks daraufsetzen. Teurer als ein
eigener Server ist es meist auch – dafür entfallen Schritte 3 bis 9.
