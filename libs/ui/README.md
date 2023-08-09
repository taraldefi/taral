# Tariala UI Library

## Development

### Testing

```
npm run test
```

### Building

```
npm run build
```

### Storybook

To run a live-reload Storybook server on your local machine:

```
npm run storybook
```

To export your Storybook as static files:

```
npm run storybook:export
```

### Generating New Components

Instead of copy pasting components to create a new component, you can instead run this command to generate all the files you need to start building out a new component. To use it:

```
npm run generate YourComponentName
```

This will generate:

```
/src
  /YourComponentName
    YourComponentName.tsx
    YourComponentName.stories.tsx
    YourComponentName.test.tsx
    YourComponentName.types.ts
    YourComponentName.css
```

The default templates for each file can be modified under `util/templates`.

Don't forget to add the component to your `index.ts` exports if you want the library to export the component!

## Publishing

### Hosting via NPM

First, make sure you have an NPM account and are [logged into NPM using the `npm login` command.](https://docs.npmjs.com/creating-a-new-npm-user-account)

Then update the `name` field in `package.json` to reflect your NPM package name in your private or public NPM registry. Then run:

```
npm publish
```

The `"prepublishOnly": "npm run build"` script in `package.json` will execute before publish occurs, ensuring the `build/` directory and the compiled component library exist.

### Hosting via GitHub

I recommend you host the component library using NPM. However, if you don't want to use NPM, you can use GitHub to host it instead.

You'll need to remove `build/` from `.gitignore`, build the component library (`npm run build`), add, commit and push the contents of `build`.

You can then install your library into other projects by running:

```
npm i --save git+https://github.com/taraldefi/ui-library.git#branch-name
```

OR

```
npm i --save github:taraldefi/ui-library#branch-name
```

## Usage

Let's say you created a public NPM package called `tariala-ui-library` with the `TestComponent` component created in this repository.

### Stylesheet

First, you'll need to import the `index.css` CSS file distributed by the package. This should be done at the root of your project (in `index.js` or `App.tsx` of your React app) and will look like:

```tsx
import 'tariala-ui-library/build/index.css';

...
```

### Components

Usage of components (after the library installed as a dependency into another project) will look like:

```TSX
import React from "react";
import { TestComponent } from "tariala-ui-library";

const App = () => (
  <div className="app-container">
    <h1>Hello I'm consuming the component library</h1>
    <TestComponent heading={'Some heading'} content={<div>Some content</div>} />
  </div>
);

export default App;
```

## Additional Help

### Dark Mode

The example component `TestComponent` respects the user's dark mode operating system preferences and renders the component in the appropriate theme.

This is achieved by using the media query: `@media (prefers-color-scheme: dark)` in combination with CSS variables. The colours that change depending on dark mode preference can be found in [`src/index.css`](src/index.css). Example usage of these variables can be found within [`src/TestComponent/TestComponent.css`](src/TestComponent/TestComponent.css).

Read https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme for more details.

### Using CSS Preprocessors

The Rollup plugin [`rollup-plugin-postcss`](https://github.com/egoist/rollup-plugin-postcss) supports Sass, Less and Stylus:

- For Sass, install less: `yarn add node-sass --dev`
- For Stylus, install stylus: `yarn add stylus --dev`
- For Less, install less: `yarn add less --dev`

#### CSS Modules

If you want to use CSS Modules, update `postcss` in `rollup-config.js` to:

```
postcss({
  modules: true
})
```

### Supporting Image Imports

Add the following library to your component library [@rollup/plugin-image](https://github.com/rollup/plugins/tree/master/packages/image):

```
npm i -D @rollup/plugin-image
```

Then add it to `rollup-config.js`:

```
...
plugins:[
  ...,
  image(),
  ...
]
...
```

You can then import and render images in your components like:

```tsx
import logo from "./rollup.png";

export const ImageComponent = () => (
  <div>
    <img src={logo} />
  </div>
);
```

### Supporting JSON Imports

Add the following library to your component library [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json):

```
npm i -D @rollup/plugin-json
```

Then add it to `rollup-config.js`:

```
...
plugins:[
  ...,
  json(),
  ...
]
...
```

You can then import and use JSON as ES6 Modules:

```tsx
import data from "./some-data.json";

export const JsonDataComponent = () => <div>{data.description}</div>;
```

Checkout the [official Rollup plugin list](https://github.com/rollup/plugins) for additional helpful plugins.
