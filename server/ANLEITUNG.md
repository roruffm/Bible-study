# Entgegen auf eigenem Server – Schritt für Schritt

Diese Anleitung setzt **keine Vorkenntnisse** voraus. Alle Befehle sind zum
Kopieren gedacht; ersetze nur, was ausdrücklich dabeisteht.

Am Ende läuft die App unter deiner eigenen Adresse, mit HTTPS, und startet nach
einem Neustart des Servers von selbst wieder.

**Zeitbedarf:** etwa 45 Minuten, davon 20 Minuten Warten.
**Kosten:** rund 4–6 € im Monat für den Server, 1–15 € im Jahr für die Adresse.

> **Kürzester Weg ohne Terminal:** Wenn dir das alles zu viel ist, steht ganz
> unten unter [Ohne Terminal](#ohne-terminal) eine Variante, bei der ein
> Anbieter die Arbeit übernimmt.

---

## Was du vorher brauchst

| | Was | Wo | Kosten |
|---|---|---|---|
| 1 | **Einen Server** (fachsprachlich: VPS) | Hetzner, Netcup, DigitalOcean, IONOS | ab ~4 €/Monat |
| 2 | **Eine Internetadresse** (Domain), z. B. `meine-bibel.de` | INWX, Netcup, Namecheap | 1–15 €/Jahr |
| 3 | **Einen API-Schlüssel** von Anthropic – nur für die Rückfragen am Vers | console.anthropic.com | nach Verbrauch |

Punkt 3 kannst du weglassen. Ohne Schlüssel läuft die ganze App – nur der Tab
„Fragen“ bleibt aus.

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

Falls du zusätzlich `www.meine-bibel.de` willst, noch einen:

| Typ | Name | Wert |
|---|---|---|
| `A` | `www` | dieselbe IP-Adresse |

**Das dauert.** Bis die Änderung überall im Internet angekommen ist, vergehen
meist 5 bis 30 Minuten, gelegentlich ein paar Stunden. Mach in der Zwischenzeit
mit Schritt 3 weiter, aber warte mit Schritt 7 (HTTPS), bis dieser Befehl auf
deinem eigenen Rechner deine Server-IP zeigt:

```bash
ping meine-bibel.de
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
und stattdessen das hier hineinschreiben – `meine-bibel.de` durch deine Adresse
ersetzen:

```
meine-bibel.de, www.meine-bibel.de {
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

Ruf **https://meine-bibel.de** im Browser auf. Du solltest die App sehen, mit
Schloss in der Adresszeile.

Für die Rückfragen am Vers noch einmal in der App selbst:

1. Unten oder oben auf **Ich**
2. Runter zu **Rückfragen am Vers**
3. **Eigener Server** anklicken
4. Adresse: `https://meine-bibel.de`
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
| Browser: „Seite nicht erreichbar“ | Die Adresse zeigt noch nicht auf den Server | `ping meine-bibel.de` – kommt deine IP? Sonst warten |
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

## Ohne Terminal

Wenn dir das alles zu viel ist: Anbieter wie **Railway**, **Render** oder
**Fly.io** bauen direkt aus dem Repository und geben dir eine fertige
HTTPS-Adresse. Der Ablauf ist überall ähnlich:

1. Beim Anbieter anmelden, GitHub verbinden, dieses Repository auswählen.
2. Als Bauanleitung `server/Dockerfile` angeben – die liegt schon dabei.
3. Zwei Umgebungsvariablen setzen: `ANTHROPIC_API_KEY` und
   `ENTGEGEN_PASSWORT`. Dazu `ENTGEGEN_PROXY=1`, weil auch dort ein Proxy
   davorsteht.
4. Starten.

Du bekommst eine Adresse wie `entgegen-production.up.railway.app`; eine eigene
Domain lässt sich dort meist mit zwei Klicks daraufsetzen. Teurer als ein
eigener Server ist es meist auch – dafür entfallen Schritte 3 bis 9.
