const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("../../secrets");
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-central-1",
});

module.exports.sendEmail = function (recipient, subject, body) {
    return ses
        .sendEmail({
            Source: "SES Test <stefanmpfeuffer@gmail.com>",
            Destination: {
                ToAddresses: [recipient],
            },
            Message: {
                Body: {
                    Text: {
                        Data: body,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise();
};
