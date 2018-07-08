const storage = require('azure-storage');
const blobService = storage.createBlobService(
  'DefaultEndpointsProtocol=https;AccountName=mygreenvault;AccountKey=vYtRW695qL2ej9LVFwwwIqlD5qba8KK6KtUWmRqoXPQyTr8W6/I93Y2+wtnAQS27DomQcwmrcUhFP+oTk2tU5A==;EndpointSuffix=core.windows.net'
);

export interface uploadRequest {
  file: string;
  userId: string;
  plantId: string;
}

export const upload = (uploadRequest: uploadRequest) => {
  return new Promise((resolve, reject) => {
    // https://stackoverflow.com/questions/39582878/successfully-saving-base64-image-to-azure-blob-storage-but-blob-image-always-bro
    const containerName = 'plant-profile-photo';
    const fileParts = uploadRequest.file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const contentType = fileParts[1];
    const imageBuffer = new Buffer(fileParts[2], 'base64');

    const blobName = `${uploadRequest.userId}:${uploadRequest.plantId}:profile`;

    blobService.createBlockBlobFromText(
      containerName,
      blobName,
      imageBuffer,
      {
        contentSettings: {
          contentType: contentType
        }
      },
      (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve({ message: `Upload of '${blobName}' complete` });
        }
      }
    );
  });
};
