import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async(event, context) => {
    const params = {
        TableName: process.env.tableName,
        Key: {
          // The attributes of the item to be created
          userId: "123", // The id of the author
          noteId: event.pathParameters.id, // A unique uuid
        },
      };

      const result = await dynamoDb.get(params);


      if(!result.Item){
          throw new Error("Item not found.");
      }

      return result.Item;
});