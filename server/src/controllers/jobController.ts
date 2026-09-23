import type {
  Request,
  Response,
} from "express";

import { searchJobs } from "../services/jsearchService.js";

export async function getJobs(
  req: Request,
  res: Response
) {
  try {
    const query =
      typeof req.query.q === "string"
        ? req.query.q.trim()
        : "software developer";

    const location =
      typeof req.query.location === "string"
        ? req.query.location.trim()
        : "Malawi";

    const cursor =
      typeof req.query.cursor === "string"
        ? req.query.cursor
        : undefined;

    if (!query) {
      return res.status(400).json({
        success: false,
        message:
          "Search query is required.",
      });
    }

    const result =
      await searchJobs(
        query,
        location,
        cursor
      );

    return res.json({
      success: true,

      count:
        result.jobs.length,

      query,

      location,

      jobs:
        result.jobs,

      nextCursor:
        result.nextCursor,
    });
  } catch (error) {
    console.error(
      "Job search error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch jobs at the moment.",
    });
  }
}