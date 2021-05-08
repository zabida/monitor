const syncTypeMap = [
  {
    syncType: '0',
    label: '每5分钟',
    seconds: 5 * 60
  }, {
    syncType: '1',
    label: '每小时',
    seconds: 60 * 60
  }, {
    syncType: '2',
    label: '每天',
    seconds: 24 * 60 * 60
  }, {
    syncType: '3',
    label: '每周',
    seconds: 7 * 24 * 60 * 60
  }]

const JobStatisticsLatestSize = 6

export { syncTypeMap, JobStatisticsLatestSize }
