import { Action, Dispatch } from 'redux';
import { Election, Voter } from '../models/App';
import { refreshVoters } from '../actions/AppActions';
import { refreshElections } from '../actions/ElectionActions';

export const CAPTURE_ELECTION_VOTES_ACTION = "CAPTURE_ELECTION_VOTES";
export const SET_CURRENT_ELECTION_ACTION = "SET_CURRENT_ELECTION";
export const SET_CURRENT_VOTER_ACTION = "SET_CURRENT_VOTER";

// start capture election votes action
export interface CaptureElectionVotesAction extends Action<string> {
  payload: { election: Election }
}

export type CreateCaptureElectionVotesAction = (election: Election) => CaptureElectionVotesAction;

export const createCaptureElectionVotesAction: CreateCaptureElectionVotesAction = (election) => ({
  type: CAPTURE_ELECTION_VOTES_ACTION,
  payload: { election }
});

export const submitElectionVotes = (election: Election) => {
  return async (dispatch: Dispatch) => {
    dispatch(createCaptureElectionVotesAction(election));
    await fetch(`http://localhost:3060/elections/${encodeURIComponent(election.id.toString())}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(election),
    });
    refreshVoters()(dispatch);
    refreshElections()(dispatch);
  };
};
// end capture election votes action

// start handle return
export const handleReturn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(createSetCurrentElectionAction({} as Election));
    dispatch(createSetCurrentVoterAction({} as Voter));
  };
};

// end handle return

// start set current election action
export interface SetCurrentElectionAction extends Action<string> {
  payload: { election: Election }
}

export type CreateSetCurrentElectionAction = (election: Election) => SetCurrentElectionAction;

export const createSetCurrentElectionAction: CreateSetCurrentElectionAction = (election) => ({
  type: SET_CURRENT_ELECTION_ACTION,
  payload: { election }
});

export function isSetCurrentElectionAction(action: Action<string>): action is SetCurrentElectionAction {
  return [SET_CURRENT_ELECTION_ACTION].includes(action.type);
}

// end set current election action

// start set current voter action
export interface SetCurrentVoterAction extends Action<string> {
  payload: { voter: Voter }
}

export type CreateSetCurrentVoterAction = (voter: Voter) => SetCurrentVoterAction;

export const createSetCurrentVoterAction: CreateSetCurrentVoterAction = (voter) => ({
  type: SET_CURRENT_VOTER_ACTION,
  payload: { voter }
});

export function isSetCurrentVoterAction(action: Action<string>): action is SetCurrentVoterAction {
  return [SET_CURRENT_VOTER_ACTION].includes(action.type);
}

// end set current voter action

