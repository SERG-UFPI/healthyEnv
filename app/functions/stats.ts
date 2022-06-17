export function getMedian(arr: number[]): number {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b)

  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
};

export function getFirstQuartile(arr: number[]): number {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b)

  const subArr = arr.length % 2 !== 0
    ? nums.slice(0, mid + 1)
    : nums.slice(0, mid)
  const subArrMid = Math.floor(subArr.length / 2)

  return subArr.length % 2 !== 0 ? subArr[subArrMid] : (subArr[subArrMid - 1] + subArr[subArrMid]) / 2
}

export function getThirdQuartile(arr: number[]): number {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b)

  const subArr = nums.slice(mid, arr.length),
    subArrMid = Math.floor(subArr.length / 2)

  return subArr.length % 2 !== 0 ? subArr[subArrMid] : (subArr[subArrMid - 1] + subArr[subArrMid]) / 2
}