# Netflix OTP Grabber

Simple static website that fetches Netflix OTP codes from Gmail API. Deploy to Vercel.

## Deployment to Vercel

### 1. Setup Gmail OAuth (One-time)

#### Step A: Create Google Cloud Project
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project → Name: "Netflix OTP Bot"
3. Enable APIs:
   - Gmail API
   - Google Identity

#### Step B: Configure OAuth Consent Screen
1. Go to "OAuth consent screen"
2. Select "External" → "Create"
3. Fill required fields:
   - App name: "Netflix OTP Grabber"
   - User support email: your email
   - Developer contact: your email
4. Click "Save and Continue"

#### Step C: Create OAuth Client ID
1. Go to "Credentials" → "+ Create Credentials" → "OAuth client ID"
2. Application type: "Web application"
3. Authorized redirect URIs (1 entry only):
   ```
   http://localhost:3000/oauth2callback
   ```
4. Copy "Client ID" and "Client Secret"
5. Save both values

#### Step D: Get Refresh Token
Run this script:
```bash
node get-refresh-token.js
```
- Paste Client ID → Get URL
- Open in browser → Autorize
- Copy Refresh Token → Save it!

### 2. Test Locally

```bash
# Install dependencies
npm install

# Test Gmail connection
npm start
```

### 3. Deploy to Vercel

```bash
# Install Vercel globally
npm i -g vercel

# Login (first time)
vercel login

# Deploy
cd gmailxcfxnt
vercel

# Set environment variables on Vercel Dashboard
# OR run interactively:
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add GOOGLE_REFRESH_TOKEN
```

### 4. Push to GitHub

```bash
git add .
git commit -m "Initial deploy"
git branch -M main
git push -u origin main
```

Then import repo in Vercel Dashboard.

### 5. Done!

Your app is live at Vercel URL!

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_CLIENT_ID` | Yes | OAuth Client ID from Google Console |
| `GOOGLE_CLIENT_SECRET` | Yes | OAuth Client Secret from Google Console |
| `GOOGLE_REFRESH_TOKEN` | Yes | Gmail refresh token (from get-refresh-token.js) |
| `EMAIL_CONTACT_1` | No | Override email 1 (default: `tinkly02grahams@icloud.com`) |
| `EMAIL_CONTACT_2` | No | Override email 2 (default: `semis.settee0c@icloud.com`) |
| `EMAIL_CONTACT_3` | No | Override email 3 (default: `stone-lend.0d@icloud.com`) |

---

## How It Works

1. User opens website
2. Clicks "Check Tinkly"/"Check Semis"/"Check Stone" button
3. Site calls `/api/refresh?email=xxx`
4. API fetches Netflix emails from Gmail API
5. Results displayed on page

**Filter excludes:**
- Reset password emails
- "Kode verifikasimu" emails
- Change password notifications