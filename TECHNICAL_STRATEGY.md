# Technical Strategy

## Ziel

App-store-fähige mobile App für iOS und Android.

## Empfohlener Start-Stack

| Bereich | Empfehlung |
|---|---|
| App | Flutter |
| Backend | Supabase |
| Datenbank | PostgreSQL |
| Auth | E-Mail, Apple Login, Google Login |
| Storage | Supabase Storage |
| Payments | Stripe / regulierter Zahlungsfluss, rechtlich prüfen |
| Admin | Web-Admin-Panel |
| Analytics | Privacy-friendly Analytics |
| KI später | Matching, Moderation, Zusammenfassung, Fraud Detection |

## Warum Flutter

- eine Codebasis für iOS und Android
- geeignet für App Store und Google Play
- schnelle MVP-Entwicklung
- gutes UI-Potenzial für Feed/Story-App

## Warum Supabase

- PostgreSQL
- Auth
- Storage
- Realtime
- schnelle MVP-Entwicklung
- später migrierbar

## App-Store-Hinweis

Zahlungen, Spenden, externe Links und In-App-Käufe müssen für Apple App Store und Google Play separat rechtlich und technisch geprüft werden.

Sichere Startlogik:

- App zeigt Stories, Missionen, Kommentare, Reputation
- Zahlungsfluss wird getrennt und sauber reguliert
- keine unklare In-App-Spendenmechanik ohne Prüfung
