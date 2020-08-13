import React, { useState } from "react";

type CopyLinkProps = {
  textToCopy: string;
  fill: string;
};

const CopyIcon = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Capa_1"
    enableBackground="new 0 0 512 512"
    height="512px"
    viewBox="0 0 512 512"
    width="512px"
  >
    <g>
      <g>
        <path
          d="m162.457 434.408c-23.427 23.444-61.433 23.444-84.861 0-23.075-23.059-23.443-60.249-1.088-83.757l126.465-126.465c-39.112-10.458-82.481-.832-113.748 28.904l-56.231 56.231c-44.711 47.015-43.975 121.395 2.176 167.514 46.855 46.887 122.867 46.887 169.722 0l51.846-51.846c31.425-31.404 41.785-75.905 31.086-115.947z"
          data-original="#000000"
          className="active-path"
          data-old_color="#000000"
          fill={fill}
        />
        <path
          d="m476.835 35.17c-46.119-46.151-120.499-46.887-167.514-2.176l-56.231 56.231c-29.735 31.268-39.361 74.637-28.904 113.748l126.465-126.465c23.508-22.355 60.697-21.987 83.757 1.088 23.444 23.428 23.443 61.433 0 84.861l-125.367 125.367c40.042 10.699 84.543.34 115.947-31.086l51.846-51.846c46.888-46.855 46.888-122.867.001-169.722z"
          data-original="#000000"
          className="active-path"
          data-old_color="#000000"
          fill={fill}
        />
        <path
          d="m164.774 347.228c11.714 11.722 30.717 11.722 42.43 0l140.023-140.023c11.722-11.714 11.722-30.717 0-42.43-11.53-11.538-30.125-11.722-41.878-.544l-141.12 141.12c-11.177 11.752-10.993 30.347.545 41.877z"
          data-original="#000000"
          className="active-path"
          data-old_color="#000000"
          fill={fill}
        />
      </g>
    </g>
  </svg>
);

const CopiedIcon = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="bold"
    enableBackground="new 0 0 24 24"
    height="512px"
    viewBox="0 0 24 24"
    width="512px"
  >
    <g>
      <path
        d="m12.25 2h-1.1c-.33-1.15-1.39-2-2.65-2s-2.32.85-2.65 2h-1.1c-.41 0-.75.34-.75.75v1.5c0 .96.79 1.75 1.75 1.75h5.5c.96 0 1.75-.79 1.75-1.75v-1.5c0-.41-.34-.75-.75-.75z"
        data-original="#000000"
        data-old_color="#000000"
        fill={fill}
      />
      <path
        d="m14.25 3h-.25v1.25c0 1.52-1.23 2.75-2.75 2.75h-5.5c-1.52 0-2.75-1.23-2.75-2.75v-1.25h-.25c-1.52 0-2.75 1.23-2.75 2.75v12.5c0 1.52 1.23 2.75 2.75 2.75h6.59c-.5-1.07-.8-2.25-.83-3.5h-4.76c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.84c.09-.61.24-1.19.44-1.75h-5.28c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h6c.39-.64.85-1.23 1.39-1.75h-7.39c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.44c1.15-.6 2.44-.96 3.81-.99v-2.76c0-1.52-1.23-2.75-2.75-2.75z"
        data-original="#000000"
        data-old_color="#000000"
        fill={fill}
      />
      <path
        d="m17.25 10.5c-3.722 0-6.75 3.028-6.75 6.75s3.028 6.75 6.75 6.75 6.75-3.028 6.75-6.75-3.028-6.75-6.75-6.75zm3.252 5.409-3.5 4c-.182.208-.442.332-.719.341-.011 0-.022 0-.033 0-.265 0-.519-.105-.707-.293l-2-2c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.244 1.244 2.796-3.196c.364-.414.995-.458 1.411-.094s.458.996.094 1.412z"
        data-original="#000000"
        data-old_color="#000000"
        fill={fill}
      />
    </g>
  </svg>
);

const CopyLink: React.FC<CopyLinkProps> = ({ textToCopy, fill }) => {
  const [copiedToClipBoard, setCopiedToClipBoard] = useState(false);

  const copyToClipboard = () => {
    if (window["clipboardData"] && window["clipboardData"].setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      setCopiedToClipBoard(true);

      setTimeout(() => {
        setCopiedToClipBoard(false);
      }, 5000);
      return window["clipboardData"].setData("Text", textToCopy);
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      var textarea = document.createElement("textarea");
      textarea.textContent = textToCopy;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        setCopiedToClipBoard(true);

        setTimeout(() => {
          setCopiedToClipBoard(false);
        }, 5000);
        return document.execCommand("copy"); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <div>
      <button aria-label="Copy to clipboard" onClick={(e) => copyToClipboard()}>
        {copiedToClipBoard ? (
          <CopiedIcon fill={fill} />
        ) : (
          <CopyIcon fill={fill} />
        )}
      </button>
    </div>
  );
};

export default CopyLink;
