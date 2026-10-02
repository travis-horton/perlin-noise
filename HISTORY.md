# Perlin noise — what changed, in plain words

This is the whole history of the perlin-noise demo, newest first, written for someone who has never seen the code. The demo draws a made-up topographic map (dark is low ground, light is high) with a white dot circling over it, and a gauge showing how high the dot is. It is shown on travish.com, in the Programming section. Every entry is one step that reached the main version: a pull request, or one day's changes on one topic.

**How to read an entry**
- The heading names the change, links to the full technical detail on GitHub, and says when it landed (YY.MMDD.HHMM, Boise time).
- A bigger entry lists its parts underneath; each part's name links to the exact change that made it.
- **New:** something you can see or use · **Fixed:** a problem that no longer happens · **Behind the scenes:** a real change you can't see · **Removed:** something that is gone · **Try it:** where to see it, only when that still works today.
- "(Later replaced …)" means that version is gone and says what took its place.

*Written from the git history on 26.0925 and checked against the code of each day. From then on, each pull request carries its own entry, and it is added here automatically when the pull request merges.*

## October 2026

**perlin-noise #9: the demo stops when you leave its page** · [PR #9](https://github.com/travis-horton/perlin-noise/pull/9) · merged 26.1002.1017 · v3.2.3
- **[Stops when asked](https://github.com/travis-horton/perlin-noise/commit/580e5cc)** · merged 26.1002.1017
  Fixed: after you left the demo's page on travish.com, the map kept being redrawn 50 times a second out of sight, and each visit added another copy. The demo now hands the website a way to stop it, which ends the redrawing and removes the map and gauge. (The website starts using it in its own change.)
- **[A plain-language history](https://github.com/travis-horton/perlin-noise/commit/113c454)** · merged 26.1002.1017
  Behind the scenes: a new page, HISTORY.md, tells the project's whole story in plain words from 19.0411 on, with a version number for each step (it is at 3.2.2), and each future change adds its own entry automatically.

## June 2024

**Code tidy** · [commit](https://github.com/travis-horton/perlin-noise/commit/d93a9f9) · merged 24.0606.1257 · v3.2.2
- Behind the scenes: the code's spacing and punctuation were tidied to the website's style checker, with no change to what the demo draws.

## June 2022

**Code tidy** · [commit](https://github.com/travis-horton/perlin-noise/commit/a8883e0) · merged 22.0620.1808 · v3.2.1
- Behind the scenes: the code's formatting was tidied to the style rules, with no change to what the demo draws.

## July 2021

**The demo builds itself inside the website's page** · [commits](https://github.com/travis-horton/perlin-noise/compare/986635b...234302e) · merged 21.0701.2222 · v3.2.0
- **[Self-contained](https://github.com/travis-horton/perlin-noise/commit/6d2519d)** · merged 21.0701.1745
  Behind the scenes: the demo now makes its own map and gauge and places them wherever the website asks, instead of needing the page to have them ready. It is the shape the website uses for all its demos.
  Try it: open https://www.travish.com/programming/perlin-noise
- **[Shorter gauge label](https://github.com/travis-horton/perlin-noise/commit/234302e)** · merged 21.0701.2222
  New: the gauge's label reads "height:" instead of "height gauge:".

## June 2021

**A height gauge, and a lighter project** · [commits](https://github.com/travis-horton/perlin-noise/compare/02b86dc...986635b) · merged 21.0617.1559 · v3.1.0
- **[Duplicate copy removed](https://github.com/travis-horton/perlin-noise/commit/27e0273)** · merged 21.0617.1517
  Behind the scenes: an old second copy of the demo's building blocks, left over from the 19.0624 move, was deleted; the demo already used the other copy.
- **[Build tool removed](https://github.com/travis-horton/perlin-noise/commit/347d414)** · merged 21.0617.1520
  Behind the scenes: the project stopped carrying its own packaging tool (webpack), because the website packages the demo itself.
- **[Height gauge](https://github.com/travis-horton/perlin-noise/commit/986635b)** · merged 21.0617.1559
  New: a small bar under the map with a dark dot that slides left for low ground and right for high ground, following the white dot's height as it circles.

**Ready to be placed by the website** · [commits](https://github.com/travis-horton/perlin-noise/compare/579ce1d...02b86dc) · merged 21.0616.1917 · v3.0.0
- Behind the scenes: the software the project is built with was updated, and the demo became one piece the website starts when its page opens, instead of starting itself as soon as any page loaded.
  Removed: the whole page's background no longer changes shade with the height under the dot; the height gauge added the next day (21.0617) shows it instead.

## July 2020

**Software update** · [commit](https://github.com/travis-horton/perlin-noise/commit/579ce1d) · merged 20.0730.0854 · v2.0.6
- Behind the scenes: the software the project is built with was updated to newer versions.

## March 2020

**Security updates** · [commit](https://github.com/travis-horton/perlin-noise/commit/4c26528) · merged 20.0315.1245 · v2.0.5
- Behind the scenes: the software the project is built with was updated to versions without GitHub's reported security warnings.

## February 2020

**Leftover file removed** · [commit](https://github.com/travis-horton/perlin-noise/commit/cb31a41) · merged 20.0209.2041 · v2.0.4
- Behind the scenes: an older copy of the demo's main file, no longer used by anything, was deleted.

**Description retitled** · [commit](https://github.com/travis-horton/perlin-noise/commit/78d42c7) · merged 20.0207.1808 · v2.0.3
- Behind the scenes: the project's description is now titled "perlin noise" (it was "topoCircle") and says the dot displays its height below the map.

## December 2019

**Security update** · [commit](https://github.com/travis-horton/perlin-noise/commit/a108428) · merged 19.1214.1034 · v2.0.2
- Behind the scenes: one piece of the build software (serialize-javascript) was updated to a version without a reported security warning.

## November 2019

**Security updates and a description** · [commits](https://github.com/travis-horton/perlin-noise/compare/e2ef86b...01403cd) · merged 19.1124.0929 · v2.0.1
- Behind the scenes: the build software was updated to clear GitHub's reported security warnings, and the project got a short description: a dot circles a topographic map made by a hand-written perlin-noise generator and "knows" its own height.

## June 2019

**Reorganized to join the website** · [commits](https://github.com/travis-horton/perlin-noise/compare/e157bb7...e2ef86b) · merged 19.0624.1818 · v2.0.0
- Behind the scenes: the demo's files moved into one folder with a packaging tool (webpack), ready to be brought into the website.
  Removed: the demo's own stand-alone web page is gone; from here on it is shown on a page of the website.

**Working build saved** · [commit](https://github.com/travis-horton/perlin-noise/commit/e157bb7) · merged 19.0623.1346 · v1.0.1
- Behind the scenes: the working version, as packaged with the Parcel tool, was saved, along with a short note to self.

## May 2019

**It works** · [commits](https://github.com/travis-horton/perlin-noise/compare/7ddb61c...650d278) · merged 19.0522.1517 · v1.0.0
- New: the first working version. A 512-pixel topographic map of smooth random hills and valleys, a white dot circling over it, and the page's background shading lighter or darker with the height under the dot.
  Behind the scenes: a folder of the packaging tool's temporary files was taken out of the project and kept out from then on.

## April 2019

**The noise rewritten** · [commits](https://github.com/travis-horton/perlin-noise/compare/b0a8829...7ddb61c) · merged 19.0430.1542 · v0.1.3
- Behind the scenes: the noise-making part was rewritten from scratch; the map still did not look right yet.

**Closer to the problem** · [commits](https://github.com/travis-horton/perlin-noise/compare/204e51e...b0a8829) · merged 19.0418.1243 · v0.1.2
- Behind the scenes: an optional red grid over the map (to see the squares the noise is built from) was reworked, the cause of the wrong-looking map was found, and the packaging tool's temporary files were marked to be ignored.

**Split into pieces** · [commit](https://github.com/travis-horton/perlin-noise/commit/204e51e) · merged 19.0415.2325 · v0.1.1
- Behind the scenes: the drawing, the noise and the math were split into separate files; the map still did not look right.

**Perlin noise begins** · [commits](https://github.com/travis-horton/perlin-noise/commits/main?since=2019-04-11&until=2019-04-11) · merged 19.0411.1442 · v0.1.0
- New: the first attempt: a page with a map drawn from perlin noise and a dot going around it. The smoothing between points was not right yet.
