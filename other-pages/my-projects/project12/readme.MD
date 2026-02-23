# Reddit Client (Vanilla JS)

This is a small practice project where I built a Reddit client with plain JavaScript and Tailwind utility classes.

Main goal here was to practice:
- fetching data from an API
- rendering dynamic UI from returned JSON
- managing simple UI state (open/close popup, add/remove subreddit lanes)

## What it does

- Opens a popup where you can type a subreddit name.
- Fetches posts from Reddit using:

```txt
https://www.reddit.com/r/{subreddit}.json
```

- Creates a subreddit card with:
  - subreddit name
  - post title
  - author
  - up votes
  - number of comments
  - link to open the post on Reddit
- Lets you add multiple subreddits.
- Lets you remove a subreddit card with `Delete Subreddit`.

## Stack

- HTML
- Tailwind CSS (CDN)
- Vanilla JavaScript
- Reddit public JSON endpoint

## Files

- `index.html` - app structure and Tailwind-based UI.
- `script.js` - fetch logic, popup behavior, and dynamic rendering.
- `LICENSE` - MIT license.

## How to run

live demo:

## Notes

- This project is frontend-only.
- Data is not stored, so everything resets on refresh.
- It is focused on API + DOM practice, not full production error handling yet.
