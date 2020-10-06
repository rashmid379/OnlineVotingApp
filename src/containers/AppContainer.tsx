import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState, Election, Voter } from "../models/App";
import { MainComponent } from '../components/MainComponent';
import * as AppActions from '../actions/AppActions';
import * as ElectionActions from '../actions/ElectionActions';
import * as CaptureVotesActions from '../actions/CaptureVotesActions';
import * as RegisterVotersActions from "../actions/RegisterVotersActions";
import { TableSorting } from "../components/RegisteredVotersTableComponent";

export function AppContainer() {
  const voters = useSelector<AppState, Voter[]>((state) => state.voters);
  const elections = useSelector<AppState, Election[]>(
    (state) => state.elections
  );
  const expandedElectionId = useSelector<AppState, number>(
    (state) => state.expandedElectionId
  );
  const currentElection = useSelector<AppState, Election>(
    (state) => state.currentElection
  );
  const currentVoter = useSelector<AppState, Voter>(
    (state) => state.currentVoter
  );

  const dispatch = useDispatch();
  const registeredVotersSelectedTab = useSelector<AppState, number>(
    (state) => state.registeredVotersSelectedTab || 0
  );

  const registeredVotersTableSort = useSelector<AppState, TableSorting>(
    (state) =>
      state.registeredVotersTableSort || { order: "desc", orderedBy: "id" }
  );
  const registeredVotersTablePage = useSelector<AppState, number>(
    (state) => state.registeredVotersTablePage || 0
  );
  const registeredVotersRowsPerPage = useSelector<AppState, number>(
    (state) => state.registeredVotersRowsPerPage
  );
  const registeredVotersSelectedVoters = useSelector<AppState, number[]>(
    (state) => state.registeredVotersSelectedVoters
  );
  const registeredVoterBeingEdited = useSelector<AppState, Voter | null>(
    (state) => state.registeredVoterBeingEdited
  );

  const boundActionsMap = bindActionCreators(
    {
      onExpandElectionRow: ElectionActions.createExpandElectionAction,
      onCreateElection: ElectionActions.appendElection,
      onHandleDrodownChange: CaptureVotesActions.createSetCurrentElectionAction,
      onValidateVoter: CaptureVotesActions.createSetCurrentVoterAction,
      onCaptureElectionVotes: CaptureVotesActions.submitElectionVotes,
      onAddCar: AppActions.addVoter,
      onAddVoter: AppActions.addVoter,
      onHandleReturn: CaptureVotesActions.handleReturn,
      onSaveVoter: AppActions.saveVoter,
      registerVotersTabSelected:
        RegisterVotersActions.createRegisterVotersTabSelectedAction,
      registeredVotersDeleteVoters: RegisterVotersActions.deleteVoters,
      registeredVotersSortSelected:
        RegisterVotersActions.createRegisterVotersSortSelectedAction,
      registeredVotersVotersSelected:
        RegisterVotersActions.createRegisterVotersSelectedAction,
      registeredVotersTablePageUpdated:
        RegisterVotersActions.createRegisterVotersTablePageSelectedAction,
      registeredVotersRowsPerPageUpdated:
        RegisterVotersActions.createRegisterVotersTableRowsSelectedAction,
      registeredVotersRowEdited:
        RegisterVotersActions.createRegisterVotersTableEditSelectedAction,
    },
    dispatch
  );

  useEffect(() => {
    dispatch(AppActions.refreshVoters());
    dispatch(ElectionActions.refreshElections());
  }, [dispatch]);

  return (
    <MainComponent
      voters={voters}
      elections={elections}
      expandedElectionId={expandedElectionId}
      currentElection={currentElection}
      currentVoter={currentVoter}
      registeredVotersSelectedTab={registeredVotersSelectedTab || 0}
      registeredVotersTableSort={registeredVotersTableSort}
      registeredVotersTablePage={registeredVotersTablePage}
      registeredVotersRowsPerPage={registeredVotersRowsPerPage}
      registeredVotersSelectedVoters={registeredVotersSelectedVoters}
      registeredVoterBeingEdited={registeredVoterBeingEdited}
      {...boundActionsMap}
    />
  );
}
