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
    const listPromise = s3
        .listObjectsV2({
            Bucket: `${secrets.AWS_S3_BUCKET}`,
            Prefix: `${req.params.id}/`,
        })
        .promise();

    listPromise
        .then(({ Contents }) => {
            const newContents = [];
            Contents.forEach((element) => {
                newContents.push({ Key: element.Key });
            });
            const deletePromise = s3
                .deleteObjects({
                    Bucket: `${secrets.AWS_S3_BUCKET}`,
                    Delete: {
                        Objects: newContents,
                    },
                })
                .promise();
            return deletePromise;
        })
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log("Err in s3.deleteObjects:", err);
            return res.sendStatus(500);
        });
};
