interface RequiredParamsResult {
  statusCode: 400 | 200
  error: string
}

function checkParams(
  requiredParams: string[],
  params: Object
): RequiredParamsResult {
  for (let param of requiredParams) {
    if (!(param in params)) {
      return {
        statusCode: 400,
        error: `'${param}' not found in parameters`,
      }
    }
  }

  return {
    statusCode:200,
    error: ""
  }
}

export { checkParams }
