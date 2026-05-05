import { Request, Response, NextFunction } from "express";
import placesService from "./places.service";

class PlacesController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const place = await placesService.createPlace(req.body);

      return res.status(201).json({
        success: true,
        message: "Place created successfully",
        data: place,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const places = await placesService.getPlaces(req.query);

      return res.status(200).json({
        success: true,
        message: "Places fetched successfully",
        data: places,
      });
    } catch (error) {
      next(error);
    }
  }

  async countAll(req: Request, res: Response, next: NextFunction) {
    try {
      const total = await placesService.countAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Places counted successfully",
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
      const place = await placesService.getPlaceById(String(req.params.id));

      return res.status(200).json({
        success: true,
        message: "Place fetched successfully",
        data: place,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const place = await placesService.updatePlace(
        String(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Place updated successfully",
        data: place,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await placesService.deletePlace(String(req.params.id));

      return res.status(200).json({
        success: true,
        message: "Place deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PlacesController();