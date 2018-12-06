import * as http from 'http';
import app from './app';
import { normalizePort, onError, onListening } from './utils/utils';

const serve = http.createServer(app);
const port = normalizePort(process.env.port || 3000);

serve.listen(port);
serve.on('Error', onError(serve));
serve.on('Listening', onListening(serve));

