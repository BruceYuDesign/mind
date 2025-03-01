import validator from 'validator';


interface SchemaType {
  isVerify: boolean;
  message: string;
};


function validatorMethods(schema: SchemaType[]) {
  return {
    isVerify: schema.every(({ isVerify }) => isVerify),
    getErrors: () => schema.filter(({ isVerify }) => !isVerify).map(({ message }) => message),
  };
};


/**
 * --------------------------------------------------
 * BLOG
 * --------------------------------------------------
 */
interface BlogDataType {
  title: string;
  description: string;
  thumbnail: string;
  content: string;
};


export function blogValidator(data: BlogDataType) {
  const base64Pattern = /data:image\/(png|jpeg|jpg|gif|webp);base64,/i;

  const schema = [
    // title
    {
      isVerify: validator.isByteLength(data.title, { min: 1, max: 60 }),
      message: 'Title length must be between 1 and 60 characters.',
    },
    // description
    {
      isVerify: validator.isByteLength(data.description, { min: 1, max: 200 }),
      message: 'Description length must be between 1 and 200 characters.',
    },
    // thumbnail
    {
      isVerify: !data.thumbnail || validator.isURL(data.thumbnail, { require_protocol: true }),
      message: 'Thumbnail must be a valid URL with a protocol.',
    },
    {
      isVerify: !validator.matches(data.thumbnail, base64Pattern),
      message: 'Base64 images are not allowed in thumbnail.',
    },
    // content
    {
      isVerify: validator.isByteLength(data.content, { min: 1, max: 8000 }),
      message: 'Content length must be between 1 and 8000 bytes.',
    },
    {
      isVerify: !validator.matches(data.content, base64Pattern),
      message: 'Base64 images are not allowed in content.',
    },
  ];

  return validatorMethods(schema);
};