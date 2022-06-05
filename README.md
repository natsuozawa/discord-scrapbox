# discord-scrapbox
Discord Scrapbox integration

# How to use
Currently, the only feature is to create a new Scrapbox page based on a Discord message. The Discord message must have a link. The following formats are accepted:

```
Title Link Body
Link Body (title will be the title of the linked resource, body will be the link + body)
Link (title will be the title of the linked resource, body is the link)
```

In order to create a new Scrapbox page, the user reacts with an emoji specified below in the Configuration section. The bot will then add the page and send a message. If the bot is successful, the bot reacts with a checkmark. Otherwise, it will react with a cross mark.

# Discord bot setup
Before use, set up a Discord App with bot features. Enable the `Read Message`, `Send Message`, and `Add Reactions` permissions. Make sure the bot is not public. Then, add the bot to the designated server. Keep the authorization token for configuration below.

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

To use a custom chromium distribution, include a property called `executablePath` in `config.json` with the path to the binary.
