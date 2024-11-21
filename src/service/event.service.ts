import Event from '../models/event.model';
import { Request, Response } from 'express';
import logger from '../utils/logger';

export default class EventService {
  async addEvent(req: Request, res: Response): Promise<void> {
    try {
      const { eventName, eventDate, organizer, email, phone, location } =
        req.body;
      const newEvent = new Event({
        eventName,
        eventDate: new Date(eventDate),
        organizer,
        email,
        phone,
        location,
      });
      await newEvent.save();
      res.status(201).json({
        message: 'Event added successfully',
        newEvent,
      });
    } catch (err) {
      logger.log('error', `addEvent :${err} - Error adding event`);

      res.status(500).json({
        message: 'Error adding event',
        err,
      });
    }
  }

  async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { eventName, eventDate, organizer, email, phone, location } =
        req.body;
      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        {
          eventName,
          eventDate: new Date(eventDate),
          organizer,
          email,
          phone,
          location,
          updatedAt: new Date(),
        },
        { new: true }
      );
      if (!updatedEvent) {
        res.status(404).json({
          message: 'Event not found',
        });
        return;
      }
      res.status(200).json({
        message: 'Event updated successfully',
        updatedEvent,
      });
    } catch (err) {
      logger.log('error', `updateEvent :${err} - Error updating event`);
      res.status(500).json({
        message: 'Error updating event',
        err,
      });
    }
  }

  async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
        res.status(404).json({
          message: 'Event not found',
        });
        return;
      }

      res.status(200).json({
        message: 'Event deleted successfully',
      });
    } catch (err) {
      logger.log('error', `deleteEvent :${err} - Error deleting event`);
      res.status(500).json({
        message: 'Error deleting event',
        err,
      });
    }
  }

  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const event = await Event.findById(id);
      if (!event) {
        res.status(404).json({
          message: 'Event not found',
        });
        return;
      }

      res.status(200).json({
        message: 'Event fetched successfully',
        event,
      });
    } catch (err) {
      logger.log('error', `getEventById :${err} - Error fetching event by id`);

      res.status(500).json({
        message: 'Error fetching event',
        err,
      });
    }
  }

  async listEvent(req: Request, res: Response): Promise<void> {
    try {
      const { eventName, organizer, eventDate } = req.query;
      let query: any = {};
      if (eventName) {
        query.eventName = { $regex: eventName, $options: 'i' };
      }
      if (organizer) {
        query.organizer = { $regex: organizer, $options: 'i' };
      }
      if (eventDate) {
        query.eventDate = new Date(eventDate as string);
      }
      const events = await Event.find(query);
      res.status(200).json({
        message: 'Event fetched successfully',
        events,
      });
    } catch (err) {
      logger.log('error', `listEvent :${err} - Error fetching all events`);
      res.status(500).json({
        message: 'Error fetching all event',
        err,
      });
    }
  }
}
