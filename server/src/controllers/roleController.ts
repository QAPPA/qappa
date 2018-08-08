import { Request, Response, Router } from 'express';
import { admin } from '../middleware/auth';

const router = Router();

// list all
router.get('/', admin, (req: Request, res: Response) => {

});

// add new
router.post('/', admin, (req: Request, res: Response) => {

});

// detail
router.get('/:id(\\d+)', admin, (req: Request, res: Response) => {

});

// edit
router.put('/:id(\\d+)', admin, (req: Request, res: Response) => {

});

// delete
router.delete('/:id(\\d+)', admin, (req: Request, res: Response) => {

});

export default router;
