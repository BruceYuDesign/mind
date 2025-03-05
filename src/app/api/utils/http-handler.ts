import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


interface DataType {
  id: string | number;
  [key: string]: unknown;
}


interface DataWithPaginationType {
  items: DataType[];
  pagenation: {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  }
}


interface ResponseType {
  code: number;
  message: string;
}


export const responseDict = {
  SUCCESS: {
    OK: {
      code: 2000,
      message: 'SUCCESS: OK'
    },
    GET_SUCCESSFUL: {
      code: 2001,
      message: 'SUCCESS: Get Successful',
    },
    UPDATE_SUCCESSFUL: {
      code: 2002,
      message: 'SUCCESS: Update Successful',
    },
    DELETE_SUCCESSFUL: {
      code: 2003,
      message: 'SUCCESS: Delete Successful',
    },
    CREATED: {
      code: 2010,
      message: 'SUCCESS: Created',
    },
    CREATE_SUCCESSFUL: {
      code: 2011,
      message: 'SUCCESS: Create Successful',
    },
  },
  CLIENT_ERROR: {
    BAD_REQUEST: {
      code: 4000,
      message: 'CLIENT_ERROR: Bad Request',
    },
    UNAUTHORIZED: {
      code: 4010,
      message: 'CLIENT_ERROR: Unauthorized',
    },
    PAYMENT_REQUIRED: {
      code: 4020,
      message: 'CLIENT_ERROR: Payment Required',
    },
    FORBIDDEN: {
      code: 4030,
      message: 'CLIENT_ERROR: Forbidden',
    },
    NOT_FOUND: {
      code: 4040,
      message: 'CLIENT_ERROR: Not Found',
    },
    METHOD_NOT_ALLOWED: {
      code: 4050,
      message: 'CLIENT_ERROR: Method Not Allowed',
    },
    NOT_ACCEPTABLE: {
      code: 4060,
      message: 'CLIENT_ERROR: Not Acceptable',
    },
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: {
      code: 5000,
      message: 'SERVER_ERROR: Internal Server Error',
    },
  }
}


const prismaErrorDict: Record<string, ResponseType> = {
  P2025: responseDict.CLIENT_ERROR.NOT_FOUND,
  // TODO User Not Found
  // TODO Bad Request
}


export function responseHandler(responseDict: ResponseType, data?: DataType | DataWithPaginationType) {
  const httpStatusCode = Math.floor(responseDict.code / 10);
  return new Response(
    JSON.stringify({ data: data || null, ...responseDict }),
    { status: httpStatusCode },
  );
}


export async function requestHandler(callback: () => Promise<Response>) {
  try {
    return await callback();
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      const matchError = prismaErrorDict[error.code];
      if (matchError) {
        return responseHandler(matchError);
      }
    }
    return responseHandler(responseDict.SERVER_ERROR.INTERNAL_SERVER_ERROR);
  }
}