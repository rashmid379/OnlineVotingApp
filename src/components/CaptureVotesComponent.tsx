import React, { useState, ChangeEvent} from "react";
import { Election, Voter } from '../models/App';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { BallotComponent }from './BallotComponent';
import '../styles/layout.css';

export type CaptureVotesComponentProps = {
  voters: Voter[],
  elections: Election[],
  currentElection: Election,
  currentVoter: Voter,
  onCaptureElectionVotes: (election: Election ) => void,
  onHandleDrodownChange: (election: Election ) => void,
  onValidateVoter: (voter: Voter ) => void,
  onHandleReturn: () => void,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export function CaptureVotesComponent(props:CaptureVotesComponentProps ) {

 // console.log('elections', props.elections);
  const classes = useStyles();
  const [ inputEmail, setInputEmail ] = useState('');
  const [ hasVoted, setHasVoted ] = useState(true);

  // const currentElectionVoteIds = props.currentElection.voterIds;
  // const hasCurrentUserVoted = currentElectionVoteIds ? currentElectionVoteIds.includes(props.currentVoter.id) : false;

  const handleDrodownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.onHandleDrodownChange(props.elections.filter(election => election.name === event.target.value)[0]);
  }
  // console.log('hasCurrentUserVoted', hasCurrentUserVoted);

  const isValidVoter = props.currentVoter && !(Object.keys(props.currentVoter).length === 0);
  const isCurrentElection = props.currentElection && !(Object.keys(props.currentElection).length === 0);
  let invalidVoterErrorMessage = 'Invalid Voter';

  type HTMLFormControls =
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  const change = (e: ChangeEvent<HTMLFormControls>) => {
    setInputEmail(e.target.value);
    validateVoterEmail(e.target.value);
  };

  const validateVoterEmail = (inputEmail: string) => {
    const voters = props.voters.filter(voter => voter.email === inputEmail);
    if(voters.length > 0) {
      props.onValidateVoter(voters[0]);
    }
  }

  const validateVoted = () => {
    if(props.currentElection.voterIds.includes(props.currentVoter.id)){
      props.onValidateVoter({} as Voter);
      setHasVoted(true);
      setInputEmail('');
    }else {
      setHasVoted(false);
    }
  }

  return (
    <div className="container">
      <header id="page-header">
        <h1>Capture Votes</h1>
      </header>
      <main id="content">
        <section>
          <h2 className="section-title">Select a Ballot</h2>
          <Select
              labelId="election-list-select-label"
              id="select-election"
              value={isCurrentElection ? props.currentElection.name : ""}
              onChange={handleDrodownChange}
              className={classes.selectEmpty}
              fullWidth
            >
            <MenuItem value=""><em>None</em></MenuItem>
            {props.elections.map(election => <MenuItem key={election.id} value={election.name}>{election.name}</MenuItem>)}
          </Select>
        </section>
        <section>
          {isCurrentElection &&
              <TextField id="email-input" label="email address" value={inputEmail} onChange={change} fullWidth />
          }
          {isCurrentElection && inputEmail && !isValidVoter && <p>{invalidVoterErrorMessage}</p>}
          {isValidVoter &&
              <Button style={{ marginTop: 10 }} variant="contained" color="primary" onClick={() => validateVoted()} fullWidth>Begin Voting</Button>
          }
        </section>
      </main>
      <aside id="sidebar">
        {
          (isValidVoter && !hasVoted ) &&
            <BallotComponent
              onCaptureElectionVotes={props.onCaptureElectionVotes}
              onHandleReturn={props.onHandleReturn}
              elections={props.elections}
              currentElection={props.currentElection}
              currentVoter={props.currentVoter}
          />
        }
      </aside>
    </div>
  )
}
