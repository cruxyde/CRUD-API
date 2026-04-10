"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const validateRequest_1 = require("../_middleware/validateRequest");
const request_service_1 = require("./request.service");
const router = (0, express_1.Router)();
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
exports.default = router;
function getAll(req, res, next) {
    request_service_1.requestService
        .getAll()
        .then((requests) => res.json(requests))
        .catch(next);
}
function getById(req, res, next) {
    request_service_1.requestService
        .getById(Number(req.params.id))
        .then((requestItem) => res.json(requestItem))
        .catch(next);
}
function create(req, res, next) {
    request_service_1.requestService
        .create(req.body)
        .then(() => res.json({ message: 'Request created' }))
        .catch(next);
}
function update(req, res, next) {
    request_service_1.requestService
        .update(Number(req.params.id), req.body)
        .then(() => res.json({ message: 'Request updated' }))
        .catch(next);
}
function _delete(req, res, next) {
    request_service_1.requestService
        .delete(Number(req.params.id))
        .then(() => res.json({ message: 'Request deleted' }))
        .catch(next);
}
function createSchema(req, res, next) {
    const schema = joi_1.default.object({
        employeeId: joi_1.default.number().integer().required(),
        departmentId: joi_1.default.number().integer().required(),
        type: joi_1.default.string().required(),
        description: joi_1.default.string().allow('').required(),
        status: joi_1.default.string().valid('pending', 'approved', 'rejected').default('pending'),
    });
    (0, validateRequest_1.validateRequest)(req, next, schema);
}
function updateSchema(req, res, next) {
    const schema = joi_1.default.object({
        employeeId: joi_1.default.number().integer(),
        departmentId: joi_1.default.number().integer(),
        type: joi_1.default.string().empty(''),
        description: joi_1.default.string().allow('').empty(''),
        status: joi_1.default.string().valid('pending', 'approved', 'rejected').empty(''),
    });
    (0, validateRequest_1.validateRequest)(req, next, schema);
}
