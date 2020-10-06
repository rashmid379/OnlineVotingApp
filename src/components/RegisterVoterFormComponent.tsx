import React from "react";
import {
  Button,
  Container,
  createStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "../hooks/useForm";
import { Voter } from "../models/App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

export type VoterFormProps = {
  buttonText: string;
  onSubmitVoter: (voterForm: Voter) => void;
  onSaveVoter: (voterForm: Voter) => void;
  voterBeingEdited: Voter | null;
};

const setupSubmitVoter = (
  props: VoterFormProps,
  voterForm: any,
  resetVoterForm: () => void
) => {
  return () => {
    if (props.voterBeingEdited) {
      props.onSaveVoter({ ...voterForm });
    } else {
      props.onSubmitVoter({
        ...voterForm,
      });
    }

    resetVoterForm();
  };
};

export function RegisterVoterFormComponent(props: VoterFormProps) {
  const classes = useStyles();
  const [voterForm, change, resetVoterForm] = useForm({
    id: props?.voterBeingEdited?.id || "",
    firstName: props?.voterBeingEdited?.firstName || "",
    lastName: props?.voterBeingEdited?.lastName || "",
    address: props?.voterBeingEdited?.address || "",
    city: props?.voterBeingEdited?.city || "",
    birthDate: props?.voterBeingEdited?.birthDate || "",
    email: props?.voterBeingEdited?.email || "",
    phone: props?.voterBeingEdited?.phone || "",
  });

  return (
    <Container maxWidth="md">
      <form>
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          color="primary"
          onChange={change}
          value={voterForm.firstName}
        />
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          color="primary"
          onChange={change}
          value={voterForm.lastName}
        />
        <TextField
          name="address"
          label="Address"
          fullWidth
          color="primary"
          onChange={change}
          value={voterForm.address}
        />
        <TextField
          name="city"
          label="City"
          fullWidth
          color="primary"
          onChange={change}
          value={voterForm.city}
        />
        <TextField
          name="birthDate"
          label="DOB"
          fullWidth
          color="primary"
          onChange={change}
          value={voterForm.birthDate}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          color="primary"
          onChange={change}
          value={voterForm.email}
        />
        <TextField
          name="phone"
          label="Phone"
          fullWidth
          color="primary"
          onChange={change}
          value={voterForm.phone}
        />
        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            onClick={setupSubmitVoter(props, voterForm, resetVoterForm)}
          >
            {props.voterBeingEdited ? "Save" : props.buttonText}
          </Button>
        </div>
      </form>
    </Container>
  );
}
