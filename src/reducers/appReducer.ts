import { isSetCurrentElectionAction, isSetCurrentVoterAction } from '../actions/CaptureVotesActions';
import { Reducer, combineReducers } from "redux";
import { Voter, AppState, Election } from "../models/App";
import { AppActions } from "../actions/AppActions";
import {
  isCreateRegisterVotersTabSelectedAction,
  isDeleteVotersAction,
  isRegisterVotersSelectedAction,
  isRegisterVotersSortSelectedAction,
  isRegisterVotersTableEditSelectedAction,
  isRegisterVotersTablePageSelectedAction,
  isRegisterVotersTableRowsSelectedAction,
} from "../actions/RegisterVotersActions";
import { isRefreshVotersDoneAction } from "../actions/AppActions";
import {
  isAppendElectionAction,
  isExpandElectionAction,
  isRefreshElectionsDoneAction,
} from "../actions/ElectionActions";
import { TableSorting } from "../components/RegisteredVotersTableComponent";

export const voterReducer: Reducer<Voter[], AppActions> = (
  voters = [],
  action
) => {
  if (isRefreshVotersDoneAction(action)) {
    return action.payload.voters;
  }

  return voters;
};

export const electionReducer: Reducer<Election[], AppActions> = (
  elections = [],
  action
) => {
  if (isAppendElectionAction(action)) {
    return elections.concat(action.payload.election);
  }
  if (isRefreshElectionsDoneAction(action)) {
    return action.payload.elections;
  }

  return elections;
};

export const registeredVotersTabReducer: Reducer<
  number | undefined,
  AppActions
> = (tabSelected = 0, action) => {
  if (isCreateRegisterVotersTabSelectedAction(action)) {
    return action.payload.tabSelected;
  }

  if (isRegisterVotersTableEditSelectedAction(action)) {
    return 0;
  }

  if (isRefreshVotersDoneAction(action)) {
    return 1;
  }

  return tabSelected;
};


export const expandedElectionIdReducer: Reducer<number, AppActions> = (
  expandedElectionId = 0,
  action
) => {
  if (isExpandElectionAction(action)) {
    // if you select the row that is expanded, collapse it
    if (expandedElectionId === action.payload.expandedElectionId) {
      return -1;
    }
    // standard expand
    else {
      return action.payload.expandedElectionId;
    }
  }

  return expandedElectionId;
};

export const registeredVotersTableSortReducer: Reducer<
  TableSorting | undefined,
  AppActions
> = (sorting = { order: "desc", orderedBy: "id" }, action) => {
  if (isRegisterVotersSortSelectedAction(action)) {
    return action.payload.sort;
  }

  return sorting;
};

export const registeredVotersTablePageReducer: Reducer<
  number | undefined,
  AppActions
> = (sorting = 0, action) => {
  if (isRegisterVotersTablePageSelectedAction(action)) {
    return action.payload.page;
  }

  return sorting;
};

export const registeredVotersRowsPerPageReducer: Reducer<number, AppActions> = (
  rowsPerPage = 5,
  action
) => {
  if (isRegisterVotersTableRowsSelectedAction(action)) {
    return action.payload.rows;
  }

  return rowsPerPage;
};

export const registeredVotersSelectedReducer: Reducer<number[], AppActions> = (
  selectedVoters = [],
  action
) => {
  if (isRegisterVotersSelectedAction(action)) {
    return action.payload.voters;
  }

  if (isDeleteVotersAction(action)) {
    return [];
  }

  return selectedVoters;
};

export const registeredVoterBeingEditedReducer: Reducer<
  Voter | null,
  AppActions
> = (userBeingEdited, action) => {
  if (isRegisterVotersTableEditSelectedAction(action)) {
    return action.payload.voter;
  }

  if (isRefreshVotersDoneAction(action)) {
    return null;
  }

  if (isCreateRegisterVotersTabSelectedAction(action)) {
    if (action.payload.tabSelected === 1) {
      return null;
    }
  }

  return userBeingEdited || null;
};


export const setCurrentElectionReducer: Reducer<Election, AppActions> = (election = {} as Election, action) => {
  if (isSetCurrentElectionAction(action)) {
    return action.payload.election;
  }

  return election;
};

export const setCurrentVoterReducer: Reducer<Voter, AppActions> = (voter = {} as Voter, action) => {
  if (isSetCurrentVoterAction(action)) {
    return action.payload.voter;
  }

  return voter;
};

export const appReducer: Reducer<AppState, AppActions> = combineReducers({
  voters: voterReducer,
  elections: electionReducer,
  registeredVotersSelectedTab: registeredVotersTabReducer,
  expandedElectionId: expandedElectionIdReducer,
  currentElection: setCurrentElectionReducer,
  currentVoter: setCurrentVoterReducer,
  registeredVotersTableSort: registeredVotersTableSortReducer,
  registeredVotersTablePage: registeredVotersTablePageReducer,
  registeredVotersRowsPerPage: registeredVotersRowsPerPageReducer,
  registeredVotersSelectedVoters: registeredVotersSelectedReducer,
  registeredVoterBeingEdited: registeredVoterBeingEditedReducer,
});
