## Available Scripts

In the project directory, you can run:

### `npm install`

Command for to install the packages

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run clean`

Clean Up the packages and cache on the Windows

## Learn More

You can learn more in the [Webpack documentation](https://webpack.js.org/concepts).

To learn React, check out the [React documentation](https://reactjs.org/).

### ESLint settings

The commands `npm run lint` or `yarn lint` shown all waring and errors

The commands `npm run lint:fix` or `yarn lint:fix` to resolve some errors automatically

**_VS Code configuration_**

-   Press Command + Shift + P then search for Open Settings (JSON) (if you can’t find it, try things mentioned here)
-   Make sure eslint is installed globally using npm install -g eslint or yarn global add eslint

Now we’ll get ESLint and Prettier to perform their magic everytime you save a file. Add the following to your `settings.json`:

```
{
    "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
    "editor.formatOnSave": true,
    "eslint.alwaysShowStatus": true,
    "files.autoSave": "onFocusChange"
}
```
