# Passport Extraction FE

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites
1. **Vercel Account**:  
   Ensure you have a Vercel account

2. **Node.js & npm & vercel**:  
   Make sure Node.js and npm are installed:
   ```bash
   node -v
   npm -v
   npm i -g vercel
## Setup

1. **Configure .env**:
    add required env vars - see .sample.env (without '/dev/upload')

2. **Install dependencies**:
    Run:
    `npm install`

3. **Login to vercel**:
    Run:
    `vercel login`

4. **Deploy to vercel**:
    Run:
    `vercel`

5. **Configure vercel env**:
    Configure env vars on project on vercel - use .sample.env for example - use lambda endpoint from api gateway

## Further details on Vercel deploy if required
Deployment - this is super easy using Vercel - check out the instructions below

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Future improvements
**This section explains some code changes that I would make given further time and with the caveat that I am primarily and BE dev**:

**Future code/ repo improvements**:
* Add tests
* Fix irritating bug when previewing image that expands the card up and down
* Add linting/ prettier config
* Remove styling from inline, use constants to avoid duplication/ messiness
* Break down into more components and generally improve separation of concerns
* Increase use of types/ interfaces
* Accessibility considerations - adding aria-label etc
* state management lib rather than react useeffect etc