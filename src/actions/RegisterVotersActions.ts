import { Action, Dispatch } from "redux";
import { TableSorting } from "../components/RegisteredVotersTableComponent";
import { Voter } from "../models/App";
import { refreshVoters } from "./AppActions";

//Tab Selection
export const REGISTER_VOTERS_TAB_SELECTED_ACTION =
  "REGISTER_VOTERS_TAB_SELECTED";
export interface RegisterVotersTabSelectedAction extends Action<string> {
  payload: {
    tabSelected: number;
  };
}
export type CreateRegisterVotersTabSelectedAction = (
  tabSelected: number
) => RegisterVotersTabSelectedAction;

export const createRegisterVotersTabSelectedAction: CreateRegisterVotersTabSelectedAction = (
  tabSelected: number
) => ({
  type: REGISTER_VOTERS_TAB_SELECTED_ACTION,
  payload: {
    tabSelected,
  },
});

export function isCreateRegisterVotersTabSelectedAction(
  action: Action<string>
): action is RegisterVotersTabSelectedAction {
  return [REGISTER_VOTERS_TAB_SELECTED_ACTION].includes(action.type);
}

//Voter Deletion
export const DELETE_VOTERS_ACTION = "DELETE_VOTERS";
export interface DeleteVotersAction extends Action<string> {
  payload: {
    votersToDelete: number[];
  };
}
export type CreateDeleteVotersAction = (
  votersToDelete: number[]
) => DeleteVotersAction;

export const createDeleteVotersAction: CreateDeleteVotersAction = (
  votersToDelete: number[]
) => ({
  type: DELETE_VOTERS_ACTION,
  payload: {
    votersToDelete,
  },
});

export function isDeleteVotersAction(
  action: Action<string>
): action is DeleteVotersAction {
  return [DELETE_VOTERS_ACTION].includes(action.type);
}

export const deleteVoters = (votersToDelete: number[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(createDeleteVotersAction(votersToDelete));
    console.log("deleting");

    let promises = votersToDelete.map((voter) => {
      return fetch(`http://localhost:3060/voters/${voter}`, {
        method: "DELETE",
      });
    });

    await Promise.all(promises).then(() => {
      refreshVoters()(dispatch);
    });
  };
};

// Sort Table
export const REGISTER_VOTERS_SORT_SELECTED_ACTION =
  "REGISTER_VOTERS_SORT_SELECTED";
export interface RegisterVotersSortSelectedAction extends Action<string> {
  payload: {
    sort: TableSorting;
  };
}
export type CreateRegisterVotersSortSelectedAction = (
  sort: TableSorting
) => RegisterVotersSortSelectedAction;

export const createRegisterVotersSortSelectedAction: CreateRegisterVotersSortSelectedAction = (
  sort: TableSorting
) => ({
  type: REGISTER_VOTERS_SORT_SELECTED_ACTION,
  payload: {
    sort,
  },
});

export function isRegisterVotersSortSelectedAction(
  action: Action<string>
): action is RegisterVotersSortSelectedAction {
  return [REGISTER_VOTERS_SORT_SELECTED_ACTION].includes(action.type);
}

//   votersSelected: (voters: number[]) => void;
export const REGISTER_VOTERS_SELECTED_ACTION =
  "REGISTER_VOTERS_SELECTED_ACTION";
export interface RegisterVotersSelectedAction extends Action<string> {
  payload: {
    voters: number[];
  };
}
export type CreateRegisterVotersSelectedAction = (
  voters: number[]
) => RegisterVotersSelectedAction;

export const createRegisterVotersSelectedAction: CreateRegisterVotersSelectedAction = (
  voters: number[]
) => ({
  type: REGISTER_VOTERS_SELECTED_ACTION,
  payload: {
    voters,
  },
});

export function isRegisterVotersSelectedAction(
  action: Action<string>
): action is RegisterVotersSelectedAction {
  return [REGISTER_VOTERS_SELECTED_ACTION].includes(action.type);
}

//   tablePageUpdated: (page: number) => void;
export const REGISTER_VOTERS_TABLE_PAGE_SELECTED_ACTION =
  "REGISTER_VOTERS_TABLE_PAGE_SELECTED";
export interface RegisterVotersTablePageSelectedAction extends Action<string> {
  payload: {
    page: number;
  };
}
export type CreateRegisterVotersTablePageSelectedAction = (
  page: number
) => RegisterVotersTablePageSelectedAction;

export const createRegisterVotersTablePageSelectedAction: CreateRegisterVotersTablePageSelectedAction = (
  page: number
) => ({
  type: REGISTER_VOTERS_TABLE_PAGE_SELECTED_ACTION,
  payload: {
    page,
  },
});

export function isRegisterVotersTablePageSelectedAction(
  action: Action<string>
): action is RegisterVotersTablePageSelectedAction {
  return [REGISTER_VOTERS_TABLE_PAGE_SELECTED_ACTION].includes(action.type);
}

//   rowsPerPageUpdated: (rows: number) => void;
export const REGISTER_VOTERS_TABLE_ROWS_SELECTED_ACTION =
  "REGISTER_VOTERS_TABLE_ROWS_SELECTED";
export interface RegisterVotersTableRowsSelectedAction extends Action<string> {
  payload: {
    rows: number;
  };
}
export type CreateRegisterVotersTableRowsSelectedAction = (
  rows: number
) => RegisterVotersTableRowsSelectedAction;

export const createRegisterVotersTableRowsSelectedAction: CreateRegisterVotersTableRowsSelectedAction = (
  rows: number
) => ({
  type: REGISTER_VOTERS_TABLE_ROWS_SELECTED_ACTION,
  payload: {
    rows,
  },
});

export function isRegisterVotersTableRowsSelectedAction(
  action: Action<string>
): action is RegisterVotersTableRowsSelectedAction {
  return [REGISTER_VOTERS_TABLE_ROWS_SELECTED_ACTION].includes(action.type);
}

export const REGISTER_VOTERS_EDIT_SELECTED_ACTION =
  "REGISTER_VOTERS_EDIT_SELECTED";
export interface RegisterVotersTableEditSelectedAction extends Action<string> {
  payload: {
    voter: Voter;
  };
}
export type CreateRegisterVotersTableEditSelectedAction = (
  voter: Voter
) => RegisterVotersTableEditSelectedAction;

export const createRegisterVotersTableEditSelectedAction: CreateRegisterVotersTableEditSelectedAction = (
  voter: Voter
) => ({
  type: REGISTER_VOTERS_EDIT_SELECTED_ACTION,
  payload: {
    voter,
  },
});

export function isRegisterVotersTableEditSelectedAction(
  action: Action<string>
): action is RegisterVotersTableEditSelectedAction {
  return [REGISTER_VOTERS_EDIT_SELECTED_ACTION].includes(action.type);
}
