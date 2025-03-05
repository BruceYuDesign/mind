import validator from 'validator';


type DataType = Record<string, unknown>;


type SchemaType = Record<string, {
  required: boolean,
  rules: Array<{
    rule: () => boolean,
    message: string,
  }>
}>


function validatorMethods(data: DataType, schema: SchemaType) {
  return {
    isVerify: () => Object.entries(schema).every(([key, { required, rules }]) => {
      if (!data[key]) {
        return !required;
      };
      return rules.every(({ rule }) => rule());
    }),
    getErrors: () => Object.entries(schema)
      .flatMap(([key, { required, rules }]) => {
        if (!data[key]) {
          return [required ? `Data "${key}" is required.` : null];
        };
        return rules.map(({ rule, message }) =>
          rule() ? message : null
        );
      })
      .filter(message => message),
  };
};


/**
 * --------------------------------------------------
 * BLOG
 * --------------------------------------------------
 */
interface BlogDataType extends DataType {
  title: string;
  description: string;
  thumbnail: string;
  content: string;
};


export function blogValidator(data: BlogDataType) {
  const base64Pattern = /data:image\/(png|jpeg|jpg|gif|webp);base64,/i;

  const schema = {
    title: {
      required: true,
      rules: [
        {
          rule: () => validator.isByteLength(data.title, { min: 1, max: 60 }),
          message: 'Title length must be between 1 and 60 characters.',
        },
      ],
    },
    description: {
      required: false,
      rules: [
        {
          rule: () => validator.isByteLength(data.description, { min: 1, max: 200 }),
          message: 'Description length must be between 1 and 200 characters.',
        },
      ],
    },
    thumbnail: {
      required: false,
      rules: [
        {
          rule: () => validator.isURL(data.thumbnail, { require_protocol: true }),
          message: 'Thumbnail must be a valid URL with a protocol.',
        },
        {
          rule: () => validator.isURL(data.thumbnail, { require_protocol: true }),
          message: 'Thumbnail must be a valid URL with a protocol.',
        },
        {
          rule: () => !validator.matches(data.thumbnail, base64Pattern),
          message: 'Base64 images are not allowed in thumbnail.',
        },
      ],
    },
    content: {
      required: true,
      rules: [
        {
          rule: () => validator.isByteLength(data.content, { min: 1, max: 8000 }),
          message: 'Content length must be between 1 and 8000 bytes.',
        },
        {
          rule: () => !validator.matches(data.content, base64Pattern),
          message: 'Base64 images are not allowed in content.',
        },
      ]
    }
  };

  return validatorMethods(data, schema);
};