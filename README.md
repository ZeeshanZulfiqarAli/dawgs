# Dawgs

Dawgs is a dog site, where you can find out everything about dogs, dawgs and dougs. Just kidding about the last two.

## Installation

Installation is straight forward; just run this command:

```bash
npm install
```

## Usage
To run the application locally, make sure you have `.env` file in the root of repository containing `VITE_DOG_API_KEY`. You can get this API key after signing up: [https://thedogapi.com/signup](https://thedogapi.com/signup). The key would be emailed to you.

Next, you can run this command to start local server:
```bash
npm run dev

```

## Tools and Technologies

This application make use of following tools and technologies:
- Vite
- React
- TypeScript
- React Query
- Context API
- TailwindCSS
- Prettier

## Assumptions & Decisions
This project was geared towards showcasing abilities and hence a lot of structure is overkill for such a small project. We could've gotten away without using react query or not structuring files is a certain way. A lot of boilerplate code could be found in context api solution.

Following are the main decisions i made during development:
- Load More UX instead of pagination: This decision was based on ease of use: having a single button at the bottom of the page is much cleaner than the pagination but thats not to say that pagination is not useful. In our case, I expect user to only explore a starting few pages and not more, so its important to streamline experience for that.
- Use of Context API: This is to ensure cleaner code and communication between components without prop drilling. In our project, we could have gotten away with prop drilling as there was not many components to begin with.

## Challenges:
- The postman API collection for the dog api had an incorrect endpoint that caused a bit of confusion. 
- Context API renders component even if it isn't using the updating item. This resulted in a bit of patchwork and workarounds. But it served purpose of demonstrating familiarity with it. A good blog on this problem: [https://blog.jannikwempe.com/when-to-not-use-react-context-api-for-state](https://blog.jannikwempe.com/when-to-not-use-react-context-api-for-state)
- The offline manager in react query reports the status after a manual API call, however i wanted to get the status automatically therefore i had to rely on another library.
- Typescript - but it was fun!

## Author
Zeeshan