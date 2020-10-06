import { TableSorting } from "../components/RegisteredVotersTableComponent";

export type AppState = {
  // the currently "logged in" voter
  // currentVoter?: Voter;
  currentElection: Election;
  currentVoter: Voter;
  voters: Voter[];
  elections: Election[];
  expandedElectionId: number;
  registeredVotersSelectedTab: number | undefined;
  registeredVotersTableSort: TableSorting | undefined;
  registeredVotersTablePage: number | undefined;
  registeredVotersRowsPerPage: number;
  registeredVotersSelectedVoters: number[];
  registeredVoterBeingEdited: Voter | null;
};

export type Voter = {
  // Voter data, login by email address
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  birthDate: string;
  email: string;
  phone: string;
};

// election create does a PUT w/ an election
// object containing all the Questions for this election
export type Election = {
  id: number;
  name: string;
  year: number;
  description: string;
  questions: Question[];
  voterIds: number[];
};

export type ElectionForm = Omit<Election, "id">;

export type Question = {
  id: number;
  content: string;
  yes: number;
  no: number;
};

export type VoterFormData = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state?: string;
  birthDate: string;
  email: string;
  phone: string;
};

export type NewVoter = Omit<Voter, "id">;
