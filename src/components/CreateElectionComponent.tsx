import {
  Button,
  Container,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  TextField,
  Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Delete } from '@material-ui/icons';
import React, { ChangeEvent, useState } from 'react';
import { ElectionForm } from '../models/App';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

export type CreateElectionComponentProps = {
  onCreateElection: (electionForm: ElectionForm) => void;
};

export function CreateElectionComponent({ onCreateElection }: CreateElectionComponentProps) {
  const classes = useStyles();

  const initialQuestion = {
    id: 0,
    content: '',
    yes: 0,
    no: 0,
  };

  const initialElection = {
    name: '',
    year: 2020,
    description: '',
    questions: [
      {
        ...initialQuestion,
      },
    ],
    voterIds: [],
  };

  const [electionForm, setElectionForm] = useState<ElectionForm>({
    ...initialElection,
  });

  const changeElectionInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setElectionForm({
      ...electionForm,
      [e.target.name]: e.target.type === 'number' ? e.target.valueAsNumber : e.target.value,
    });
  };

  const changeElectionQuestions = (id: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      // update the particular question
      const newElectionForm = {
        ...electionForm,
      };
      const updatedQuestion = newElectionForm.questions.find(q => q.id === id);
      if (updatedQuestion !== undefined) {
        updatedQuestion.content = e.target.value;
      }

      setElectionForm(newElectionForm);
    };
  };

  const addElectionQuestion = () => {
    setElectionForm({
      ...electionForm,
      // new blank question
      questions: electionForm.questions.concat({
        ...initialQuestion,
        id: Math.max(...electionForm.questions.map(q => q.id), 0) + 1,
      }),
    });
  };

  const removeElectionQuestion = (id: number) => {
    return () => {
      setElectionForm({
        ...electionForm,
        questions: electionForm.questions.filter(q => q.id !== id),
      });
    };
  };

  const createElection = () => {
    onCreateElection(electionForm);
    setElectionForm({
      ...initialElection,
    });
  };

  return (
    <Container maxWidth="md">
      <h2>Create an Election</h2>
      <h3>Election Info</h3>
      <TextField
        name="name"
        label="Name"
        fullWidth
        color="primary"
        onChange={changeElectionInfo}
        value={electionForm.name}
      />
      <TextField
        name="year"
        label="Year"
        fullWidth
        color="primary"
        type="number"
        onChange={changeElectionInfo}
        value={electionForm.year}
      />
      <TextField
        name="description"
        label="Description"
        fullWidth
        color="primary"
        onChange={changeElectionInfo}
        value={electionForm.description}
      />
      <h3>Questions</h3>
      <List>
        {electionForm.questions.map(q => (
          <ListItem key={q.id}>
            <TextField
              label="Question"
              fullWidth
              color="primary"
              value={q.content}
              onChange={changeElectionQuestions(q.id)}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={removeElectionQuestion(q.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <div className={classes.root}>
        <Button variant="contained" color="secondary" startIcon={<Add />} onClick={addElectionQuestion}>
          Add Question
        </Button>
        <Button variant="contained" color="primary" onClick={createElection}>
          Create Election
        </Button>
      </div>
    </Container>
  );
}
