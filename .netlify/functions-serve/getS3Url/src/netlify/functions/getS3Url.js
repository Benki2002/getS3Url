var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// netlify/functions/getS3Url.ts
var import_aws_sdk = __toESM(require("aws-sdk"));
var import_crypto = __toESM(require("crypto"));
var import_util = require("util");
var randomBytes = (0, import_util.promisify)(import_crypto.default.randomBytes);
var region = "us-east-1";
var bucketName = "beniko";
var accessKeyId = "AKIAWPNDMLEYB4G3MDJY";
var secretAccessKey = "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";
var s3 = new import_aws_sdk.default.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4"
});
exports.handler = async (event, context, callback) => {
  let resp;
  let putURL = "";
  try {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString();
    var putParams = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 2 * 60
    };
    var getParams = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 60 * 60,
      ResponseCacheControl: "max-age=604800"
    };
    var params = { Bucket: bucketName, Key: imageName, Expires: 60 };
    var promise = await s3.getSignedUrlPromise("putObject", params).then((value) => putURL = value);
    console.log("before resp URL", putURL);
    resp = {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        URL: putURL
      })
    };
  } catch (err) {
    console.log(err.stack);
    resp = {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: err.stack
    };
  }
  return resp;
};
//# sourceMappingURL=getS3Url.js.map
