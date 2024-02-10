import { set } from "lodash";
import PropTypes from "prop-types";
import React, { forwardRef, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TextInput = forwardRef((props, ref) => {
  const {
    required,
    placeholder,
    className,
    onChange: parentOnChange,
    value,
    name,
    type,
    children,
    disabled,
    canNegativeNumber,
    showZeroNumber,
    zeroInputEnabled,
    isClearable,
    step,
    ...restProps
  } = props;

  const isInputChange = useRef(false);

  const setPositiveNumber = (value) => {
    const numberValue = Number(value);
    const decimalValues = value?.split?.(".")[1];
    return Math.abs(numberValue).toFixed(decimalValues?.length ?? 0);
  };

  const getValue = (value) => {
    if (typeof value === "undefined") {
      value = "";
    }

    if (type === "number") {
      if (!canNegativeNumber && !zeroInputEnabled) {
        value = setPositiveNumber(value);
      }

      if (zeroInputEnabled) {
        if (value === "0" || value === "00") {
          value = 0;
        } else if (!value) {
          value = "";
        } else {
          if (!canNegativeNumber) {
            value = setPositiveNumber(value);
          }
        }
      }
      if (value === "0" && !showZeroNumber && !zeroInputEnabled) {
        value = "";
      }
    }

    return value;
  };

  const modifiedValue = (value) => {
    let newValue = value;

    if (
      type === "number" &&
      !isInputChange?.current &&
      zeroInputEnabled &&
      !showZeroNumber &&
      (value === 0 || value === "0")
    ) {
      newValue = "";
    } else {
      newValue = value;
    }

    return newValue;
  };

  const onWheel = (e) => {
    if (type === "number") {
      e.target.blur();
    }
  };

  const onChange = (event) => {
    let value = event.target.value;
    if (value === "0" || value || value === 0) {
      isInputChange.current = true;
    }

    set(event, "target.value", getValue(value));

    if (typeof parentOnChange === "function") {
      parentOnChange(event);
    }
  };

  const clearValue = () => {
    if (typeof parentOnChange === "function") {
      parentOnChange({ target: { name, value: "" } });
    }
  };

  const ClearableButton = () => {
    return (
      <div
        className="absolute left-auto right-1 cursor-pointer px-2"
        onClick={() => clearValue()}
      >
        <span className="text-gray-600 dark:text-white text-xl font-semibold">
          <AiOutlineClose />
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="relative w-full flex items-center">
        <input
          ref={ref}
          className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-teal-500"
          required={required}
          type={type}
          name={name}
          placeholder={placeholder}
          value={modifiedValue(value)}
          onWheel={(e) => onWheel(e)}
          onChange={onChange}
          disabled={disabled}
          {...(type === "number" ? { step } : {})}
          {...restProps}
        />
        {isClearable && <ClearableButton />}
        {children}
      </div>
    </>
  );
});

TextInput.defaultProps = {
  type: "text",
  name: "",
  value: undefined,
  onChange: () => {},
  className: "",
  required: false,
  placeholder: "",
  canNegativeNumber: false,
  showZeroNumber: false,
  zeroInputEnabled: false,
  isClearable: false,
  step: "any",
};

TextInput.propTypes = {
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  canNegativeNumber: PropTypes.bool,
  showZeroNumber: PropTypes.bool,
  zeroInputEnabled: PropTypes.bool,
  isClearable: PropTypes.bool,
};

TextInput.displayName = "TextInput";

export default TextInput;
