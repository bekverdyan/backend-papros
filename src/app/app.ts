import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import * as fs from 'fs';
// import cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import { Users } from './static-data';
import { User } from './user';

const app: Application = express();

app.use(bodyParser.json());

app.route('/api/login')
  .post(loginRoute);

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.route('/shfunc').post(shfuntikInformation);

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');

export function shfuntikInformation(req: Request, res: Response) {

  // TODO handle verification cases carefuly
  const token = req.headers.authorization;

  const decoded = jwt.verify(token, RSA_PUBLIC_KEY);

  if (decoded == undefined) {
    res.sendStatus(401);
  } else {
    res.send(decoded);
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

export function findUserIdForEmail(email: string) {
  return 'gago';
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
})