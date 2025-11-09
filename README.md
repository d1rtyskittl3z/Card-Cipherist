# 🧙‍♂️ Card Cipherist: The Local Resurrection

---
🚧🧙‍♂️ **Under Construction (By Order of the Arcane Engineers)** ⚙️🚧

Welcome, traveler! You’ve stumbled upon a workshop mid-summoning.
The circuits hum, the runes flicker, and the dev console screams in multiple languages.

This realm — a fusion of magic and TypeScript — is currently being reforged by tired wizards and caffeinated automatons. Please mind the loose pixels, wandering tooltips, and unbound variables.

What to Expect:

- 🧙‍♂️ *Wizards refactoring in the shadows*
- 🪄 *Mana leaks detected (investigating)*  
- 🐛 Minor familiars (bugs) may roam freely; do not feed them.
- ⚙️ *React components aligning their cosmic props*  
- 🌀 *CSS portals collapsing unpredictably*

If you see a working feature, praise the mana gods, **don’t question it** — it’s probably a miracle. 
If something doesn’t, that’s just **“early access enchantment”**.
Soon this project shall rise in full glory… once the build pipeline stops leaking ethereal smoke.


### 🕓 ETA
Whenever the next full moon aligns with `npm run build` and succeeds three times in a row.

#### Here is a list of currently supported Frame Packs: 
##### Standard Frames
<div style="columns:3;"> <ul> <li>Regular Frames</li> <li>Enchantment Frames (Nyx)</li> <li>Legend Crowns</li> <li>Floating Legend Crowns</li> <li>Inner Crowns</li> <li>Nicknames</li> <li>Smooth Nickname Legend Crowns</li> <li>Miracle</li> <li>Holo Stamps</li> <li>Dark Power/Toughness</li> <li>Colored Borders</li> <li>Color Identity Pips</li> <li>"The List" Stamp</li> <li>Lands</li> <li>Spree</li> <li>Attractions</li> <li>Snow</li> <li>Conspiracies</li> <li>Colorshifted</li> <li>Brawl Legend Crowns</li> <li>Stations Regualr and Borderless</li></ul> </div>

##### Tokens
<div style="columns:3;"> <ul> <li>Regular</li> <li>Textless</li> <li>Textless (Borderless)</li> <li>Tall</li> <li>Short</li> <li>Monarch Token</li> <li>Marker Card</li> <li>Initiative Token</li> <li>Planeswalker Emblems</li> <li>Regular (Bordered M15)</li> <li>Textless (Bordered M15)</li> </ul> </div>

##### Sagas
<div style="columns:3;"> <ul> <li>Regular</li> </ul> </div>

##### Planeswalker
<div style="columns:3;"> <ul> <li>Regular</li> </ul> </div>

##### Modal DFC's
<div style="columns:3;"> <ul> <li>Regular</li> </ul> </div>

##### Transform
<div style="columns:3;"> <ul> <li>Regular (Front)</li> </ul> </div>

##### Showcase Frames
<div style="columns:3;"> <ul> <li>Avatar Elemental (TLA)</li> <li>Universes Beyond</li> <li>Universes Beyond (Full art)</li> <li>Universes Beyond (Extended art)</li> <li>Legend Crowns (Universes Beyond)</li> <li>Floating Legend Crowns (Universes Beyond)</li> <li>Nickname ("Godzilla")</li> <li>Extended Art (Regular)</li> <li>Etched</li> <li>M21 Signature Spellbooks</li> <li>Oil Slick</li> <li>Wanted Poster</li> </ul> </div>

##### Universes Beyond
<div style="columns:3;"> <ul> <li>Universes Beyond</li> <li>Full art</li> <li>Extended art</li> <li>Legend Crowns</li> <li>Floating Legend Crowns</li> </ul> </div>

##### Promos (Tall Art)
<div style="columns:3;"> <ul> <li>Regular Frames</li> <li>Borderless Frames</li> <li>Nyx Frames</li> <li>Extended Art Frames</li> <li>Nickname Frames</li> <li>Generic Showcase</li> </ul> </div>

##### Textless/Fullart
<div style="columns:3;"> <ul> <li>Edge of Eternities Basics</li> <li>Kamigawa Basics</li><li>Fullart Basics (2022)</li> <li>Fullart Basics (Universes Beyond)</li> <li>Fullart Basics (SNC)</li> <li>Fullart Basics (THB)</li> <li>Fullart Basics (ZEN)</li> <li>Fullart Snow Basics</li> <li>Unfinity Basics</li> <li>Unstable Basics</li> <li>Generic Showcase</li> <li>Magic Fest Promos</li> </ul> </div>

##### Custom</li>
<div style="columns:3;"> <ul> <li>Neon</li> </ul> </div>

##### Accurate Frames
<div style="columns:3;"> <ul> <li>Regular Frames</li> <li>Extended Art Frames</li> <li>Legend Crowns</li> <li>Inner Crowns</li> <li>Full Art</li> <li>Snow</li> <li>Nyx</li> <li>Universes Beyond</li> <li>Legend Crowns (Universes Beyond)</li> </ul> </div>

##### 1/8th Inch Margin</li>
<li>Generic Margins</li> </ul> </div>

---

Once the go-to online card generator for Magic: The Gathering fans, Card Conjurer was a labor of love—crafted by a devoted player and embraced by the community. That is, until November 2022, when Wizards of the Coast issued a cease and desist that took the beloved site offline.

This repository is a phoenix rising from those ashes: a standalone Electron-React port of the original Card Conjurer, rebuilt and extended to run locally, free-ish from takedowns and full of potential. Templates live on here, maintained in perpetuity for creators who refuse to let great tools vanish.

Fueled by copious caffeine, a dash of Vibe-Coding, and a generous helping of profanity, this project is both homage and evolution. Welcome to the conjuring circle—let’s make some cards.

# 🛠️ Installation
Card Cipherist requires [Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Install according to your operating system.

## Setting up the Development Environment
```sh
# Clone the repo
git clone https://github.com/d1rtyskittl3z/Card-Cipherist.git
cd Card-Cipherist

# Install dependencies
npm install

# Start the app
npm run dev
# Alternaively you can open a the app in a browser instead
npm run dev:web

```
## 🧯 Troubleshooting
- App won’t start after install.Try deleting node_modules and reinstalling:

```sh
#Inside your application directory
rm -rf node_modules
npm install
```
- Blank screen on launch. Make sure you’re using a compatible Node version (v18+). Also check for errors in the console.

# 🤝 Contributing
Pull requests are welcome! If you have ideas for new templates, features, or bug fixes, feel free to fork and submit a PR. Just keep the tone fun and the code clean.

<!-- ## 🎨 Template Creation & Customization
Want to conjure your own card styles? Here's how to create and customize templates:

## 🧱 Template Basics
Templates live in src/templates/

Each template includes:

A background image or frame

Font settings

Layout rules for text boxes, mana symbols, and art

Optional overlays or effects

🖌️ Adding a New Template
Create a new folder inside src/templates/ with your template name.

Add your assets (e.g., frame.png, font.ttf, etc.).

Define layout in a config.json file:

```json
{
  "name": "Custom Sorcery",
  "font": "Beleren-Bold.ttf",
  "textBoxes": {
    "title": { "x": 50, "y": 30, "width": 400, "height": 40 },
    "rules": { "x": 50, "y": 300, "width": 400, "height": 200 }
  }
}
```

Restart the app to see your new template in the dropdown menu. -->

<!-- ## 🧪 Tips
1. Use high-res assets for crisp exports.

2. Keep text box padding generous for long card names or rules text.

3. Test with multiple card types to ensure layout flexibility. -->

## 📅 Changelog

[v0.0.1a] - TBD
* Initial alpha release of the Electron-React port for testing and bug reporting.

<!-- [v1.0.0] - To be Determined
* Initial release of the Electron-React port -->

# 📜 License
This project is released under GNU AGPLv3 (🧙‍♂️ Mages are still contemplating, this could change).
