import { Request, Response } from "express";
import { S3Client, ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION || "ap-southeast-2",
});

export async function getPresignedUrl(req: Request, res: Response) {
  try {
    // TODO: check if request is authenticated by PTX
    const bucketName = `${process.env.AWS_BUCKET_NAME!}-${process.env.APP_ENVIRONMENT!}`;
    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: "user1/docs/test.txt",
    });

    const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 60, // seconds
    });

    res.send({ success: true, signedUrl });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export async function getBuckets(req: Request, res: Response) {
  try {
    const data = await s3Client.send(new ListBucketsCommand());
    const buckets = data.Buckets;

    res.send(buckets);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
