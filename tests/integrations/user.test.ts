import app from '../../src/app';
import { UserModel } from '../../src/models';
import supertest from 'supertest';

const request = supertest(app);
let server: any;

describe('POST /signUp', () => {
    beforeAll(async () => {
        server = app.listen();
    });

    afterAll(async () => {
        await server.close();
    });

    afterEach(async () => {
        await UserModel.deleteMany({});
    });

    it('should create a new user', async () => {
        const email = 'test@test.com';
        const password = 'password';
        const emailRegex = /"([^"]+)"/; // expressão regular para capturar o endereço de e-mail entre as aspas duplas

        const response = await request
            .post('/signUp')
            .send({ email, password })
            .expect(201);
        const responseText = response.body.user;
        const match = responseText.match(emailRegex);
        const userEmail = match ? match[1] : null; // extrai o endereço de e-mail capturado ou define como null se não houver correspondência
        expect(userEmail).toBe(email);
    });


    it('should return a 400 error if email is missing', async () => {
        const password = 'password';

        const response = await request
            .post('/signUp')
            .send({ password })
            .expect(400);

        expect(response.body.message).toBe('"\email\" is required');
    });

    it('should return a 400 error if password is missing', async () => {
        const email = 'test@test.com';

        const response = await request
            .post('/signUp')
            .send({ email })
            .expect(400);

        expect(response.body.message).toBe('"\password\" is required');
    });

    it('should return a 400 error if email is invalid', async () => {
        const email = 'invalid-email';
        const password = 'password';

        const response = await request
            .post('/signUp')
            .send({ email, password })
            .expect(400);

        expect(response.body.message).toBe('"\email\" must be a valid email');
    });

    it('should return a 409 error if email is already registered', async () => {
        const email = 'test@test.com';
        const password = 'password';

        await UserModel.create({ email, password });

        const response = await request
            .post('/signUp')
            .send({ email, password })
            .expect(409);

        expect(response.text).toBe('Email is already registered!');
    });
});
