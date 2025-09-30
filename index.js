// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher

const TLSSigAPIv2 = require('./tools/TLSSigAPIv2');
const CDNTools = require('./tools/CDNTools');
const StartPublishCdnStream = require('./StartPublishCdnStream');
const UpdatePublishCdnStream = require('./UpdatePublishCdnStream');
const StopPublishCdnStream = require('./StopPublishCdnStream');
const { RESTAPI_SECRETID, RESTAPI_SECRETKEY, SDKAPPID, SECRETKEY, PUSH_DOMAIN, AUTHENTICATION_KEY} = require("./config");

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

const roomid = 1003 + "";

const SignApi = new TLSSigAPIv2.Api(SDKAPPID, SECRETKEY);

// Userid of the agent user
const agent_userid =  "agent_cdn_" + roomid;
// Generate the user signature of the agent user, valid for 7 days
const agent_user_sig = SignApi.genUserSig(agent_userid, 86400 * 7);

// Calculate the expiration time, 7 days later
const expirationTime = new Date().getTime() + (86400 * 7 * 1000);

// Generate the safe URL for pushing the stream
const publishCdnUrl = "rtmp://" + PUSH_DOMAIN + "/live/" + roomid + "?" +CDNTools.getSafeUrl(AUTHENTICATION_KEY, roomid, expirationTime);

// Userid of the user participating in the mixing
const userlist = ["7005", "7006"];

// The ID of the task to be stopped or updated, which is returned when StartPublishCdnStream is called successfully.
const taskId = "";

// Start the release of CDN streams and recordings.
StartPublishCdnStream.request(clientConfig, SDKAPPID, roomid, agent_userid, agent_user_sig, userlist, publishCdnUrl).then((response) => {
    console.log("StartPublishCdnStream Response: " + response);
    taskId = response.TaskId;
});

// Update the release of CDN streams and recordings.
// UpdatePublishCdnStream.request(taskId, SDKAPPID, roomid, agent_userid, agent_user_sig, userlist, publishCdnUrl).then((response) => {
//     console.log("UpdatePublishCdnStream Response: " + response);
//     taskId = response.TaskId;
// });

// Stop the release of CDN streams and recordings.
// StopPublishCdnStream.request(taskId, SDKAPPID).then((response) => {
//     console.log("StopPublishCdnStream Response: " + response);
//     taskId = response.TaskId;
// });

// {
//   TaskId: 'D0fl9aZRstzOXDmPyIeDoevpi-HaAKwfVf4UtbFuGdpi++Iw9pP0FOpOYkgdMNK52kIoPlhGeDRovtVcT2SnD1Ks9fLRAAA.',
//   RequestId: '398651fe-a639-48eb-8bf9-86a866bea7a2'
// }


