interface RequiredParamsResult {
  statusCode: 400 | 200;
  error: string | null;
}

/**
 * Checks if all required parameters are present in the provided params object.
 * @param requiredParams An array of strings representing the keys that must be present in the params object.
 * @param params An object which is checked against the requiredParams.
 * @returns {RequiredParamsResult} An object containing a statusCode and an error message if any required parameter is missing.
 */
function checkParams(
  requiredParams: string[],
  params: { [key: string]: any }
): RequiredParamsResult {
  // Ensure params is a valid object
  if (typeof params !== 'object' || params === null) {
    return {
      statusCode: 400,
      error: 'Invalid parameters object provided',
    };
  }

  for (let param of requiredParams) {
    if (!(param in params)) {
      return {
        statusCode: 400,
        error: `'${param}' not found in parameters`,
      };
    }
  }

  return {
    statusCode: 200,
    error: null  // Returning null to explicitly indicate no error
  };
}

export { checkParams };
