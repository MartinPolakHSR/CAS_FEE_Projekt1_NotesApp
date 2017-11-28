# CAS_FEE_Projekt1
HSR FrontEndEngineering Projekt1



## Anleitung


# Repo klonen
git clone https://github.com/MartinPolakHSR/CAS_FEE_Projekt1_NotesApp


# NPM-Dependencies installieren (in package.json definiert)
npm i

# Applikation starten
npm start

Browser öffnen URL http://localhost:3000




## Funktionsumfang

- Der Funktionsumfang ist in den Wire-Frames dargestellt. Diese beinhalten u.a.
  - Anzeigen, editieren und erfassen von Notizen
  - Sortieren von Notizen
  - Filtern von "abgeschlossenen" Notizen
  - Abspeichern der Daten auf dem Server
  - Wechseln des Styles


## Allgemeine Code Guidelines
  - Unterst?tzung modernen Browsers & Features (ältere Browser können vernachlässigt werden)
    - CSS3+, HTML5+, ES6+
  - Saubere Trennung von Struktur (HTML/HBS), Logik (JS) und Darstellung (CSS)
  - Sauberen Code
    - DRY: Kein Copy-Paste-Code (auch keine '?hnlicher Code'!)
    - Keine langen Methoden
    - Sprechende, konsistente Benennung von Variablen
    - Kein CSS / JS im HTML
    - Übersichtliche Projekt-Struktur


## Bewertung

**JavaScript**

 - Nutzung einer Template Engine auf dem Client (z.B. Handlebars)
 - Keine Console Pollution
 - Kein auskommentierter Code
 - Kein global namespace pollution

**CSS**
 - FlexBox
 - keine Float-, Table- oder Inline Layouts
 - keine unnötigen Klassen & ID's (Elemente über Struktur/Name selektieren)
 - Inline Styles & Inline-Style-Klassen sind nicht erlaubt

**HTML**
 - Korrekter Einsatz von Semantischem HTML
 - Sinnvolle HTML Validation


## Architektur
- REST: Server und Client kommunizieren über JSON bzw. x-www-form-urlencoded
- Client:
  - Server-Calls nur im Service Layer
  - Routing/Event-Handling nur im Controller
  - Rendering/DOM Manipulation nur in der View
  - View und Controller können im gleichem File definiert werden.
  - Kein HTML Zusammenbasteln aus String => Handlebars verwenden
- Server
  - Memory-Storage- / DB-Zugriffe nur im Service
  - Controller stellt Actions/Request-Handlers zur Verf?gung
  - Router: Verknüpfung von Routen und Actions/Request-handlers
