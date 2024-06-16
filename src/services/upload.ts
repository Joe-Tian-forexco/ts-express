import { Request, Response } from "express-serve-static-core";
import { S3Client, ListBucketsCommand, PutObjectCommand, Bucket } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { UploadParams } from "../types/type";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION || "ap-southeast-2",
});

export async function getUploadSignedUrl(req: Request<{}, {}, {}, UploadParams>, res: Response) {
  const query = req.query;

  const { userId, category, fileName, extension } = query;

  try {
    // TODO: check if request is authenticated by PTX
    const bucketName = `${process.env.AWS_BUCKET_NAME!}-${process.env.APP_ENVIRONMENT!}`;
    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: `${userId}/${category}/${fileName}.${extension}`, // Note: optimise the file path for better organised s3 storage
    });

    const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 60, // seconds
    });

    res.status(200).send({ success: true, signedUrl });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export async function getBuckets(req: Request, res: Response<Bucket[] | undefined>) {
  try {
    // const sessionChecking = req.session;
    // const passportUserChecking = req.user;
    // console.log("passportUserChecking", passportUserChecking);
    // console.log("sessionChecking", sessionChecking);

    const data = await s3Client.send(new ListBucketsCommand());
    const buckets = data.Buckets;

    res.send(buckets);
  } catch (error) {
    console.log(error);
    res.send(undefined);
  }
}

export async function getDownloadSignedUrl(url: string) {
  try {
    await fetch(url, {
      method: "PUT",
      body: "Hello from PTX!",
    });
  } catch (error) {
    console.log(error);
  }
}
