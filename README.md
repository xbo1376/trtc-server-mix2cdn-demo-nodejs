# Documentation: Using Server-Side REST API to Initiate Mixed Streaming, Relay, and Recording

## 1. Download the Server-Side SDK (Using Node.js as an Example)
- **Developer Resources**:  
  [TRTC Developer Documentation](https://trtc.io/document/48247?product=rtcengine&menulabel=core%20sdk&platform=android#5.-developer-resources)  
- **Node.js SDK Download**:  
  [Tencent Cloud Node.js SDK GitHub Repository](https://github.com/TencentCloud/tencentcloud-sdk-nodejs-intl-en/tree/master)  

## 2. Obtain Server-Side API Credentials
1. Log in to the **Tencent Cloud Console**.
2. Navigate to **Access Management** > **Access Keys**.
3. Click **Create Key** and save the generated `SecretId` and `SecretKey` for backend API calls.  
   - **Console Link**: [Access Management](https://console.tencentcloud.com/cam/capi)  

## 3. Call the `StartPublishCdnStream` API for Mixed Streaming, Relay, and Recording

### 3.1 Bot Parameters (`AgentParams`)
- Obtain the application’s `sdkappid` and `SDKSecretKey` from the **TRTC Console**:  
  [TRTC Console Overview](https://console.trtc.io/overview)  
- Implement backend `UserSig` generation:  
  Refer to the [UserSig Generation Documentation](https://trtc.io/document/35166?product=rtcengine&menulabel=core%20sdk&platform=web#formal) and demo logic.

### 3.2 Mixed Streaming Parameters (`VideoParams.LayoutParams`)
- Dynamically adjust parameters based on the number of participants in the mixed stream.

### 3.3 Relay Parameters (`PublishCdnParams`)
1. Configure and obtain the **push domain**:  
   [Live Streaming Domain Management](https://console.tencentcloud.com/live/domainmanage)  
2. Obtain and record the **push domain authentication key** for generating push URLs on the backend.  
3. Construct the relay CDN URL:  
   Refer to the [CDN Relay Documentation](https://www.tencentcloud.com/document/product/267/38393?lang=en&pg=) and demo logic.

### 3.4 Recording Parameters (`RecordParams`)
- Obtain the **VOD AppID**:  
  [VOD Application Management](https://console.tencentcloud.com/vod/app-manage)  
- Refer to the demo logic for implementation details.

## 4. Demo Example
- **GitHub Repository**:  
  [TRTC Server Mixed Streaming to CDN Demo (Node.js)](https://github.com/xbo1376/trtc-server-mix2cdn-demo-nodejs)