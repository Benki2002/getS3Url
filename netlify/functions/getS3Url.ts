import aws from 'aws-sdk';
import crypto from 'crypto';
import { promisify } from "util"

const randomBytes = promisify(crypto.randomBytes)
const region = ""
const bucketName = ""
const accessKeyId =""
const secretAccessKey = ""

const s3 = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: 'v4'
})
//Handler
exports.handler = async (event: any, context: any, callback: any) => {
	let resp: any
	let putURL: string = ''
	try {
		const rawBytes = await randomBytes(16)
		const imageName = rawBytes.toString()
		// The PUT operation will only be valid for the next 2-minutes.
		var params = { Bucket: bucketName, Key: imageName, Expires: 60 };
		var promise = await s3.getSignedUrlPromise('putObject', params).then(value=>putURL=value)

		console.log(' URL', putURL)
		//console.log('before resp URL', promise.ok)
		resp = {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				URL:putURL 
				//getURL: getUrl
			})
		}
	} catch (err: any) {
		console.log(err.stack)
		resp = {
			statusCode: 400,
			headers: { 'Content-Type': 'application/json' },
			body: err.stack
		};
	}
	return resp

}
