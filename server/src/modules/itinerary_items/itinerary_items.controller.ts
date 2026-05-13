import { Request, Response, NextFunction } from "express";
import itineraryItemsService from "./itinerary_items.service";

class ItineraryItemsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await itineraryItemsService.createItineraryItem(req.body);

      return res.status(201).json({
        success: true,
        message: "Itinerary item created successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await itineraryItemsService.getItineraryItems(req.query);

      return res.status(200).json({
        success: true,
        message: "Itinerary items fetched successfully",
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  async countAll(req: Request, res: Response, next: NextFunction) {
    try {
      const total = await itineraryItemsService.countAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Itinerary items counted successfully",
        data: {
          total,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await itineraryItemsService.getItineraryItemById(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        message: "Itinerary item fetched successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await itineraryItemsService.updateItineraryItem(
        String(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Itinerary item updated successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await itineraryItemsService.deleteItineraryItem(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        message: "Itinerary item deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ItineraryItemsController();