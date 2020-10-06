import { Action, Dispatch } from "redux";
import { Election, Voter } from "../models/App";

//
// start Voter actions
//

export const REFRESH_VOTERS_REQUEST_ACTION = "REFRESH_VOTERS_REQUEST";
export const REFRESH_VOTERS_DONE_ACTION = "REFRESH_VOTERS_DONE";
export const ADD_VOTERS_REQUEST_ACTION = "ADD_VOTERS_REQUEST";
export const SAVE_VOTER_REQUEST_ACTION = "SAVE_VOTER_REQUEST";

export type RefreshVotersRequestAction = Action<string>;
export interface RefreshVotersDoneAction extends Action<string> {
  payload: {
    voters: Voter[];
  };
}
export type AddVotersRequestAction = Action<string>;
export type SaveVoterRequestAction = Action<string>;

export type CreateRefreshVotersRequestAction = () => RefreshVotersRequestAction;
export type CreateRefreshVotersDoneAction = (
  voters: Voter[]
) => RefreshVotersDoneAction;

export type CreateAddVotersRequestAction = (
  voter: Voter
) => AddVotersRequestAction;
export const createAddVotersRequestAction: CreateAddVotersRequestAction = (
  voter
) => ({
  type: ADD_VOTERS_REQUEST_ACTION,
  payload: {
    voter,
  },
});

export type CreateSaveVoterRequestAction = (
  voter: Voter
) => SaveVoterRequestAction;
export const createSaveVoterRequestAction: CreateSaveVoterRequestAction = (
  voter
) => ({
  type: ADD_VOTERS_REQUEST_ACTION,
  payload: {
    voter,
  },
});

export const createRefreshVotersRequestAction: CreateRefreshVotersRequestAction = () => ({
  type: REFRESH_VOTERS_REQUEST_ACTION,
});

export const createRefreshVotersDoneAction: CreateRefreshVotersDoneAction = (
  voters: Voter[]
) => ({
  type: REFRESH_VOTERS_DONE_ACTION,
  payload: {
    voters,
  },
});

export function isRefreshVotersRequestAction(
  action: Action<string>
): action is RefreshVotersRequestAction {
  return [REFRESH_VOTERS_REQUEST_ACTION].includes(action.type);
}

export function isRefreshVotersDoneAction(
  action: Action<string>
): action is RefreshVotersDoneAction {
  return [REFRESH_VOTERS_DONE_ACTION].includes(action.type);
}

export const refreshVoters = () => {
  return async (dispatch: Dispatch) => {
    dispatch(createRefreshVotersRequestAction());
    const res = await fetch("http://localhost:3060/voters");
    const voters = await res.json();
    dispatch(createRefreshVotersDoneAction(voters));
  };
};

//
// end Voter actions
// start Election actions
//

export const REFRESH_ELECTIONS_REQUEST_ACTION = "REFRESH_ELECTIONS_REQUEST";
export const REFRESH_ELECTIONS_DONE_ACTION = "REFRESH_ELECTIONS_DONE";

export type RefreshElectionsRequestAction = Action<string>;
export interface RefreshElectionsDoneAction extends Action<string> {
  payload: {
    elections: Election[];
  };
}

export type CreateRefreshElectionsRequestAction = () => RefreshElectionsRequestAction;
export type CreateRefreshElectionsDoneAction = (
  election: Election[]
) => RefreshElectionsDoneAction;

export const createRefreshElectionsRequestAction: CreateRefreshElectionsRequestAction = () => ({
  type: REFRESH_ELECTIONS_REQUEST_ACTION,
});

export const createRefreshElectionsDoneAction: CreateRefreshElectionsDoneAction = (
  elections: Election[]
) => ({
  type: REFRESH_ELECTIONS_DONE_ACTION,
  payload: {
    elections,
  },
});

export function isRefreshElectionsRequestAction(
  action: Action<string>
): action is RefreshElectionsRequestAction {
  return [REFRESH_ELECTIONS_REQUEST_ACTION].includes(action.type);
}

export function isRefreshElectionsDoneAction(
  action: Action<string>
): action is RefreshElectionsDoneAction {
  return [REFRESH_ELECTIONS_DONE_ACTION].includes(action.type);
}

export const refreshElections = () => {
  return async (dispatch: Dispatch) => {
    dispatch(createRefreshElectionsRequestAction());
    const res = await fetch("http://localhost:3060/elections");
    const elections = await res.json();
    dispatch(createRefreshElectionsDoneAction(elections));
  };
};

//
// end Election actions
//

// type to encapsulate all the actions we are offering
export type AppActions =
  | RefreshVotersRequestAction
  | RefreshElectionsDoneAction
  | RefreshElectionsRequestAction
  | RefreshElectionsDoneAction
  | RefreshVotersRequestAction
  | RefreshVotersDoneAction;

export const addVoter = (voter: Voter) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAddVotersRequestAction(voter));
    await fetch("http://localhost:3060/voters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voter),
    });
    dispatch(createRefreshVotersRequestAction());
  };
};

export const saveVoter = (voter: Voter) => {
  return async (dispatch: Dispatch) => {
    dispatch(createSaveVoterRequestAction(voter));
    await fetch(`http://localhost:3060/voters/${voter.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voter),
    });
    refreshVoters()(dispatch);
  };
};
