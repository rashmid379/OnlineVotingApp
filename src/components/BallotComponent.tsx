import React, { useState } from "react";
import { Election, Voter, Question } from '../models/App';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export type BallotComponentProps = {
  currentVoter: Voter,
  currentElection: Election,
  elections: Election[],
  onCaptureElectionVotes: (election: Election ) => void;
  onHandleReturn: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export function BallotComponent(props:BallotComponentProps ) {
  const classes = useStyles();
  const [checked, setChecked] = useState([] as Question[]);

  const handleQuestionCheckToggle = (question: Question) => () => {
    const currentIndex = checked.indexOf(question);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(question);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const castVote = () => {
    checked.map(item => item.yes = item.yes + 1);
    const replaceElection = {...props.currentElection};
    replaceElection.voterIds.push(props.currentVoter.id);
    props.onCaptureElectionVotes(replaceElection);
  }

  const currentElectionVoteIds = props.currentElection.voterIds;
  const hasCurrentUserVoted = currentElectionVoteIds ? currentElectionVoteIds.includes(props.currentVoter.id) : false;
  // console.log('hasCurrentUserVoted', hasCurrentUserVoted);
  return (
    !hasCurrentUserVoted ?
      <section>
        <h2 className="section-title">Welcome {props.currentVoter.firstName} {props.currentVoter.lastName}! to {props.currentElection.name}</h2>
        <h3 className="section-title">Lets Capture Votes !</h3>

        <List dense className={classes.root}>
          {props.currentElection.questions && props.currentElection.questions.concat().map((question, index ) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
              <ListItem key={index} button>
                <ListItemText id={labelId} primary={`${index + 1}.  ${question.content}`} />
                <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleQuestionCheckToggle(question)}
                  checked={checked.indexOf(question) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <Button variant="contained" color="primary" onClick={() => castVote()}>Cast Vote</Button>
      </section> :
      <section>
        <h1>You have successfully submitted your vote !</h1>
        <Button variant="contained" color="primary" onClick={() => props.onHandleReturn()}>Return to Main Page</Button>
      </section>
  )
}
