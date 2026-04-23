import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { adminService } from './admin.service';

const router = Router();

router.get('/accounts', getAllAccounts);
router.put('/accounts/:id', updateAccount);
router.delete('/accounts/:id', deleteAccount);
router.get('/requests', getAllRequests);
router.put('/requests/:id/status', updateRequestStatus);

export default router;

function getAllAccounts(req: Request, res: Response, next: NextFunction): void {
  adminService
    .getAllAccounts()
    .then((accounts) => res.json(accounts))
    .catch(next);
}

function updateAccount(req: Request, res: Response, next: NextFunction): void {
  adminService
    .updateAccount(Number(req.params.id), req.body)
    .then((result) => res.json(result))
    .catch(next);
}

function deleteAccount(req: Request, res: Response, next: NextFunction): void {
  adminService
    .deleteAccount(Number(req.params.id))
    .then((result) => res.json(result))
    .catch(next);
}

function getAllRequests(req: Request, res: Response, next: NextFunction): void {
  adminService
    .getAllRequests()
    .then((requests) => res.json(requests))
    .catch(next);
}

function updateRequestStatus(req: Request, res: Response, next: NextFunction): void {
  adminService
    .updateRequestStatus(Number(req.params.id), req.body.status)
    .then((result) => res.json(result))
    .catch(next);
}
