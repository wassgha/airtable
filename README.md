# Timeline Project

_Assignment created for Airtable by Wassim Gharbi_

This project is a visualization of events on a scrollable timeline user interface with the ability to modify events, zoom in/out and drag and drop.

![https://raw.githubusercontent.com/wassgha/airtable/master/screenshot.png](https://raw.githubusercontent.com/wassgha/airtable/master/screenshot.png)

## Features

- Loading events from a given javascript file
- Visualization of the events on a timeline
- Conflict avoidance by placing overlapping events on a separate line (while maintaining a minimal number of lines)
- Multiple zoom levels (day, week, month and year views)
- Drag and drop to change event times
- Click to edit event names inline

## Installation & Running

This project uses Next.js, React.js and Redux. To install it, use

```
$ yarn
```

then build the project using

```
$ yarn build
```

and finally run it with

```
$ yarn start
```

## Sample data:

The sample data is at "data/timelineItems.js"

## Feedback

**What you like about your implementation?**

The implementation runs smoothly, events render correctly and the user interface is very user-friendly, responsive and visually appealing. By carefully planning the structure of the project, I was able to work on the stretch goals (editing the event name and drag-and-drop) without a significant additional cost.

**What you would change if you were going to do it again.**

This was my first time linking Redux to a Next.js project and the process wasn't as straightforward as I expected it to be. I am sure there is a better way to pass the store and its dispatch method to lower components. If I had more time I probably would have implemented `redux-persist` or another persistance method to keep changes made by the user. The algorithms I came up with for creating rows of non-overlapping events was straightforward so there might probably be optimizations that could be performed.

**How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.**

I got inspired by the Google Calendar layout and one of my old projects (http://coursechief.com/ which creates all possible schedules for a course combination at my college).

**How you would test this if you had more time.**

If I had more time, I would have unit tested a lot of the helper methods for formatting and dealing with dates and date ranges, I would have used Closure, TypeScript or Flow to make sure argument and return types are correct, I would've also added integration and UI tests and I would've implemented a CI pipeline (Travis or Circle CI) that will execute these tests on every merge or build.
