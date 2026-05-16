// src/modules/trips/trips.controller.ts

import { Request, Response, NextFunction } from "express";
import tripsService from "./trips.service";

class TripsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const trip = await tripsService.createTrip(req.body);

      return res.status(201).json({
        success: true,
        message: "Trip created successfully",
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const trips = await tripsService.getTrips(req.query);

      return res.status(200).json({
        success: true,
        message: "Trips fetched successfully",
        data: trips,
      });
    } catch (error) {
      next(error);
    }
  }

  async countAll(req: Request, res: Response, next: NextFunction) {
    try {
      const total = await tripsService.countAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Trips counted successfully",
        data: {
          total,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async countByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const total = await tripsService.countByUserId(String(req.params.user_id));

      return res.status(200).json({
        success: true,
        message: "Trips counted by user successfully",
        data: { total },
      });
    } catch (error) {
      next(error);
    }
  }

  async countByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const total = await tripsService.countByStatus(String(req.params.status));

      return res.status(200).json({
        success: true,
        message: "Trips counted by status successfully",
        data: { total },
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const trip = await tripsService.getTripById(String(req.params.id));

      return res.status(200).json({
        success: true,
        message: "Trip fetched successfully",
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const trips = await tripsService.getTripsByUserId(String(req.params.user_id));

      return res.status(200).json({
        success: true,
        message: "User trips fetched successfully",
        data: trips,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const trip = await tripsService.updateTrip(
        String(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Trip updated successfully",
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await tripsService.deleteTrip(String(req.params.id));

      return res.status(200).json({
        success: true,
        message: "Trip deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TripsController();
