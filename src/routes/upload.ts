import { Router } from "express";
import { getBuckets, getUploadSignedUrl, getDownloadSignedUrl } from "../services/upload";

const router = Router();

router.get("/upload-presign-url", getUploadSignedUrl);

router.get("/buckets", getBuckets);

router.get("/download-presign-url", getDownloadSignedUrl);

export default router;
