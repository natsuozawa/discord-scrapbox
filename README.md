# discord-scrapbox
Discord Scrapbox integration

# Configuration
Create a `config.json` as follows.

```json
{
    "token": "abcd...",
    "cookie": "s%3....",
    "projects": [
        {
            "url": "https://scrapbox.io/testproject/",
            "emoji": "🔲"
        }
    ]
}
```

Note that `cookie` refers to the `connect.sid` cookie value, and `token` refers to the Discord auth token. To obtain the cookie, simply log in to Scrapbox in your browser and use inspect element. To obtain the token, set up the Bot on Discord, and click Reset Token.
