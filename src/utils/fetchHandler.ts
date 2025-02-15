interface FetchHandlerType {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  pathParams?: Array<string | number>;
  queryParams?: Record<string, unknown>;
  body?: Record<string, unknown>;
}


export async function fetchHandler(options: FetchHandlerType) {
  const { url, method = 'GET', pathParams, queryParams, body} = options;

  const path = pathParams?.length
    ? '/' + pathParams.join('/')
    : '';

  const queries = queryParams
    ? '?' + Object.entries(queryParams).map(([key, value]) => key + '=' + value).join('&')
    : '';

  try {
    const response = await fetch(url + path + queries, {
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
    const { data } = await response.json();
    return data;
  } catch {}
}