import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import * as fs from 'fs';
// import cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import { Users } from './static-data';
import { User } from './user';

const app: Application = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.json());

app.route('/api/login')
  .post(loginRoute);

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.route('/api/users/list').get(listUsers);

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');

export function isAuthenticated(req: Request, res: Response): string | boolean {
  const token = req.headers.authorization === undefined ? '' : req.headers.authorization;
  const decoded = jwt.verify(token, RSA_PUBLIC_KEY);
console.log(decoded);
  return decoded === undefined ? false : decoded.toString();
}

export function listUsers(req: Request, res: Response) {

  // TODO handle verification cases carefuly
  const authenticated  = isAuthenticated(req, res);
 console.log(authenticated);
  if (!authenticated) {
    res.sendStatus(401);
  } else {
    const users: User[] = (new Users()).listUsers();
    res.send(users);
  }
}

export function loginRoute(req: Request, res: Response) {

  const email = req.body.email,
    password = req.body.password;

  if (validateEmailAndPassword(email, password)) {
    const userId = findUserIdForEmail(email);

    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 120,
      subject: userId
    })

    // send the JWT back to the user
    // TODO - multiple options available                              
    res.send({
      token: jwtBearerToken
    })
  } else {
    // send status 401 Unauthorized
    res.sendStatus(401);
  }
}

export function validateEmailAndPassword(email: string, password: string): User {
  const usersik = new Users();
  return usersik.authenticate(email, password);
}

export function findUserIdForEmail(email: string): string {
  const userner = new Users();
  return userner.findByEmail(email)[0].id;
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
})