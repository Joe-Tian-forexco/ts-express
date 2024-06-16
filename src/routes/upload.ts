import { Router } from "express";
import { getBuckets, getUploadSignedUrl, getDownloadSignedUrl, getUsersTest, getSuperTest } from "../services/upload";

const router = Router();

router.get("/upload-presign-url", getUploadSignedUrl);

router.get("/buckets", getBuckets);

router.get("/download-presign-url", getDownloadSignedUrl);

router.get("/test", getUsersTest);

router.get("/supertest", getSuperTest);

export default router;
