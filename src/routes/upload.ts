import { Router } from "express";
import { getBuckets, getPresignedUrl } from "../services/upload";

const router = Router();

router.get("/presign-url", getPresignedUrl);

router.get("/buckets", getBuckets);

export default router;
