import { Toggle } from '@src/components/toggle';
import { useReducer } from 'preact/hooks';
import { initialState, reducer } from './reducer';

const Popup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div class='w-80 whitespace-nowrap bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-cyan-700 via-purple-800 to-pink-600 p-8 text-center text-lg text-white'>
      <h1 class='text-2xl font-bold'>Git Quick</h1>

      <div className='grid gap-4 text-left'>
        <p className='whitespace-normal'>Enable buttons</p>

        <Toggle
          labelText='Cherry Pick'
          isChecked={state.cherry}
          onChanged={() => dispatch({ type: 'cherry' })}
        />
        <Toggle
          labelText='Revert'
          isChecked={state.revert}
          onChanged={() => dispatch({ type: 'revert' })}
        />
      </div>
    </div>
  );
};

export default Popup;
