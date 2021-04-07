<h3 align="center">
  <img src="graphics/logo.png?raw=true" alt="Plattar Logo" width="600">
</h3>

[![install size](https://packagephobia.com/badge?p=@plattar/plattar-web)](https://packagephobia.com/result?p=@plattar/plattar-web)
[![Minified](https://badgen.net/bundlephobia/min/@plattar/plattar-web)](https://bundlephobia.com/result?p=@plattar/plattar-web)
[![MinZipped](https://badgen.net/bundlephobia/minzip/@plattar/plattar-web)](https://bundlephobia.com/result?p=@plattar/plattar-web)
[![NPM](https://img.shields.io/npm/v/@plattar/plattar-web)](https://www.npmjs.com/package/@plattar/plattar-web)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/0b7ee62ec2c741cfbedb487f64d2a946)](https://www.codacy.com/gh/Plattar/plattar-web/dashboard?utm_source=github.com&utm_medium=referral&utm_content=Plattar/plattar-web&utm_campaign=Badge_Grade)
[![License](https://img.shields.io/npm/l/@plattar/plattar-web)](https://www.npmjs.com/package/@plattar/plattar-web)

_plattar-web_ allows embedding and interfacing Plattar viewers into your own website.

### _Quick Use_

-   ES2015 & ES2019 Builds via [jsDelivr](https://www.jsdelivr.com/)

```javascript
// Minified Version ES2015 & ES2019 (Latest)
https://cdn.jsdelivr.net/npm/@plattar/plattar-web/build/es2015/plattar-web.min.js
https://cdn.jsdelivr.net/npm/@plattar/plattar-web/build/es2019/plattar-web.min.js

// Standard Version ES2015 & ES2019 (Latest)
https://cdn.jsdelivr.net/npm/@plattar/plattar-web/build/es2015/plattar-web.js
https://cdn.jsdelivr.net/npm/@plattar/plattar-web/build/es2019/plattar-web.js
```

### _Installation_

-   Install using [npm](https://www.npmjs.com/package/@plattar/plattar-web)

```console
npm install @plattar/plattar-web
```

### _Examples_

Plattar is restricted to run correctly on _HTTPS_. Other protocols are not guaranteed to work.

-   Embed your Plattar Scene as a 3D Viewer into your website.

```html
<plattar-viewer scene-id="your-scene-id"></plattar-viewer>
```

-   Embed your Plattar Scene as a WebXR experience into your website. WebXR works with Google Chrome and requires an ARCore supported mobile device.

```html
<plattar-webxr scene-id="your-scene-id"></plattar-webxr>
```

-   Embed your Plattar Scene as a Face Tracking experience into your website. Face Tracking requires camera access.

```html
<plattar-facear scene-id="your-scene-id"></plattar-facear>
```

-   Embed your Plattar Scene as an 8th Wall experience into your website. 8th Wall works with Google Chrome and IOS Safari on a mobile device.

```html
<plattar-8wall scene-id="your-scene-id"></plattar-8wall>
```

-   Embed your Plattar Scene as a read-only Editor into your website. The Editor allows customizing an existing Scene by adding, removing or moving objects around.

```html
<plattar-editor scene-id="your-scene-id"></plattar-editor>
```
