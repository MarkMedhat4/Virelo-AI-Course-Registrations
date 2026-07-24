# Virelo Academy — AI Course Landing Page + Registration

Responsive landing page + registration form for **أساسيات الذكاء الاصطناعي للأطفال**.
Built with plain HTML5 / CSS3 / vanilla JavaScript — no frameworks, no build step — and connects directly to Google Sheets.

## Folder structure

```
project/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   └── logo.jpg
│   └── icons/
└── README.md
```

---

## 1) Run locally

Open `index.html` directly in the browser, or serve it:

```bash
npx serve .
# or
python3 -m http.server 8000
```

---

## 2) Create the Google Sheet

1. Create a new Google Sheet.
2. In row 1, add these column headers, in this order:

```
registration_date | student_name | grade | parent_name | parent_phone | computer_experience | has_computer
```

## 3) Open Apps Script

From the Sheet: **Extensions → Apps Script**. Delete any starter code.

## 4) Paste the code

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.registration_date,
      data.student_name,
      data.grade,
      data.parent_name,
      data.parent_phone,
      data.computer_experience,
      data.has_computer,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Save the project (e.g. name it `Virelo Registration`).

## 5) Deploy as Web App

1. **Deploy → New deployment**.
2. Type: **Web app**.
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy** and approve the permissions prompt.

## 6) Copy the deployment URL

You'll get a URL like:

```
https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec
```

## 7) Paste the URL inside script.js

Open `js/script.js` and set the constant at the top of the file:

```javascript
const SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec";
```

> If you edit the Apps Script code later, redeploy via **Deploy → Manage deployments → Edit → New version**, or the live URL will keep serving the old code.

## 8) Push to GitHub

```bash
git init
git add .
git commit -m "Virelo Academy landing page"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## 9) Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the GitHub repo.
   Or use the CLI:

```bash
npm i -g vercel
vercel
```

2. It's a static site, so no build configuration is needed.

## 10) Test the registration

Fill out the form on the live URL and confirm a new row appears in your Google Sheet within a few seconds.

---

## Brand colors

Base identity (matches the Virelo Academy logo) plus small accent highlights, all defined once in `css/style.css` under `:root`:

```css
:root{
  /* Base — navy & gold, from the logo */
  --navy-900:#071A3D;
  --navy-700:#0E295D;
  --gold:#D9A441;
  --gold-light:#F6C86B;

  /* Accents — used sparingly (icons, gradients, focus states) */
  --accent-blue:#0F62FE;
  --accent-purple:#6C63FF;
  --accent-green:#00C896;

  --bg:#F7FAFC;
  --text:#1E293B;
}
```

## Changing the logo

Replace `assets/images/logo.jpg` with your own file (same name), or update the `src` attributes in `index.html` (`.navbar__logo`, `.footer__brand img`, `.loader__logo`, and the `<link rel="icon">` favicon tag).

## Changing the Facebook link

The clickable location text points to the Virelo Academy Facebook page in `index.html`, inside `.info-card`:

```html
<a href="https://www.facebook.com/profile.php?id=100085412768099" target="_blank" rel="noopener">
```

## Features

- ✅ Fully responsive (desktop / tablet / mobile), RTL Arabic throughout
- ✅ Floating-label inputs, glassmorphism navbar, gradient buttons with a ripple effect
- ✅ Scroll-reveal animations + animated timeline progress line
- ✅ Course info card (price, duration, clickable location) with icon accents
- ✅ Full Arabic inline validation, including Egyptian phone number format
- ✅ Loading state on submit + animated success modal
- ✅ Google Sheets integration via Apps Script `doPost(e)`, returning a JSON response
- ✅ SEO meta tags, Open Graph tags, and favicon
- ✅ No inline CSS/JS, no external dependencies besides Google Fonts and Font Awesome
