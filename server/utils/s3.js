const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("../../secrets");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log(
            "No file available. Something must have gone wrong with multer."
        );
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;
    const promise = s3
        .putObject({
            Bucket: `${secrets.AWS_S3_BUCKET}`,
            ACL: "public-read",
            Key: `${req.params.id}/${filename}`,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            next();
            fs.unlink(path, () => {});
        })
        .catch((err) => {
            console.log("Err in s3.putObject:", err);
            return res.sendStatus(500);
        });
};

module.exports.remove = (req, res, next) => {
    console.log("req.params:", req.params);
};
