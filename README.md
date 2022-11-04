# Demo of Material v4 + v5 dialog bug

This is a playground app to test a bug related to scrolling
after opening two consecutive Dialogs.

## Details

Mixing the use of MuiV4 and MuiV5 Dialogs can lock scrolling on `document.body`

This code is a demonstration of that bug.

## Run

* `yarn start`
* Open <http://localhost:9999>

## Build

Install a web server like `npm install --global serve`

<https://www.npmjs.com/package/serve>

* `yarn build`
* `serve --single -p 5000 build/`
* Open <http://localhost:5000>
