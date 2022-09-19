import * as React from 'react';
import { useEffect, useRef } from 'react';

export interface DialogProps {
  title: string;
  open: boolean;
  toggle: () => void;
  className: string;
  children: React.ReactNode[]
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const { open, toggle, title, className, children } = props;
  const dialogRef = useRef();

  useEffect(() => {
    if (dialogRef?.current == null) {
      return;
    }

    if (open) {
      // @ts-ignore
      dialogRef.current.showModal();
    } else {
      // @ts-ignore
      dialogRef.current.close();
    }
  }, [open]);

  return <dialog ref={dialogRef} className={className}>
    <div className="bg-black bg-opacity-80 p-4 text-white flex justify-between items-center">
      <span>{title}</span>
      <button>
        <i className="mi-close text-lg" onClick={toggle} />
      </button>
    </div>
    <div className="p-4">
      {children}
    </div>
  </dialog>
}
