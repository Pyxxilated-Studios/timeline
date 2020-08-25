# Timeline (Work in Progress)

Inspired by [app-ideas](https://github.com/florinpop17/app-ideas) repository, and their Advanced idea for creating a timeline that can display a users [GitHub history](https://github.com/florinpop17/app-ideas/blob/master/Projects/3-Advanced/GitHub-Timeline-App.md), I decided to challenge myself even further.

Timeline is a small web application that strives to not only allow a user to easily display their history, it allows them to export the timeline they create so that they can add it to their own sites/apps.

# Running

To run this yourself, you'll need a few things:

- A clone of this repository
- An OAuth Application on github ([Documentation](https://docs.github.com/en/developers/apps/creating-an-oauth-app))
- A clone of [gatekeeper](https://github.com/prose/gatekeeper), this is used to proxy the request as GitHub has issues with CORS

Once you have those things, then you'll need to create a `.env` file (or, if doing this in CI/CD, add it as a config there) that contains the following:

- `REACT_APP_CLIENT_ID`: The client id you get when creating your OAuth Application above

You'll then want to follow along with the instructions in the README of gatekeeper to get it running. As soon as it is running, then you can start this with a simple `yarn start` (or for production use, `yarn build` followed by however you want to serve it).

Hopefully at that point everything is running smoothly.
