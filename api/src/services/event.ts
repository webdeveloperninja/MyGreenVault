const { EventHubClient } = require('@azure/event-hubs');
const client = EventHubClient.createFromConnectionString(process.env['EVENTHUB_CONNECTION_STRING'], process.env['EVENTHUB_NAME']);

export class EventClient {
  private readonly _addPlantPartitionKey = 'add-plant';

  addPlant(plant) {
    const eventData = { body: plant, partitionKey: this._addPlantPartitionKey };
    client.send(eventData);
  }
}
