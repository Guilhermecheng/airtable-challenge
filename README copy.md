# Timeline Component

This is my solution for the Airtable challenge: a timeline component that displays all items from the `timelineItems` object.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Guilhermecheng/airtable-challenge.git
cd airtable-challenge
npm install
```

## Running Locally

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- Timeline with zoom control
- Items positioned and sized according to their start/end dates
- Drag to resize items and update their dates (still to be implemented)

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS

# Answering your questions

### What you like about your implementation.

It is a clean implemenatation, with a clean design, and also easy to dev experience. I tried to use some components from Shadcn to ease and speed up the process.

### What you would change if you were going to do it again.

First of all, I'd try to begin with what I achieved and implement the other functionalities. I'd also try to improve the design. It's not ugly, but it isn't a finished product also.

### How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.

I got the inspiraton both from Notion's version of timeline, and Dropbox's Paper. I tried to focus on implementing the dates positioning right at first, and them improving the design later, but I didn't have enough time to get a good result.

### How you would test this if you had more time.

For now, it is not fully functional, as you can't create new tasks, or edit the existing ones. If I were you, I'd be testing the zoom funcionality A LOT. Hahaha.

Bad jokes apart, I'd be happy to have another shot at this challenge, and implement those suggestions:

- Allow zooming in and out of the timeline
- Allow dragging and dropping to change the start and/or end date of an item
- Allow editing the name of items inline
- Any other polish or useful enhancements you can think of

And also improving the zoom functionality.

Hope you guys like it!

Guilherme
