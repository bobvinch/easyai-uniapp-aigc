import dayjs from "dayjs";

/**
 * 格式化日期
 * @param date
 * @param template
 */
export const formatDateTime = (date: Date, template = 'YYYY-MM-DD HH:mm:ss'): string => {
    return date ? dayjs(date).format(template) : ''
}
/**
 * 格式化日期格式年月日时分秒的字符串格式,如202409180001993232
 */
export const formatDateTimeString = (dateTime=Date.now()): string => {
    return dayjs(dateTime).format('YYYYMMDDHHmmssSSS')
}


/**
 * 判断文件类型是否为视频
 * @param url
 */
export const isVideo = (url: string | undefined): boolean => {
    if (!url) return false;
    const videoTypes = ["mp4", "webm", "mov", "avi", "mkv", "flv"];
    return videoTypes.some((type) => url.endsWith(type));
};


/** 生成指定位数的随机整数 */
export const generateRandomNumber = (length: number=9): number => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
};


export const randomId=(length=8) =>{
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'; // 小写字母
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 大写字母
    const digits = '0123456789'; // 数字

    // 所有可以选择的字符
    const allChars = lowerCaseLetters + upperCaseLetters + digits;

    let randomString = '';

    // 随机生成字符
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        randomString += allChars[randomIndex];
    }
    return randomString;
}

export const parseJSONToObject = <T>(json: string) => {
    let msgObj;
    try {
        let parsedString = JSON.parse(json);
        //需要经过两次转义
        if(typeof parsedString==='string'){
            msgObj=JSON.parse(parsedString)
        }else {
            msgObj=parsedString
        }
    } catch (err) {
        throw new Error('not json')
    }
    if (!msgObj) {
        throw new Error('not json')
    }
    return msgObj as T
}
