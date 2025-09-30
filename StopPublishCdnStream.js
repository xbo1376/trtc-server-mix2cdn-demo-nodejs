
const tencentcloud = require("tencentcloud-sdk-nodejs");
const { RESTAPI_SECRETID, RESTAPI_SECRETKEY} = require("./config");

const TrtcClient = tencentcloud.trtc.v20190722.Client;

const clientConfig = {
  credential: {
    secretId: RESTAPI_SECRETID,
    secretKey: RESTAPI_SECRETKEY,
  },
  region: "ap-beijing",
  profile: {
    httpProfile: {
      endpoint: "trtc.tencentcloudapi.com",
    },
  },
};

const request = function (taskId, sdkappid) {

    const client = new TrtcClient(clientConfig);
    const params = {
        "SdkAppId": parseInt(sdkappid, 0),
        "TaskId": taskId,
    };

    // console.log(params);

    client.StopPublishCdnStream(params).then(
    (data) => {
        console.log(data);
        return data;
    },
    (err) => {
        console.error("error", err);
        return err;
    }
    );
};

module.exports = {
    request,
}

// {
//   TaskId: 'D0fl9aZRstzOXDmPyIeDoevpi-HaAKwfVf4UtbFuGdpi++Iw9pP0FOpOYkgdMNK52kIoPlhGeDRovtVcT2SnD1Ks9fLRAAA.',
//   RequestId: '398651fe-a639-48eb-8bf9-86a866bea7a2'
// }


