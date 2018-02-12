# Sweetbridge

Landing page for Sweetbridge, Inc.

### Twitter Mentions Feed Setup

Go to [https://apps.twitter.com/](https://apps.twitter.com/). Sign in and click `Create New App` button.
Fill in the `Application Details` form. Just do Name, Description and Website fields.

On the `Application Management` page go to `Keys and Access Tokens` tab. On the bottom of the page click the button `Create my Access Token` button. Copy `Consumer Key`, `Consumer Secret`, `Access Token` and `Access Token Secret` values and paste them into `routes/index.js` file, lines 9-12. Make sure no spaces and new line symbols are added before or after these strings.

Number of recent Twitter mentions on the landing page is stored in `routes/index.js` file, line 16.
