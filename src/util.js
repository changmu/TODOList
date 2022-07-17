import dayjs from 'dayjs'

export function NowTimeStr() {
  return TimeStr(NowUnix())
}

// 秒级时间戳转换成字符串
export function TimeStr(sec) {
  return dayjs(sec * 1000).format('YYYY-MM-DD HH:mm:ss')
}

// 获取当前时间的秒级时间戳
export function NowUnix() {
  return Math.round(new Date() / 1000)
}