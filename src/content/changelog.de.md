# Änderungsprotokoll

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), und dieses Projekt hält sich an [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2026-08-01

### Hinzugefügt
- **Lark Suite Integration** — Bindet Lark/Feishus offiziellen MCP-Server für Nachrichten, Chats, Kalender, Base, Dokumente und Aufgaben über eine Bring-your-own-App-Verbindung ein.
- **LemonSqueezy Integration** — Direkte REST-Brücke zur Verwaltung von Bestellungen, Kunden, Abonnements, Rabatten und Lizenzschlüsseln.
- **Kit (ConvertKit) Integration** — Direkte REST-Brücke zur Verwaltung von Abonnenten, Broadcasts, Sequenzen und Tags.
- **MCP Hub Trennungsunterstützung** — Jeder verbundene Dienst hat jetzt einen Ein-Klick-Weg, um seine Zugangsdaten zu löschen und die Verbindung zu trennen.
- **Audacity Integration** — Steuern Sie eine laufende Audacity-Instanz direkt über ihr eigenes Skriptprotokoll für Audiobearbeitung und Effekte.
- **Apple Notizen, Erinnerungen & Office-Export** — Native Notizen/Erinnerungen-Unterstützung, echter Excel/PowerPoint/Word-Export aus Numbers/Keynote/Pages und Hintergrundentfernung auf dem Gerät.

### Behoben
- **Zuverlässigkeit von Websuche und Zitaten** — Eine Reihe von Problemen mit Recherche-Antworten behoben, darunter verlorene Suchergebnisse, fälschliche "unvollständige Antwort"-Ablehnungen und falsch markierte Zitate.
- **Auffindbarkeit neuer Tools** — Notizen, Erinnerungen, Hintergrundentfernung und die Office-Dokument-Tools sind jetzt bei einfachen Anfragen korrekt erreichbar.
- **Abschluss mehrstufiger Aufgaben** — Fälle behoben, in denen der Agent einen nächsten Schritt beschreiben konnte, ohne ihn auszuführen, oder einen Bericht als erledigt markierte, ohne ihn zu schreiben.
- **Zuverlässigkeit von Gedächtnis & Erinnerung** — "Merke dir das"-Anfragen werden jetzt zuverlässig gespeichert, statt stillschweigend nichts zu tun.
- **Sicherere Tool-Wiederholungslogik** — Ein nach wiederholten Fehlern deaktiviertes Tool erholt sich jetzt automatisch, und dauerhafte Einschränkungen werden sofort gemeldet statt erneut versucht.
- **Genauigkeit von Kalenderdaten** — Einen Fehler behoben, bei dem Termine stillschweigend mit einem falschen Datum gespeichert werden konnten.
- **Stripe- und Git-Integrationskorrekturen** — Stripes Aktionsset nach einer Änderung stromaufwärts korrigiert und die Git-MCP-Integration stabilisiert.
- **Sicherheit bei Datei- und Ordneroperationen** — Randfälle bei Pfadberechtigungsprüfungen und Ordner-Verschiebe-/Kopierverhalten behoben.
- **Allgemeine Zuverlässigkeit** — Kleinere Korrekturen bei Telemetrieübertragung, Browserautomatisierung, Zeitlimitbudgets und Systemlasterkennung.

## [1.0.5] - 2026-07-24

### Behoben
- **Sicherheit von Quellenangaben** — Ein Problem behoben, bei dem der Agent nicht existierende Quell-URLs, Daten oder Versionsnummern zitieren konnte, indem Sicherheitsprüfungen für Zitate in den aktiven Ausführungspfad verschoben wurden.
- **Ausführung zusammengesetzter Anfragen** — Ein Problem behoben, bei dem zusammengesetzte, mehrteilige Anfragen (z. B. gleichzeitig nach Telemetrie und Betriebssystemversion fragen) nur mit einer halben Antwort zurückkommen konnten, indem fehlende Tool-Aufrufe erzwungen werden.
- **Sicherheit bei Shell-Ausgabeumleitung** — Verhinderte, dass einfache Einzeldatei-Shell-Umleitungen (`command > file`) den Binärschutz und die Schreibsicherheitsprüfungen umgehen.
- **Bot-Erkennung & CAPTCHA-Filterung** — Die Websuche erkennt und filtert jetzt CAPTCHA-/Bot-Herausforderungsseiten von Suchmaschinen heraus, um zu verhindern, dass das Schlussfolgern durch Herausforderungstext beeinflusst wird.
- **Google-Suche JS-Stabilisierung** — Verbesserte Google-Suchergebnisabfrage durch Warten auf den Abschluss des clientseitigen JavaScript-Renderings.
- **Safari-Fallback-Robustheit** — Öffnet bei Bedarf tatsächlich sichtbare Safari-Tabs für die Such-Fallback mit klarer Berechtigungsanleitung.
- **Biometrie- & Schlüsselbund-Nebenläufigkeit** — Touch-ID-Timeout-Handling behoben und Hintergrund-Schlüsselbund-Lesevorgänge daran gehindert, Tool-Verfügbarkeitsprüfungen zu blockieren.
- **Daemon-Wiederholungslimits** — Verhindert, dass fehlgeschlagene Hintergrund-Daemon-Verbindungen unbegrenzt erneut versucht werden.

### Hinzugefügt
- **Recherche nach maßgeblichen Quellen** — Der Agent priorisiert jetzt offizielle Projektdaten, strukturierte Spezifikationen und direkte Dokumentation gegenüber Drittanbieter-Suchausschnitten.
- **Erweiterte GitHub-Toolsets** — Zugriff für GitHub Actions, Codesicherheit, Dependabot, Diskussionen, Advisories, Gists, Projekte, Labels und Benachrichtigungen hinzugefügt.

## [1.0.4] - 2026-07-06

### Hinzugefügt
- **MCP-Tool-Brücken** — Pheron Agent integriert sich jetzt mit externen Model-Context-Protocol-(MCP)-Servern, einschließlich Git, Playwright-Browserautomatisierung, Perplexity-Websuche, Stripe, GitHub, Notion, Unreal Engine und Zapier.
- **MCP Hub & Verbindungen** — Ein spezieller Karten-Raster-Assistent unter Einstellungen > Verbindungen hinzugefügt, um Zugangsdaten für externe Tool-Verbindungen einfach zu konfigurieren, zu speichern und zu testen.
- **Kontextbezogene Empfehlungen** — Der Agent schlägt jetzt vor, fehlende Integrationen unter Einstellungen > Verbindungen zu verbinden, wenn eine Aufgabe ein zugangsdatengeschütztes Tool erfordert.
- **Einheitliches Bildschirm- & Barrierefreiheits-Schlussfolgern** — Bildschirmaufnahme-Beschreibungen, OCR und AX-Baum-Analyse für kohärentere und zuverlässigere Browser-/Bildschirm-bezogene Aktionen verkettet.
- **Lokales Benutzerprofil** — Vom Agenten entdeckte Präferenzen und Benutzeridentitätsinformationen werden jetzt in einem lesbaren Markdown-Profil (`UserProfile.md`) gespeichert.
- **Neugestaltung des Leistungstabs** — Die Tabs "Zustand" und "Analytik" unter Einstellungen wurden zu einem einzigen Tab mit Echtzeit-Trenddiagrammen für CPU-, Speicher- und Geschwindigkeitsnutzung zusammengeführt.
- **Festplatten-Telemetrie-Unterstützung** — Telemetrieberichte enthalten jetzt neben CPU- und Speicherstatistiken auch den freien Speicherplatz des Startvolumes.

### Behoben
- **Kontext bei mehrteiligen Unterhaltungen** — Kontextverlust zwischen aufeinanderfolgenden Runden im selben Unterhaltungsthread behoben, sodass der Agent den unmittelbaren Kontext behält.
- **Modell-Kontextlimits** — Skalierungsprobleme beim lokalen Modell-Kontextbudget korrigiert, die nutzbare Token-Fenster auf Systemen mit mehr RAM künstlich einschränkten.
- **Behebung von Gedächtnisschleifen** — Eine Tool-Aufruf-Schleife behoben, die beim Nachschlagen von Benutzer-Erinnerungsdetails ausgelöst wurde (z. B. "erinnerst du dich an meinen Namen?").
- **Schlüsselbund- & Authentifizierungsstabilität** — OAuth-Flow-Callbacks für Notion/Zapier behoben und gelöschte Schlüsselbund-Einträge während lokaler Testausführungen wiederhergestellt.
- **Leistung beim Aufgabenwechsel** — Hintergrundprozesse und Befehlsausführungen werden bei Zeitüberschreitung oder Aufgabenabbruch sofort gestoppt, um CPU-Lecks zu verhindern.
- **Türkisches Präpositions-Routing** — Einen Fehlleitungsfehler behoben, bei dem türkische Prompts mit "üzerinden" (über) fälschlicherweise an den Mathematik-/Berechnungspfad gesendet wurden.

## [1.0.3] - 2026-06-19

### Hinzugefügt
- **Persönliches Gedächtnis & Erinnerung** — der Agent erinnert und zeigt jetzt zuverlässig Fakten, die Sie ausdrücklich mitgeteilt haben (Hintergrund, Lebenslauf, Präferenzen), wenn Sie danach fragen; eine tiefe Abruflücke geschlossen, bei der gespeicherte Fakten praktisch unauffindbar werden konnten
- **Mehrsprachige Datei-/Ordnerbefehle** — Anfragen im Stil "diesen Ordner organisieren" werden jetzt in 13 Sprachen erkannt (ES, FR, DE, PT, IT, RU, ZH, JA, KO, AR neben TR/EN hinzugefügt), nicht nur Türkisch/Englisch
- **MusicDNA-Berichtsaktionen** — Analyseergebnisse enthalten jetzt Schaltflächen "Bericht öffnen" und "Im Finder anzeigen", um direkt zu den generierten `.dna.md`-/`.report.plist`-Dateien zu springen
- **Telemetrie — Supabase-Integration:** Alle Telemetrieereignisse laufen jetzt über `telemetry_events` mit authentifizierten Anfragen, Wiederholungslogik und einem synchronen Flush beim Beenden
- **Energieverfolgung — IOKit-basiert:** Echte CPU+GPU+ANE-Joule-Messungen über `powermetrics`, live in der Menüleisten-Aufwandsanzeige dargestellt
- **Analytik standardmäßig aktiviert:** Analytik ist jetzt standardmäßig aktiviert, wenn keine explizite Präferenz festgelegt ist

### Behoben
- **Kontextverlust nach einer Rückfrage** — Die Beantwortung der Rückfrage des Agenten (z. B. "welches Datumsformat?") konnte die Unterhaltung zuvor zu irrelevanten Ergebnissen führen (eine versehentliche "ram"-Teilstring-Übereinstimmung leitete diese Antworten falsch); der Agent bleibt jetzt nach Ihrer Antwort bei der ursprünglichen Aufgabe
- **Schnellere Antworten beim persönlichen Erinnern** — Eine verschwendete Schlussfolgerungsrunde eliminiert, wenn der Agent etwas nachschlägt, das Sie ihm zuvor mitgeteilt haben
- Apple Music-Wiedergabe und Lautstärkeregelung: Die Bestätigung spiegelt jetzt den tatsächlichen Player-Status wider, wodurch stille Fehler behoben wurden, wenn Music nicht bereits lief
- Telemetrie: RAM-/Inferenzmetriken und Authentifizierung melden keine veralteten oder Nullwerte mehr; fehlgeschlagene Analytik-Batches schlagen nicht mehr stillschweigend fehl
- Debug-Builds werden jetzt mit dem korrekten Entwicklerteam signiert, wodurch fehlende Berechtigungen behoben wurden

## [1.0.2] - 2026-06-03

### Hinzugefügt
- **Hintergrund-Aufgabenverarbeitung** — Starten Sie eine neue Unterhaltung, während eine Aufgabe noch läuft; die alte Unterhaltung bleibt mit einer ⟳-Anzeige in der Seitenleiste und wird im Hintergrund fortgesetzt
- **Aufgabenunterbrechung** — Die Stopp-Schaltfläche (und die Escape-Taste) bricht eine laufende Aufgabe während der Ausführung ab
- **Model Hub** — vollständiger Modellkatalog: über 30 lokale MLX-Modelle (Qwen3, Llama 4, Gemma 3/4, Mistral, Devstral, Phi-4, DeepSeek) in einem dreispaltigen Raster; hardwareadaptive Anzeige
- **VLM-(Vision)-Unterstützung** erweitert: Qwen2.5-VL 7B für Systeme mit 48 GB+ hinzugefügt
- **Hilfe → Modellkatalog**-Dokumentationsabschnitt mit vollständigen Dateilisten und RAM-Anforderungen
- **Lizenz-Deep-Link** — `pheron://activate?key=...`-URL-Schema für Ein-Klick-Aktivierung
- Qwen3 Dense: 0,6B · 1,7B · 4B · 8B · 14B · 32B
- Qwen3 MoE: 30B-A3B · Coder-30B-A3B · Next-80B-A3B · 235B-A22B · Coder-480B-A35B
- Llama 4 Maverick (512 GB)
- Mistral Small 3.2 24B · Devstral Small 24B · Mistral Large 123B · Devstral 2 123B
- DeepSeek V4 Flash (192 GB)
- VLM: Qwen2.5-VL 7B (48 GB+)

### Geändert
- Sitzungstitel verwenden jetzt die erste Nachricht statt des Modellnamens
- Model-Hub-VLM-Abschnitt wird separat angezeigt
- Der Tab Einstellungen → KI enthält jetzt den Abschnitt Konfiguration
- Zuverlässigkeitsverbesserungen bei WebSearchTool

### Behoben
- Das Lizenzaktivierungsfenster wird beim Öffnen mit einem vorausgefüllten Schlüssel jetzt korrekt neu erstellt

## [1.0.1] - 2026-06-01

### Geändert
- Minimaler RAM in allen Dokumenten und in der Info.plist auf 16 GB aktualisiert

### Behoben
- Anzeige der privaten Relay-Apple-ID im Profilbereich (zeigt "Apple-Account" + Apple-Logo)
- Größenänderung des Einstellungsfensters für die Tabs Profil und Analytik
- Fehlender Eintrag "Rückerstattungsrichtlinie" im Hilfemenü
- Pfad des In-App-Hilfebundles (Dokumente wurden nicht geladen)
- Navigationspfade der Dokumentations-UI durchgehend korrigiert

## [1.0.0] - 2026-06-01
Öffentliche Veröffentlichung

### Hinzugefügt
- Anmeldung mit Apple über Supabase-Authentifizierung
- Lizenzaktivierung über Lemon Squeezy

### Behoben
- Das Einstellungsfenster passt seine Größe jetzt automatisch an den Tab-Inhalt an
- Größenkorrektur des Analytik-Tab-Fensters (asynchrones Laden von Daten)
- Größenkorrektur des Profilbereich-Fensters
