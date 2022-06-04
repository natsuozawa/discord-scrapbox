const path = require('path');

const fetch = require('node-fetch');
const cheerio = require('cheerio');

const { cookie } = require('./config.json')

/**
 * Creates a Scrapbox page url for a link posted on Discord.
 * Following formats are accepted:
 * Link (title will be the title of the linked page)
 * Link Body (title will be the title of the linked page)
 * Title Link Body
 * @param url
 * @param reaction
 * @returns {array} [title, url]
 */
const createTitleAndUrlForLink = async (projectUrl, reaction) => {
    const message = reaction.message.toString();

    const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const linkedUrl = urlRegExp.exec(message)[0];
    if (!linkedUrl) return '';

    const pos = message.search(urlRegExp);

    let title = message.substr(0, pos);
    const body = message.substr(pos);

    if (!title) {
        const response = await fetch(linkedUrl);
        const $ = cheerio.load(await response.text());
        title = $('title').text();
        if (!title) return '';
    }

    return [title, new URL(path.join(encodeURIComponent(title), '?body=' + encodeURIComponent(body)), projectUrl).toString()];
}

/**
 * Creates a new Scrapbox page using the specified url.
 * @param url
 * @returns {boolean}
 */
const scrapbox = async requestUrl => {
    const headers = {
        'Cookie': 'connect.sid=' + cookie,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36'
    };
    const response = await fetch(requestUrl, { headers: headers });
    console.log(await response.text())
    return response.status === 200;
}

module.exports =  {
    createTitleAndUrlForLink: createTitleAndUrlForLink,
    scrapbox: scrapbox
};
