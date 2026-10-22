# Victory Studio website + campaign manager
Plain HTML, CSS and JavaScript, so it is free to host and easy to edit.

## Put it on GitHub (free hosting with GitHub Pages)
1. Create a free GitHub account, then a new public repository (e.g. `victory-studio`).
2. Upload everything in this folder (keep the folders `css`, `js`, `assets`).
3. Repository Settings > Pages > Source: Deploy from a branch > `main` / root > Save.
4. After a minute your site is live at `https://<your-username>.github.io/victory-studio/`.

## Editing later
- Website text: `index.html` (replace the [BRACKETED] placeholders)
- Logo: replace `assets/logo.jpg` (same file name)
- Colours and look: top of `css/style.css`
- Campaign manager: `app.html` and `js/app.js`
Edit a file on GitHub with the pencil icon, then Commit. The site updates in about a minute.

## Good to know
- Campaign data is saved in the browser you use. Use Dashboard > Download backup regularly.
- Anyone can open app.html, but they only see data saved in their own browser.
- Client approvals: the app copies a message to send by WhatsApp or email; you set the status yourself.
- Assistant tab: type commands like `task Edit reels for [campaign] due friday` or `remind me to call Acme on monday`. It runs in the browser (free). For phone reminders even when the app is closed, use Download calendar (.ics) and open it on your phone.

## Editing your website (easy)
Open `js/config.js` on GitHub (pencil icon). Add your WhatsApp number, email, social links, package prices, testimonials and gallery file names. Upload photos into `assets/gallery/`. Commit, and the site updates in about a minute.
- AI: in the Assistant tab, paste a free Google Gemini key under AI setup. The key stays in your browser. If AI stops working, change the model name in that box to a current Gemini model from ai.google.dev.
- Catalogue page: `catalogue.html` reads its services and prices from `js/config.js` (the `catalogue` list). Change a price there and it updates. The gallery on the homepage hides itself until you add photos to `gallery` in `config.js`.
