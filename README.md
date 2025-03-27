# tracks-ai

A full-stack web application for managing a personal music track collection. Built using the MERN stack (MongoDB, Express, React, Node.js) with TypeScript and containerized using Docker for easy setup and development.

## Description

This application provides a user interface to add, view, edit, delete, filter, and sort music tracks. It features a React frontend, a Node.js/Express backend API, and uses MongoDB for data storage. The entire stack is containerized with Docker Compose for a consistent development environment.

## Features

* **Add Tracks:** Add new music tracks with Title, Artist, and Album information via a form.
* **View Tracks:** Display all tracks in a paginated list.
* **Edit Tracks:** Update the details of existing tracks using an inline form, with smooth scrolling to the edit area.
* **Delete Tracks:** Remove tracks from the collection (with confirmation).
* **Filter:** Filter the track list dynamically by Title, Artist, and/or Album (case-insensitive, partial matching).
* **Sort:** Sort the track list by Title, Artist, Album, or Date Added (ascending or descending).
* **Database Seeding:** Automatically populates the database with approximately 50 sample tracks on the first run.
* **Containerized:** Runs entirely within Docker containers for a consistent development environment.

## Tech Stack

* **Frontend:** React (with Vite), TypeScript
* **Backend:** Node.js, Express, TypeScript
* **Database:** MongoDB (with Mongoose ODM)
* **Containerization:** Docker, Docker Compose
* **API Communication:** Axios

## Project Structure

```
.
├── client/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite-env.d.ts
│   ├── vite.config.ts
│   └── .env.development
├── server/
│   ├── src/
│   ├── mongo-init/
│   │   └── seed.js
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Prerequisites

* **Docker Desktop** (recommended for Windows/Mac) or **Docker Engine + Docker Compose** (for Linux) installed and running. Ensure Docker is configured to work with your environment (e.g., WSL2 integration enabled on Windows).
* **Git** (for cloning the repository).
* A text editor (like VS Code).
* A web browser.

## Getting Started (Development with Docker)

Follow these steps to get the application running locally using Docker Compose:

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd music-track-manager # Or your project's root directory name
    ```

2.  **Configure Backend Environment:**
    * Navigate to the `server/` directory.
    * Copy the example environment file: `cp .env.example .env`
    * Edit the new `server/.env` file:
        * Verify `PORT` (default `3001`).
        * Verify `MONGO_URI` (default `mongodb://mongo:27017/musicTracksDB` should work with Docker Compose).
        * Set `CLIENT_ORIGIN` to the URL your browser will use to access the frontend (e.g., `CLIENT_ORIGIN=http://localhost:3000` **or** `CLIENT_ORIGIN=http://<YOUR_WSL_IP>:3000`). Alternatively, comment out this line (`#CLIENT_ORIGIN=...`) to allow any origin during development (less secure).
        * Ensure `MONGO_DB_NAME` matches the database name in `MONGO_URI` and `server/mongo-init/seed.js`.

3.  **Configure Frontend Environment:**
    * Navigate to the `client/` directory.
    * Copy the example environment file: `cp .env.development.example .env.development`
    * Edit the new `client/.env.development` file:
        * Set `VITE_API_BASE_URL` to the URL the frontend (running in the browser) will use to reach the backend API. This should use the same host/IP as you expect to use for `CLIENT_ORIGIN` in the backend config, but point to the backend port and `/api` path.
            * Example: `VITE_API_BASE_URL=http://localhost:3001/api`
            * Example (using WSL IP): `VITE_API_BASE_URL=http://<YOUR_WSL_IP>:3001/api`

4.  **Build and Run Containers:**
    * Navigate back to the **project root directory** (where `docker-compose.yml` is located).
    * Run the following command:
        ```bash
        docker-compose up --build
        ```
        * `--build`: Forces Docker to build/rebuild the images based on the Dockerfiles. Needed after code changes or dependency updates.
        * You can add `-d` to run in detached mode (in the background): `docker-compose up --build -d`

5.  **Database Seeding:**
    * The first time you run `docker-compose up` with an empty database volume, the `mongo` service will execute the `server/mongo-init/seed.js` script, populating the `musicTracksDB` database with sample tracks. This only happens once unless the volume is removed (`docker-compose down -v`).

## Usage

* Wait for the Docker Compose command to finish starting all services. Check logs (`docker-compose logs -f client`, `docker-compose logs -f server`) if needed.
* Open your web browser on your host machine (Windows).
* Navigate to the URL you configured for accessing the frontend (based on your `.env` setup):
    * `http://localhost:3000` (Recommended standard access via Docker Desktop + WSL2)
    * **OR** `http://<YOUR_WSL_IP>:3000` (If `localhost` does not work for accessing the GUI in your specific setup)
* The Music Track Manager application should load, and the track list should populate shortly after.

## Implementation Notes (AI Collaboration)

This project specification and initial code were generated through an iterative process with an AI assistant.

**What Went Well:**

* **Iterative Refinement:** Started with basic REST/UI requirements and progressively added features (editing, sorting, filtering, pagination, seeding, UI scrolling) and technical details (stack choice, TypeScript, Docker).
* **Debugging Docker Builds:** Collaboratively diagnosed and fixed several Docker build errors related to JSON parsing, missing TypeScript configuration files (`tsconfig.node.json`, `vite-env.d.ts`), incorrect `index.html` location for Vite, and selecting the correct Dockerfile stage (`development` vs `production`).
* **Backend Functionality:** Core API logic for CRUD, filtering, and sorting was generated successfully. Database seeding setup using Mongo init scripts was implemented.
* **Frontend Structure:** A standard React/Vite component structure was generated, providing a base for UI implementation.

**Challenges / What Went Badly:**

* **Initial Code Errors:** Some generated files initially contained errors (e.g., comments in `package.json`, missing TS config files, incorrect `index.html` path) requiring debugging cycles.
* **WSL Networking Complexity:** Accurately determining the correct URL (`localhost` vs WSL IP) for accessing services from the Windows host browser, and configuring both the frontend (`VITE_API_BASE_URL`) and backend (`CLIENT_ORIGIN` for CORS) accordingly, required clarification and adjustment based on user experience. The nuance of browser context vs. WSL terminal context was key.
* **Docker Dev vs Prod Stages:** An issue arose where the production Nginx stage of the client Dockerfile was run instead of the development Vite server stage, causing port mismatches and lack of HMR. This required correcting the Dockerfile and `docker-compose.yml` (`target` stage).
* **AI Oversights:** Occasional omissions, like forgetting the `gemini-code-apply` headers, required correction.

Overall, the process involved significant back-and-forth for debugging and refining the setup, particularly around the Docker, TypeScript build, and WSL networking aspects.

## Troubleshooting

* **"Network Error" in UI:** Usually means the frontend cannot reach the backend API.
    * Verify `VITE_API_BASE_URL` in `client/.env.development` is correct and reachable from your Windows browser.
    * Verify `CLIENT_ORIGIN` in `server/.env` matches the URL you are using in the browser (or is commented out to allow `*`).
    * Check backend logs (`docker-compose logs server`) for errors.
    * Check container status (`docker-compose ps`).
    * Ensure the relevant container(s) were restarted after changing `.env` files (`docker-compose restart server` or `docker-compose restart client`).
* **Connection Refused / Site Can't Be Reached:**
    * Ensure Docker containers are running (`docker-compose ps`).
    * Verify the port mappings in `docker-compose.yml` are correct (`3000:3000` for client, `3001:3001` for server).
    * Check if a firewall (Windows Firewall or third-party) is blocking the ports (3000 or 3001).
    * Try accessing via `localhost:3000` first before resorting to the WSL IP.
* **Build Errors:** Check the terminal output carefully for specific error messages (e.g., JSON errors in `package.json`, TypeScript errors, file not found errors) and address them. Refer to browser Developer Console (F12) for runtime frontend errors (including detailed CORS errors).

## API Endpoints

The backend provides the following RESTful endpoints under the `/api` prefix (e.g., `http://localhost:3001/api`):

* `POST /tracks`: Adds a new track. Requires JSON body: `{ "title": "...", "artist": "...", "album": "..." }`.
* `GET /tracks`: Retrieves all tracks. Supports query parameters:
    * `page` (number): Page number for pagination (default: 1).
    * `limit` (number): Items per page (default: 10).
    * `title` (string): Filter by title (case-insensitive, partial match).
    * `artist` (string): Filter by artist (case-insensitive, partial match).
    * `album` (string): Filter by album (case-insensitive, partial match).
    * `sortBy` (string): Field to sort by (`title`, `artist`, `album`, `createdAt`).
    * `sortOrder` (string): Sort direction (`asc` or `desc`).
* `GET /tracks/:id`: Retrieves a single track by its MongoDB ID.
* `PUT /tracks/:id`: Updates a track by its ID. Requires JSON body with fields to update.
* `DELETE /tracks/:id`: Deletes a track by its ID.

## Stopping the Application

* If running in the foreground (`docker-compose up`), press `Ctrl+C` in the terminal.
* If running in detached mode (`-d`), or from another terminal, run:
    ```bash
    docker-compose down
    ```
    * This stops and removes the containers but preserves the named volumes (like `mongo-data`).
* To stop containers AND remove volumes (including database data, triggers reseeding on next start):
    ```bash
    docker-compose down -v
    ```

## Contributing

(Optional: Add guidelines for contributing if this were an open project).

## License

(Optional: Add license information, e.g., MIT).
