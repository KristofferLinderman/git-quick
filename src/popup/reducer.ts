type State = {
  cherry: boolean;
  revert: boolean;
};

type Action = {
  type: 'cherry' | 'revert';
};

export const initialState: State = {
  cherry: true,
  revert: true,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'cherry':
      return {
        ...state,
        cherry: !state.cherry,
      };

    case 'revert':
      return {
        ...state,
        revert: !state.revert,
      };
  }
};
