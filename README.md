# Cinema website

This is a minimalistic static site for a local cinema

## Local development

This site is built using only html, css and basic javascript. You don't need anything except a common browser to run it.

Open the index.html file in your browser to preview the site. Note that you will run into CORS errors locally unless you disable Cross-Origin Restrictions (CORS) in your browser.

Pushing to the `main` branch automatically deploys to github pages.

## API keys

Since this is a front-end application only running in the browser the API-key cannot be obfuscated. Make sure that the key can only accesses the specific google sheet used for you content and that it is read only. Also restrict the origins from which this key can be used, to the website domain. You can add another API-key for local development without restricted origins.

https://developers.google.com/sheets/api/guides/concepts

### Set up sheet access

- Go to https://console.cloud.google.com/apis/
- Select the google account you want to use (preferably a specific account only responsible for managing this website)
- Create a new project
- Add an API key
- Restrict the key by editing it. Restrict to Sheets API and specific websites (origins)

## License

[MIT](https://mit-license.org/)
