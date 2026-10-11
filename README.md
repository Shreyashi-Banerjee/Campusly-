# Campusly — Official Event Hub | IEM Kolkata CSE (AIML)

Campusly is the unified, high-octane digital event discovery and registration portal for the Department of Computer Science & Engineering (Artificial Intelligence and Machine Learning) at the **Institute of Engineering & Management (IEM), Kolkata**.

## 🚀 Key Features & Makeover Highlights

- **Branding & Visuals**: Completely revamped from the ground up with the title **Campusly**, glassmorphic navigation bar, ambient gradient lighting, modern typography (Outfit, Plus Jakarta Sans, JetBrains Mono), and curated color palettes.
- **Card-Based UI Architecture**:
  - **Spotlight Countdown Card**: Dynamic countdown timer to nearest upcoming event, Add to Calendar (`.ics`), and live Kolkata IST clock.
  - **Bento Highlights Grid**: Interactive feature cards showcasing certificates, duty leave (OD) waivers, tier-1 mentorship, and prize pools.
  - **Event Cards**: Category pills, live status tags, perks, and direct registration actions.
  - **Interactive 12-Card Gallery**: Real IEM event photos and campus moments with filter tabs (Innovacion & Fests, Hackathons, Robotics, Cultural) and a full-featured Lightbox modal.
  - **Student Pass Voucher Modal**: Generates an official event ticket with pass ID, student details, and QR verification with celebratory canvas confetti.
  - **FAQ Accordion Cards**: Smooth animated accordions answering top student queries.
- **Micro-Animations & Effects**: Smooth scroll progress bar, scroll-reveal entrance, pulse indicators, hover card lifts, live search, and dynamic number counters.
- **Dark & Light Mode**: Seamless theme toggle persisted in `localStorage`.

## 📁 Project Structure

- `index.html` — Main semantic HTML structure.
- `css/style.css` — Modern design system, card styles, dark/light theme tokens, and animations.
- `js/script.js` — Interactive logic (countdown, live search, category filtering, gallery lightbox, validation, confetti, calendar invite, and ticket voucher modal).
- `images/` — Real photos from IEM Kolkata campus and fests:
  - `iem-hackathon-stage.jpg`
  - `iem-innovacion-hall.jpg`
  - `iem-cultural-fest.jpg`
  - `iem-computing-lab.jpg`
  - `iem-auditorium-session.jpg`
  - `iem-tech-symposium.jpg`
  - `iem-campus-building.jpg`
  - `gallery-robotics-arena.jpg`
  - `gallery-hackathon-night.jpg`
  - `gallery-cultural-concert.jpg`
  - `gallery-ai-workshop.jpg`
  - `gallery-innovacion-stage.jpg`
  - `gallery-code-battle.jpg`
  - `logo.svg`

## 💻 Running the Site

Open [index.html](file:///Users/aneesh/Downloads/college-event-site/index.html) in any web browser, or serve it locally:

```bash
python3 -m http.server 8080
```
Then visit `http://localhost:8080`.
