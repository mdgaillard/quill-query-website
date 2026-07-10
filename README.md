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

## Artwork (`images/`)

Cast: **Munin** is the dragon (guards the hoard); **Quill** is the raven
(carries the letters). All artwork is in place.

- `images/quill-icon.png` — Munin mark, background removed to transparency;
  sits beside the header title on every page and in the About sidebar
- `images/starlit-study.png` — painted study desk (homepage hero)
- `images/meet-munin.png` — Munin curled on his hoard (Meet Munin section)
- `images/raven-pixel.png` — Quill the raven with an envelope (404 page)
- `images/raven-dragon.png` — Quill perched on the sleeping Munin (Contact)

The Data Warden mini-game is embedded on the homepage from
`https://mdgaillard.github.io/the-data-warden/`.

## Status

🚧 Prototype

## Local preview

Any static server works, e.g.:

```sh
python3 -m http.server 8000
```
