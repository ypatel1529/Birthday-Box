# Birthday Gift Box (Static Site)

A cute one-page birthday surprise website built with plain HTML, CSS, and vanilla JavaScript.

## Files and folders

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- README.md
`-- assets/
    |-- images/
    `-- audio/
```

Add your photos to `assets/images/` and optional music to `assets/audio/`.

## Personalize content

Open `script.js` and edit:

- `recipientName`
- `boyfriendName`
- `messageText`
- `imageList` (file names only, from `assets/images/`)
- `musicFile` (optional file name from `assets/audio/`)

Example:

```js
const recipientName = "Aanya";
const boyfriendName = "Rohan";
const messageText = "Happy birthday, my love. You are my favorite person.";
const imageList = ["img1.jpg", "img2.jpg", "img3.jpg"];
const musicFile = "song.mp3";
```

## Run locally

You can open `index.html` directly in a browser, or use any local static server.

## GitHub Pages deployment (exact steps)

1. Create a new GitHub repository (for example: `birthday-gift-box`).
2. In that repo, upload these files and folders at the root:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `assets/images/` (with your photos)
   - `assets/audio/` (optional music)
3. Commit and push to the default branch (`main` in most repos).
4. Open your GitHub repo and go to `Settings` > `Pages`.
5. Under `Build and deployment`:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` and folder `/ (root)`
   - Click `Save`
6. Wait for deployment, then open the published link shown in Pages.

Resulting link format:

```text
https://<your-github-username>.github.io/<repo-name>/
```

Example:

```text
https://johndoe.github.io/birthday-gift-box/
```

## Worldwide access note

This project is fully static (no backend), so the link works worldwide (including UK and Canada) as long as GitHub Pages is reachable. You do not need to keep any terminal or local machine running after deployment.