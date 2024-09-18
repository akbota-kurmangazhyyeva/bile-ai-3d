# DanceGen

DanceGen is an innovative application that generates dance movements based on user-provided music names. It leverages the YouTube Data API to retrieve audio files and uses the EDGE (Editable Dance Generation) machine learning model to create corresponding dance movements.

## Demo

Check out our demo video to see DanceGen in action:

[Demo Video](./demo_video.gif)

## Features

- Generate dance movements from any music name
- 3D visualization of generated dance movements using Autodesk FBX
- Efficient task queuing with Redis
- Secure deployment on Microsoft Azure
- File storage on Amazon S3
- User data management with MongoDB

## Tech Stack

- Backend: FastAPI, Docker
- Frontend: Next.js, TypeScript, Tailwind CSS
- Database: MongoDB
- Cache and Queue: Redis
- Cloud Services: Microsoft Azure, Amazon S3
- APIs: YouTube Data API
- 3D Visualization: Autodesk FBX

## Architecture

![DanceGen Architecture](./architecture.png)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/dancegen.git
   cd dancegen
   ```

2. Set up the backend:
   ```
   cd backend
   docker build -t dancegen-backend .
   docker run -p 8000:8000 dancegen-backend
   ```

3. Set up the frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```

4. Set up environment variables (create a `.env` file in both backend and frontend directories):
   ```
   YOUTUBE_API_KEY=your_youtube_api_key
   MONGODB_URI=your_mongodb_uri
   REDIS_URL=your_redis_url
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   ```

## Usage

1. Navigate to the application in your web browser.
2. Enter the name of a song or music piece.
3. Click "Generate Dance" to create a dance sequence.
4. View the 3D visualization of the generated dance movements.

## User Analytics

![User Analytics](./user_analytics.png)

As of August 2024, DanceGen has gained 300 users within the first 3 days of launch.

## Contributing

We welcome contributions to DanceGen! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- EDGE (Editable Dance Generation) model creators
- YouTube Data API
- Autodesk FBX SDK

## Contact

For any queries, please reach out to [your_email@example.com](mailto:your_email@example.com).
