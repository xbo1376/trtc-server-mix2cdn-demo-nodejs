// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher

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

const request = function (taskId, sdkappid, roomid, agent_userid,  agent_user_sig, userlist, publishCdnUrl) {

    const client = new TrtcClient(clientConfig);
    const params = {
        "SdkAppId": parseInt(sdkappid, 0),
        "TaskId": taskId,
        "RoomId": roomid,
        "RoomIdType": 1,
        "AgentParams": {
            "UserId": agent_userid,
            "UserSig": agent_user_sig,
            "MaxIdleTime": 30
        },
        "WithTranscoding": 1,
        "AudioParams": {
            "AudioEncode": {
                "Codec": 0,
                "SampleRate": 48000,
                "Channel": 1,
                "BitRate": 64
            }
        },
        "VideoParams": {
            "VideoEncode": {
                "Width": 1440,
                "Height": 1280,
                "Fps": 15,
                "BitRate": 2400,
                "Gop": 2
            },
            "LayoutParams": {
                "MixLayoutMode": 4,
                "PureAudioHoldPlaceMode": 0,
                "MixLayoutList": [
                    {
                        "UserMediaStream": {
                            "UserInfo": {
                                "UserId": userlist[0],
                                "RoomId": roomid,
                                "RoomIdType": 0
                            },
                            "StreamType": 0
                        },
                        "ImageWidth": 720,
                        "ImageHeight": 1280,
                        "LocationX": 0,
                        "LocationY": 0,
                        "ZOrder": 1,
                        "RenderMode": 1
                    },
                    {
                        "UserMediaStream": {
                            "UserInfo": {
                                "UserId": userlist[1],
                                "RoomId": roomid,
                                "RoomIdType": 0
                            },
                            "StreamType": 0
                        },
                        "ImageWidth": 720,
                        "ImageHeight": 1280,
                        "LocationX": 720,
                        "LocationY": 0,
                        "ZOrder": 1,
                        "RenderMode": 1
                    }
                ]
            }
        },
        "PublishCdnParams": [
            {
                "PublishCdnUrl": publishCdnUrl,
                "IsTencentCdn": 1
            }
        ],
        "RecordParams": {
            "UniRecord": 3,
            "RecordFormat": [
                "mp4",
                "hls"
            ],
            "McuStorageParams": {
                "McuCloudVod": {
                    "McuTencentVod": {
                        "ExpireTime": 0,
                        "SubAppId": 1500012399
                    }
                }
            }
        }
    };

    // console.log(params);

    client.UpdatePublishCdnStream(params).then(
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


