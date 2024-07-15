import http from 'http';
import app from './app/app'; 

// Create a server
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server started and running at Port ${PORT}`);
});