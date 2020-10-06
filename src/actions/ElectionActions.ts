import { Action, Dispatch } from 'redux';
import { Election, ElectionForm } from '../models/App';

//
// start Election actions
//

export const REFRESH_ELECTIONS_REQUEST_ACTION = 'REFRESH_ELECTIONS_REQUEST';
export const REFRESH_ELECTIONS_DONE_ACTION = 'REFRESH_ELECTIONS_DONE';
export const EXPAND_ELECTION_ACTION = 'EXPAND_ELECTION';
export const APPEND_ELECTION_ACTION = 'APPEND_ELECTION';

export type RefreshElectionsRequestAction = Action<string>;
export interface RefreshElectionsDoneAction extends Action<string> {
  payload: {
    elections: Election[];
  };
}
export interface ExpandElectionAction extends Action<string> {
  payload: {
    expandedElectionId: number;
  };
}
export interface AppendElectionAction extends Action<string> {
  payload: {
    election: Election;
  };
}

export type CreateRefreshElectionsRequestAction = () => RefreshElectionsRequestAction;
export type CreateRefreshElectionsDoneAction = (election: Election[]) => RefreshElectionsDoneAction;
export type CreateExpandElectionAction = (expandedElectionId: number) => ExpandElectionAction;
export type CreateAppendElectionAction = (election: Election) => AppendElectionAction;

export const createRefreshElectionsRequestAction: CreateRefreshElectionsRequestAction = () => ({
  type: REFRESH_ELECTIONS_REQUEST_ACTION,
});

export const createRefreshElectionsDoneAction: CreateRefreshElectionsDoneAction = (elections: Election[]) => ({
  type: REFRESH_ELECTIONS_DONE_ACTION,
  payload: {
    elections,
  },
});

export const createExpandElectionAction: CreateExpandElectionAction = (expandedElectionId: number) => ({
  type: EXPAND_ELECTION_ACTION,
  payload: {
    expandedElectionId,
  },
});

export const createAppendElectionAction: CreateAppendElectionAction = (election: Election) => ({
  type: APPEND_ELECTION_ACTION,
  payload: {
    election,
  },
});

export function isRefreshElectionsRequestAction(action: Action<string>): action is RefreshElectionsRequestAction {
  return [REFRESH_ELECTIONS_REQUEST_ACTION].includes(action.type);
}

export function isRefreshElectionsDoneAction(action: Action<string>): action is RefreshElectionsDoneAction {
  return [REFRESH_ELECTIONS_DONE_ACTION].includes(action.type);
}

export function isExpandElectionAction(action: Action<string>): action is ExpandElectionAction {
  return [EXPAND_ELECTION_ACTION].includes(action.type);
}

export function isAppendElectionAction(action: Action<string>): action is AppendElectionAction {
  return [APPEND_ELECTION_ACTION].includes(action.type);
}

export const refreshElections = () => {
  return async (dispatch: Dispatch) => {
    dispatch(createRefreshElectionsRequestAction());
    const res = await fetch('http://localhost:3060/elections');
    const elections = await res.json();
    dispatch(createRefreshElectionsDoneAction(elections));
  };
};

export const appendElection = (electionForm: ElectionForm) => {
  return async (dispatch: Dispatch) => {
    const appendedElection = await fetch('http://localhost:3060/elections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(electionForm),
    }).then(res => res.json());
    dispatch(createAppendElectionAction(appendedElection));
  };
};

//
// end Election actions
//
