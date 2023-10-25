import { Toggle } from '@src/components/toggle';

const Popup = () => {
  return (
    <div class='w-80 whitespace-nowrap bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-cyan-700 via-purple-800 to-pink-600 p-8 text-center text-lg text-white'>
      <h1 class='text-2xl font-bold'>Git Quick</h1>

      <div className='grid gap-4 text-left'>
        <p className='whitespace-normal'>Enable buttons</p>

        <Toggle labelText='Cherry Pick' />
        <Toggle labelText='Revert' />
      </div>
    </div>
  );
};

export default Popup;
