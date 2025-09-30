
const crypto = require('crypto');

function getSafeUrl(key, streamName, txTime) {
    // 将txTime转换为16进制并大写（与Java的Long.toHexString(txTime).toUpperCase()对应）
    const hexTxTime = txTime.toString(16).toUpperCase();
    
    // 拼接字符串：KEY + streamName + txTime(16进制大写)
    const input = key + streamName + hexTxTime;
    
    let txSecret = null;
    try {
        // 使用MD5加密，与Java的MessageDigest.getInstance("MD5")对应
        const hash = crypto.createHash('md5');
        hash.update(input, 'utf-8');
        txSecret = hash.digest('hex');
    } catch (error) {
        console.error('Error occurred during MD5 calculation:', error);
    }
    
    return txSecret === null ? '' : 
        `txSecret=${txSecret}&txTime=${hexTxTime}`;
}


module.exports = {
    getSafeUrl,
}