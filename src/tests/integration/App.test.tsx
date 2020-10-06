import React from "react";
import { render } from "@testing-library/react";
import App from "../../App";

test("when App is first viewed, toolbar is rendered", () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Majority Wins/);
  expect(headerElement).toBeInTheDocument();

  const registerVotersLink = getByText(/Register Voters/);
  expect(registerVotersLink).toBeInTheDocument();

  const captureVotesLink = getByText(/Capture Votes/);
  expect(captureVotesLink).toBeInTheDocument();

  const electionCreationLink = getByText(/Election Creation/);
  expect(electionCreationLink).toBeInTheDocument();
});
