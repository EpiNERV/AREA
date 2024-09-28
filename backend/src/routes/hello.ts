import { Router } from 'express';

const router = Router();

router.get('/hello', (_, res) => {
    res.send({ message: 'Hello World!' });
});

export default router;
