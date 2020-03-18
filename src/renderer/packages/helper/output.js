export const errFormat = (error) => {
  let url = error.request.responseURL
  let text = error.request.responseText
  let message = error.message
  return `
      接口报错：\n
        responseURL: ${url}\n
        responseText: ${text}\n
        message: ${message}
    `
}