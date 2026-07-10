# The Quill & the Query

The professional site of a clinical research director, medical writer, and data
systems architect — a modern illuminated manuscript crossed with soft retro
computing. Plain HTML/CSS/JS; no framework, no build step. Professional portfolio website showcasing clinical research,
scientific communication,
interactive visualizations,
and whimsical educational software.

## Structure

| File | Page |
| --- | --- |
| `index.html` | Home — constellation hero, About Me, Meet Munin, The Data Warden game, featured publications, pull-quote band |
| `about.html` | About — "The Library": narrative plus at-a-glance panel |
| `archive.html` | Archive — publications list with hover-reveal summaries |
| `map-room.html` | Map Room — vertical career timeline |
| `capabilities.html` | Capabilities — "The Bestiary": six-cell skills grid |
| `field-notes.html` | Field Notes — coming soon |
| `contact.html` | Contact — "Send a Raven" |
| `404.html` | Not-found page — "The raven lost this scroll." |
| `game/index.html` | The Data Warden — Munin's archive-guarding mini-game, embedded on the homepage |
| `css/style.css` | Single shared stylesheet |
| `js/main.js` | Constellation canvas, fade transitions, archive search, artwork fallbacks, publication-row reveal |

## Design

- **Palette:** cream `#FAF7F0` · parchment `#F2EDE2` · deep plum `#3D2C45` ·
  dusty lavender `#A99BB8` · antique gold `#B08D3E`
- **Type:** Cormorant Garamond (display) · EB Garamond (body) · IBM Plex Mono
  (data/labels only), loaded from Google Fonts
- All motion (twinkling stars, fades, hover transitions) respects
  `prefers-reduced-motion`.

## Placeholders to swap before launch

- Publication entries in `index.html` and `archive.html` (marked in-page)
- Timeline milestones in `map-room.html`
- Contact email in `contact.html` (`hello@example.com`)
- ORCID and LinkedIn links (currently inert)
- Artwork files, dropped into `images/` with these exact names
  (pages show an elegant dashed frame until each file exists):
  - `images/starlit-study.png` — painted starlit study desk (homepage hero)
  - `images/meet-munin.png` — the dragon Munin curled on his hoard (Meet Munin section)
  - `images/raven-pixel.png` — pixel raven Quill with envelope (404 page)
  - `images/raven-dragon.png` — watercolor raven atop dragon (Contact)
  - `images/quill-mark.png` — line-art quill-and-dragon mark (About sidebar)

## Status

🚧 Prototype

## Local preview

Any static server works, e.g.:

```sh
python3 -m http.server 8000
```
