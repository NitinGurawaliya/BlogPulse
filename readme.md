# Blogging Website

This is a blogging platform where users can get blogs in bulk, publish posts, edit blogs, and use tags on particular blog posts. The project consists of a backend built using TypeScript with the HonoJS framework for Cloudflare Workers (serverless backends) and a frontend built using Tailwind CSS, ReactJS, and TypeScript. It also includes a common folder with all the Zod types published on npm.

## Project Structure

- `backend`: Contains the backend code written in TypeScript using HonoJS, Prisma ORM, and deployed on Cloudflare Workers.
- `frontend`: Contains the frontend code written in React with Tailwind CSS and TypeScript.
- `common`: Contains all the Zod types, published as an npm package.

## Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- Cloudflare account
- Docker (optional, for containerized setup)

### Backend Setup

1. **Clone the repository**

    ```sh
    git clone git@github.com:NitinGurawaliya/medium.git
    cd medium/backend
    ```

2. **Install dependencies**

    ```sh
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the `backend` folder and add the following environment variables:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/blogdb"
    ```

4. **Generate Prisma Client**

    ```sh
    npx prisma generate
    ```

5. **Run database migrations**

    ```sh
    npx prisma migrate dev
    ```

6. **Start the development server**

    ```sh
    npm run dev
    ```

7. **Deploy to Cloudflare Workers**

    ```sh
    npm run deploy
    ```

### Frontend Setup

1. **Navigate to the frontend directory**

    ```sh
    cd ../frontend
    ```

2. **Install dependencies**

    ```sh
    npm install
    ```

3. **Start the development server**

    ```sh
    npm run dev
    ```

4. **Build the frontend for production**

    ```sh
    npm run build
    ```

5. **Preview the production build**

    ```sh
    npm run preview
    ```

## Scripts

### Backend

- `npm run dev`: Start the development server using Wrangler.
- `npm run deploy`: Deploy the backend to Cloudflare Workers with minification.

### Frontend

- `npm run dev`: Start the development server using Vite.
- `npm run build`: Build the frontend for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint for code linting.

## Technologies Used

### Backend

- TypeScript
- HonoJS framework
- Cloudflare Workers
- Prisma ORM

### Frontend

- React
- Tailwind CSS
- TypeScript
- Axios for API requests
- React Router for routing

### Common

- Zod for schema validation (published on npm as `@nitin2024/medium-common`)

## Deployment

### Deploying to Cloudflare Workers

1. **Install Wrangler CLI**

    ```sh
    npm install -g wrangler
    ```

2. **Authenticate Wrangler with Cloudflare**

    ```sh
    wrangler login
    ```

3. **Deploy the backend**

    ```sh
    npm run deploy
    ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the ISC License.
