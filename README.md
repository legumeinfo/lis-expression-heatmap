
![Logo Intermine](imgs/intermine-300x37.png)
#  LIS (Bluegenes) Expression Heatmap

BlueGenes Expression Heatmap is a tool made for [BlueGenes](http://bluegenes.apps.intermine.org) following BlueGenes Tool API. It displays gene expression versus sample and gene in a heat map.

### To set up locally for development

1. Clone the repo
2. `cd lis-expression-heatmap` and then `npm install` to install dependencies.

All of the editable source files for css and js are in `src`. To bundle for prod, run the following commands:

#### CSS

Assuming [less](http://lesscss.org/) is installed globally:

```
npm run less
```

#### JS

Assuming [webpack](https://webpack.js.org/) is installed globally:

##### Single build:
```
npm run build
```


##### Applied Coding practices / ESLint Rules:
- _indent_: use __tab (2 space tab)__ instead of spaces to not get an error.
- _linebreak-style_: use __\n__ for a newline, if you're on windows, configure it in your editor settings.
- _quotes_: use __single quote__ instead of double quote.
- _semi_: use _semi colon_ at end of each statement / expression / function definition.
- _comma-dangle_: do not use dangling commas i.e. extra comma at the end of object values, function args, etc.). More about this [here](https://eslint.org/docs/rules/comma-dangle).
- More pre-configured rules from __eslint:recommended__ you must follow to not get errors [here](https://eslint.org/docs/rules/).

##### Developing:
Run each of these commands in separate terminals:

To run a development build of the project at http://localhost:3456
```bash
npm run dev
```
