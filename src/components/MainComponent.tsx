import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Election, ElectionForm, Voter } from '../models/App';
import { CaptureVotesComponent } from './CaptureVotesComponent';
import { CreateElectionComponent } from './CreateElectionComponent';
import { ElectionTableComponent } from './ElectionTableComponent';
import { HomeComponent } from './HomeComponent';
import NavBar from './NavBar';
import { TableSorting } from './RegisteredVotersTableComponent';
import { RegisterVotersComponent } from './RegisterVotersComponent';

export type MainComponentProps = {
  voters: Voter[];
  elections: Election[];

  currentElection: Election;
  currentVoter: Voter;
  onHandleDrodownChange: (electionForm: Election) => void;
  onCaptureElectionVotes: (election: Election) => void;
  onValidateVoter: (voter: Voter) => void;
  onHandleReturn: () => void;
  expandedElectionId: number;
  onExpandElectionRow: (expandedElectionId: number) => void;
  onCreateElection: (electionForm: ElectionForm) => void;
  registeredVotersTableSort: TableSorting;
  registeredVotersTablePage: number;
  registeredVotersRowsPerPage: number;
  registeredVotersSelectedVoters: number[];
  registeredVotersSelectedTab: number;
  registeredVoterBeingEdited: Voter | null;
  registerVotersTabSelected: (tabSelected: number) => void;
  registeredVotersDeleteVoters: (voters: number[]) => void;
  registeredVotersSortSelected: (sort: TableSorting) => void;
  registeredVotersVotersSelected: (voters: number[]) => void;
  registeredVotersTablePageUpdated: (page: number) => void;
  registeredVotersRowsPerPageUpdated: (rows: number) => void;
  registeredVotersRowEdited: (voter: Voter) => void;
  onAddVoter: (voter: Voter) => void;
  onSaveVoter: (voter: Voter) => void;
};

export function MainComponent(props: MainComponentProps) {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/voters">
          <NavBar />
          <RegisterVotersComponent
            voters={props.voters}
            registeredVotersRowsPerPage={props.registeredVotersRowsPerPage}
            registeredVotersSelectedVoters={props.registeredVotersSelectedVoters}
            registeredVotersTablePage={props.registeredVotersTablePage}
            registeredVotersTableSort={props.registeredVotersTableSort}
            registeredVotersTabSelected={props.registerVotersTabSelected}
            registeredVotersSelectedTab={props.registeredVotersSelectedTab}
            registeredVotersDeleteVoters={props.registeredVotersDeleteVoters}
            registeredVotersSortSelected={props.registeredVotersSortSelected}
            registeredVotersSelected={props.registeredVotersVotersSelected}
            registeredVotersTablePageUpdated={props.registeredVotersTablePageUpdated}
            registeredVotersRowsPerPageUpdated={props.registeredVotersRowsPerPageUpdated}
            registeredVotersRowEdited={props.registeredVotersRowEdited}
            onAddVoter={props.onAddVoter}
            onSaveVoter={props.onSaveVoter}
            registeredVoterBeingEdited={props.registeredVoterBeingEdited}
          />
        </Route>
        <Route path="/capturevotes">
          <NavBar />
          <CaptureVotesComponent
            currentElection={props.currentElection}
            currentVoter={props.currentVoter}
            onCaptureElectionVotes={props.onCaptureElectionVotes}
            onHandleDrodownChange={props.onHandleDrodownChange}
            onValidateVoter={props.onValidateVoter}
            onHandleReturn={props.onHandleReturn}
            elections={props.elections}
            voters={props.voters}
          />
        </Route>
        <Route path="/elections">
          <NavBar />
          <Container maxWidth="md">
            <ElectionTableComponent
              elections={props.elections}
              expandedElectionId={props.expandedElectionId}
              onExpandElectionRow={props.onExpandElectionRow}
            />
          </Container>
          <Container maxWidth="md">
            <CreateElectionComponent onCreateElection={props.onCreateElection} />
          </Container>
        </Route>
        <Route path="/">
          <Container maxWidth="md">
            <HomeComponent />
          </Container>
        </Route>
      </Switch>
    </Router>
  );
}
