import { useMemo } from 'react';


// TODO 拆分組件，優化效能
// TODO 阻件內使用 setState
// TODO 使用 onBlur 事件回傳更新值


interface FieldProps {
  id?: string;
  className?: string;
  label?: string;
}


interface TextFieldProps extends FieldProps {
  type?: 'text' | 'password' | 'email' | 'number';
  defaultValue?: string | number;
  placeholder?: string;
  onInput?: (value: string) => void;
}


interface SelectFieldProps extends FieldProps {
  type: 'select';
  defaultValue?: string | number;
  options: Array<{
    value: string;
    label: string;
  }>;
  onChange?: (value: string) => void;
}


interface TextareaFieldProps extends FieldProps {
  type: 'textarea';
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
  onInput?: (value: string) => void;
}


interface ImageFieldProps extends FieldProps {
  type: 'image';
  defaultValue?: string | null;
  aspectRatio?: `${number}/${number}`;
  onChange?: (value: string) => void;
}


export default function Field(props: TextFieldProps | TextareaFieldProps | ImageFieldProps | SelectFieldProps) {
  const createField = () => {
    if (props.type === 'select') {
      return (
        <select
          value={props.defaultValue}
          onChange={event => props.onChange?.(event.target.value)}
        >
          {props.options.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      );
    } else if (props.type === 'textarea') {
      return (
        <textarea
          rows={props.rows}
          placeholder={props.placeholder}
          value={props.defaultValue}
          onChange={event => props.onInput?.(event.target.value)}
        />
      );
    } else if (props.type === 'image') {
      return (
        <>
          <input
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={event => {
              const file = event.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  props.onChange?.(reader.result as string);
                  event.target.value = '';
                };
              }
            }}
          />
          <div
            className='util-field-image'
            style={{
              backgroundImage: `url(${props.defaultValue})`,
              aspectRatio: props.aspectRatio || '16/9',
            }}
          >
            {
              props.defaultValue && (
                <button
                  className='util-field-image-clear'
                  type='button'
                  onClick={event => {
                    event.preventDefault();
                    props.onChange?.('');
                  }}
                >
                  Ｘ
                </button>
              )
            }
          </div>
        </>
      );
    } else {
      return (
        <input
          type={props.type || 'text'}
          placeholder={props.placeholder}
          value={props.defaultValue}
          onChange={event => props.onInput?.(event.target.value)}
        />
      );
    }
  };

  const fieldElement = useMemo(() => createField(), [props]);

  return (
    <label
      id={props.id}
      className={'util-field' + (props.className ? ' ' + props.className : '')}
    >
      {props.label || ''}
      {fieldElement}
    </label>
  );
};