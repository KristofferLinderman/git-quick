type ToggleProps = {
  labelText: string;
  isChecked: boolean;
  onChanged: () => void;
};

export const Toggle = ({ labelText, isChecked, onChanged }: ToggleProps) => {
  return (
    <label className='flex cursor-pointer select-none items-center gap-2'>
      <div className='relative'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={onChanged}
          className='sr-only'
        />
        <div
          className={`block h-8 w-14 rounded-full border-2 border-slate-900 ${
            isChecked ? 'bg-green-500' : 'bg-slate-300'
          }`}
        />
        <div
          className={`dot absolute ${
            isChecked ? 'right-1' : 'left-1'
          } top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition`}
        >
          <span
            className={`h-3 w-3 rounded-full ${
              isChecked ? 'bg-green-500' : 'bg-white'
            }`}
          ></span>
        </div>
      </div>
      <p>{labelText}</p>
    </label>
  );
};
