### Project: NOT INTO GAMING !

Demo [here](https://julienemo.github.io/thp_next_17-19/)

This is a single-page-application made from vanilla JavaScript

---

#### Page Behaviour

1.  On list view by any criteria, page always displays release of next 365 days for a total of no more than 27 entries. Nine will be shown initially, more to add by the button "see more"; which slightly pushes new content up to window.
2.  When searching, separate keywords by space. All games containing any of the keyword will be returned.
3.  On list view, there is a filter on platform by dropdown list. Only 7 of the largest platforms (in terms of numbers of game hosted at any page loading moment) will be provided in the list. If the current list view is already by platform (ex, click on a platform of a game), changing the filter will change the platform. If the current view has criteria other than platform, changing filter will add chosen platform to criteria
4.  On detail view, no more than 4 screenshots, 4 youtube videos and 4 similar games will be shown. The similar games are not chosen by particular order.
5.  On detailed view and list view, hover on any card, game info will display. Click on any card (top part of either image or hover), page will redirect to detailed view of selected game

---

#### Animation

**List view**

Intersection observer on card

Hover on card, game info over photo [tuto here](https://www.w3docs.com/tools/code-editor/4135)

"See more" btn fills page with new elements and pushes them up. CF `scroll`, `scrollTo()`, `scrollBy()`, `scrollIntoView`. To test more effects.

**Detail view**

Intersection observer on info sections (only the ones on lower page, from purchase)

Smooth scrolling to top when clicking on a similar game
