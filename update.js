import dynamodbLib from "./libs/dynamodb-lib";
import handler from "./libs/handler-lib";

export const main = handler(async(event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: "123",
            noteId: event.pathParameters.id,
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":content" : data.attachment || null,
            ":attachment" : data.content || null,
        },
        ReturnValues: "ALL_NEW",
    };

    await dynamodbLib.update(params);

    return { status : true};
});