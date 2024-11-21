import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import { body, param, query, validationResult } from 'express-validator';
import EventService from '../service/event.service';

const router = Router();

const eventService = new EventService();

const validateRequest: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

router.post(
  '/events',
  [
    body('eventName').isString().withMessage('Event name must be string'),
    body('eventDate')
      .isISO8601()
      .withMessage('Event date must be a valid date'),
    body('organizer').isString().withMessage('Organizer must be a string'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('phone').isString().withMessage('Phone must be a string'),
    body('location.street').isString().withMessage('Street must be a string'),
    body('location.city').isString().withMessage('City must be a string'),
    body('location.state').isString().withMessage('State must be a string'),
    body('location.zip').isString().withMessage('Zip must be a string'),
  ],
  validateRequest,
  (req: Request, res: Response) => eventService.addEvent(req, res)
);

router.put(
  '/events/:id',
  [
    param('id').isMongoId().withMessage('Invalid event ID'),
    body('eventName')
      .optional()
      .isString()
      .withMessage('Event name must be a string'),
    body('eventDate')
      .optional()
      .isISO8601()
      .withMessage('Event date must be a valid date'),
    body('organizer')
      .optional()
      .isString()
      .withMessage('Organizer must be a string'),
    body('email').optional().isEmail().withMessage('Email must be valid'),
    body('phone').optional().isString().withMessage('Phone must be a string'),
    body('location.street')
      .optional()
      .isString()
      .withMessage('Street must be a string'),
    body('location.city')
      .optional()
      .isString()
      .withMessage('City must be a string'),
    body('location.state')
      .optional()
      .isString()
      .withMessage('State must be a string'),
    body('location.zip')
      .optional()
      .isString()
      .withMessage('Zip must be a string'),
  ],
  validateRequest,
  (req: Request, res: Response) => eventService.updateEvent(req, res)
);

router.delete(
  '/events/:id',
  [param('id').isMongoId().withMessage('Invalid event ID')],
  validateRequest,
  (req: Request, res: Response) => eventService.deleteEvent(req, res)
);

router.get(
  '/events/:id',
  [param('id').isMongoId().withMessage('Invalid event ID')],
  validateRequest,
  (req: Request, res: Response) => eventService.getEventById(req, res)
);

router.get(
  '/events',
  [
    query('eventName')
      .optional()
      .isString()
      .withMessage('Event name must be a string'),
    query('organizer')
      .optional()
      .isString()
      .withMessage('Organizer must be a string'),
    query('eventDate')
      .optional()
      .isISO8601()
      .withMessage('Event date must be a valid ISO8601 date'),
  ],
  validateRequest,
  (req: Request, res: Response) => eventService.listEvent(req, res)
);

export { router as eventRouter };
