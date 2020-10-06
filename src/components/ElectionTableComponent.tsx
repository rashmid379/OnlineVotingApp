import {
  Box,
  Collapse,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import React from 'react';
import { Election } from '../models/App';

export type ElectionTableComponentProps = {
  elections: Election[];
  expandedElectionId: number;
  onExpandElectionRow: (expandedElectionId: number) => void;
};

export function ElectionTableComponent({
  elections,
  expandedElectionId,
  onExpandElectionRow,
}: ElectionTableComponentProps) {
  return (
    <Container maxWidth="md">
      <h2>Current Elections</h2>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {elections?.map(election => (
              <ElectionRow
                key={election.id}
                election={election}
                expandedElectionId={expandedElectionId}
                onExpandElectionRow={onExpandElectionRow}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

type ElectionRowProps = {
  election: Election;
  expandedElectionId: number;
  onExpandElectionRow: (expandedElectionId: number) => void;
};

function ElectionRow({ election, expandedElectionId, onExpandElectionRow }: ElectionRowProps) {
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="medium" onClick={() => onExpandElectionRow(election.id)}>
            {election.id === expandedElectionId ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {election.name}
        </TableCell>
        <TableCell>{election.year}</TableCell>
        <TableCell>{election.description}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={election.id === expandedElectionId} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Results
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {election.questions?.map(question => (
                    <TableRow key={question.id}>
                      <TableCell component="th" scope="row">
                        {question.content}
                      </TableCell>
                      <TableCell>{question.yes}</TableCell>
                      <TableCell>{question.no}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
