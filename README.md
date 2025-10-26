# VSL Market split site

This repository contains the split static site structure (partials + assets) and build scripts.

- index.html loads partials from /partials via a tiny JS loader.
- All images/videos can stay on your CDN. Set CDN_BASE in js/main.js if needed.

Branches:
- split-site: contains the website files and GitHub Actions workflow to build a ZIP artifact.
