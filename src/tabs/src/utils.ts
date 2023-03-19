export function randomId(len: number): string {
  let outStr = ''
  const tempStr = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < len; i++) {
    outStr += tempStr.charAt(Math.floor(Math.random() * tempStr.length))
  }
  return outStr
}
