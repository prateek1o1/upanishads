# Upanishads — Personal Study

A web-based study application for the 12 principal Upanishads with Sanskrit text, transliteration, word-by-word meanings, English translations, and Shankara Bhashya commentary.

## Features

- **12 Principal Upanishads**: Isha, Kena, Katha, Prashna, Mundaka, Mandukya, Taittiriya, Aitareya, Chandogya, Brihadaranyaka, Shvetashvatara, Kaushitaki
- **Sanskrit & Transliteration**: Original verses with IAST transliteration
- **Word-by-Word Meanings**: Anvaya for each verse
- **Shankara Bhashya**: Commentary in Sanskrit and English
- **Progress Tracking**: Mark verses as read, track overall progress
- **Bookmarks & Notes**: Save favorite verses and personal reflections
- **Search**: Find verses by keywords, tags, or content
- **Daily Verse**: A different verse each day
- **Dark/Light Theme**: Parchment-inspired design
- **Offline Support**: PWA with service worker caching

## Usage

Open `index.html` in a browser. No build step required.

## Structure

```
upanishads/
├── index.html          # Home page with all upanishads
├── upanishad.html      # Verse list for a single upanishad
├── verse.html          # Single verse detail view
├── data/               # JSON files for each upanishad
├── js/                 # JavaScript modules
├── css/                # Styles
└── manifest.json       # PWA manifest
```

## Data Format

Each upanishad JSON contains:
- Metadata (name, Sanskrit name, tradition, summary)
- Verses with Sanskrit, transliteration, word meanings, translation, Shankara Bhashya

## License

Educational use. Sanskrit texts are in the public domain.
