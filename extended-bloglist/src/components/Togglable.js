import { forwardRef, useImperativeHandle, useState } from 'react';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div className="togglable">
      <div style={hideWhenVisible}>
        <button
          style={{
            marginInline: 'auto',
            display: 'block',
            fontSize: '1.2rem',
            padding: '5px 15px',
            fontWeight: '500',
            borderWidth: '2px',
          }}
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}

        <button
          style={{ margin: '25px auto 0 auto', display: 'block' }}
          onClick={toggleVisibility}
        >
          cancel
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
