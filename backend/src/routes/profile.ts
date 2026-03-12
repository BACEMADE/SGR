import { Router, Request, Response } from "express";
import { authenticate } from "../middleware/auth";
import { query } from "../db/pool";
import { z } from "zod";

const router = Router();

const updateProfileSchema = z.object({
  fullName: z.string().min(1).optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

// GET /api/profile
router.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT p.*, ur.role FROM profiles p JOIN user_roles ur ON p.user_id = ur.user_id WHERE p.user_id = $1",
      [req.user!.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const p = result.rows[0];
    return res.json({
      id: p.id,
      userId: p.user_id,
      email: p.email,
      fullName: p.full_name,
      phone: p.phone,
      city: p.city,
      avatarUrl: p.avatar_url,
      role: p.role,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    });
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/profile
router.patch("/", authenticate, async (req: Request, res: Response) => {
  try {
    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors[0].message });
    }

    const fields: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (parsed.data.fullName !== undefined) {
      fields.push(`full_name = $${idx++}`);
      values.push(parsed.data.fullName);
    }
    if (parsed.data.phone !== undefined) {
      fields.push(`phone = $${idx++}`);
      values.push(parsed.data.phone);
    }
    if (parsed.data.city !== undefined) {
      fields.push(`city = $${idx++}`);
      values.push(parsed.data.city);
    }
    if (parsed.data.avatarUrl !== undefined) {
      fields.push(`avatar_url = $${idx++}`);
      values.push(parsed.data.avatarUrl);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    fields.push(`updated_at = NOW()`);
    values.push(req.user!.userId);

    const result = await query(
      `UPDATE profiles SET ${fields.join(", ")} WHERE user_id = $${idx} RETURNING *`,
      values
    );

    const p = result.rows[0];
    return res.json({
      id: p.id,
      userId: p.user_id,
      email: p.email,
      fullName: p.full_name,
      phone: p.phone,
      city: p.city,
      avatarUrl: p.avatar_url,
      updatedAt: p.updated_at,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
