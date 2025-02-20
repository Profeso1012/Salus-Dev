# Salus App

Salus is an AI-powered healthcare companion for the LASU Epe Campus community. It provides symptom checking and nearby hospital recommendations.

## Features

- Symptom checking using AI
- Nearby hospital recommendations
- User authentication

## Tech Stack

- Frontend: React Native
- Backend: Flask
- Database: SQLite (for development)

## Setup

### Backend

1. Navigate to the `backend` directory
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and fill in your actual secret key and API credentials
6. Run the Flask app: `python app.py`

### Frontend

1. Install dependencies: `npm install`
2. For iOS, install pods: `cd ios && pod install && cd ..`
3. Run the app:
   - For Android: `npx react-native run-android`
   - For iOS: `npx react-native run-ios`

## Testing

- For Android, enable USB debugging on your device and connect it to your computer before running.
- For iOS, open the `.xcworkspace` file in Xcode, select your device as the run target, and click the Run button.

## Deployment

Refer to the React Native documentation for instructions on deploying to app stores.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

