type State = {
  cherry: boolean;
  revert: boolean;
};

type Action = {
  type: 'cherry' | 'revert';
  value: boolean;
};

export const initialState: State = {
  cherry: true,
  revert: true,
};

const saveSync = (key: string, value: boolean) => {
  chrome.storage.sync.set({ [key]: value });
};

export type SyncKeys = 'cherry' | 'revert';

export const getSync = (
  key: SyncKeys,
  callback: (data: { [key: string]: any }) => void
) => {
  chrome.storage.sync.get(key, data => callback(data));
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'cherry':
      const newCherryState = {
        ...state,
        cherry: action.value,
      };

      saveSync('cherry', newCherryState.cherry);
      return newCherryState;

    case 'revert':
      const newRevertState = {
        ...state,
        revert: action.value,
      };

      saveSync('revert', newRevertState.revert);
      return newRevertState;
  }
};
