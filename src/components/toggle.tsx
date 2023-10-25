import { useState } from 'preact/hooks';

export const Toggle = ({ labelText }: { labelText: string }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className='flex cursor-pointer select-none items-center gap-2'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
          />
          <div
            className={`block h-8 w-14 rounded-full border-2 border-slate-900 ${
              isChecked ? 'bg-slate-300' : 'bg-green-500'
            }`}
          />
          <div
            className={`dot absolute ${
              isChecked ? 'left-1' : 'right-1'
            } top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition`}
          >
            <span
              className={`h-3 w-3 rounded-full ${
                isChecked ? 'bg-white' : 'bg-green-500'
              }`}
            ></span>
          </div>
        </div>
        <p>{labelText}</p>
      </label>
    </>
  );
};
