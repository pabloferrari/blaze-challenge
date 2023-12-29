# Blaze Challenge Application

This repository contains an application that utilizes Docker and Docker Compose for execution. Ensure you have Docker and Docker Compose installed on your system before proceeding.

## Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Steps to Run the Application

1. Clone this repository to your local machine:

    ```bash
    git clone git@github.com:pabloferrari/blaze-challenge.git
    ```

2. Navigate to the repository folder and generate the `.env` file based on `.env.example`:

    ```bash
    cd blaze-challenge
    cp .env.example .env
    ```

3. Open the `.env` file in a text editor and add the API key provided by 'https://apifootball.com' to the variable "BACKEND_API_KEY".

4. Run the following command to start the application with Docker Compose:

    ```bash
    docker-compose up -d
    ```

## Accessing the Application

The application should now be up and running. Access it at [http://localhost:3000](http://localhost:3000).
