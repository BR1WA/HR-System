# HR-System

HR-System is a Human Resources management system designed to streamline HR processes such as employee data management, certificate requests, and customized statistical reporting.

## Features

- **Manage Employees:** Add, update, and remove employee information.
- **Certificate Requests:** Employees can send certificate requests, and HR can print them.
- **Custom Statistics:** Display customized statistics based on user-selected options.

## Technologies Used

- **Frontend:** React JS
- **Backend:** Laravel
- **Database:** MySQL

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/BR1WA/HR-System.git
    ```
2. Navigate to the project directory:
    ```bash
    cd HR-System
    ```
3. Set up the backend:
    - Install the necessary PHP dependencies:
        ```bash
        composer install
        ```
    - Configure your `.env` file with your database credentials.
    - Run the database migrations:
        ```bash
        php artisan migrate
        ```

4. Set up the frontend:
    - Install the necessary dependencies:
        ```bash
        npm install
        ```

## Usage

1. Start the backend server:
    ```bash
    php artisan serve
    ```
2. Start the frontend development server:
    ```bash
    npm run dev
    ```
3. Access the application in your browser at `http://localhost:5173`.

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes.
4. Commit your changes:
    ```bash
    git commit -m 'Add new feature'
    ```
5. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
6. Create a Pull Request.


## Contact

For questions or suggestions, please open an issue on the [GitHub repository](https://github.com/BR1WA/HR-System).

