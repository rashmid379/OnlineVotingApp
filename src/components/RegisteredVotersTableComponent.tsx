import { Voter } from "../models/App";
import React from "react";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Voter;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  { id: "lastName", numeric: false, disablePadding: false, label: "Last Name" },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
  { id: "city", numeric: false, disablePadding: false, label: "City" },
  {
    id: "birthDate",
    numeric: false,
    disablePadding: false,
    label: "Birth Date",
  },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Voter
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof Voter) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  deleteClicked: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Registered Voters
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon onClick={props.deleteClicked} />
          </IconButton>
        </Tooltip>
      ) : (
        <div></div>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

export type TableSorting = {
  order: Order;
  orderedBy: keyof Voter;
};

export type RegisteredVotersTableProps = {
  voters: Voter[];
  deleteVoters: (voters: number[]) => void;
  sort: TableSorting;
  sortSelected: (sort: TableSorting) => void;
  selectedVoters: number[];
  votersSelected: (voters: number[]) => void;
  tablePage: number;
  tablePageUpdated: (page: number) => void;
  rowsPerPage: number;
  rowsPerPageUpdated: (rows: number) => void;
  editPressed: (voter: Voter) => void;
};

export function RegisteredVotersTableComponent(
  props: RegisteredVotersTableProps
) {
  const voters = sortedVoters(props.voters);
  const order = props.sort.order;
  const orderBy = props.sort.orderedBy;
  const selectedVoters = props.selectedVoters;
  const rowsPerPage = props.rowsPerPage;
  const classes = useStyles();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Voter
  ) => {
    const isAsc = orderBy === property && order === "asc";
    props.sortSelected({
      orderedBy: property,
      order: isAsc ? "desc" : "asc",
    });
  };

  function sortedVoters(voters: Voter[]) {
    const sortedDescending = props.sort.order === "desc";
    const sortedArray = voters.sort((a: Voter, b: Voter) => {
      let propertyA = a[props.sort.orderedBy as keyof Voter];
      let propertyB = b[props.sort.orderedBy as keyof Voter];

      if (typeof propertyA === "string") {
        propertyA = propertyA.replace("/[^ws]/gi", "").toLowerCase();
      }
      if (typeof propertyB === "string") {
        propertyB = propertyB.replace("/[^ws]/gi", "").toLowerCase();
      }
      var numIfTrue = sortedDescending ? 1 : -1;
      var numIfFalse = sortedDescending ? -1 : 1;

      return propertyA > propertyB ? numIfTrue : numIfFalse;
    });
    return sortedArray;
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = voters.map((n) => n.id);
      props.votersSelected(newSelecteds);
      return;
    }
    props.votersSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selectedVoters.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedVoters, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedVoters.slice(1));
    } else if (selectedIndex === selectedVoters.length - 1) {
      newSelected = newSelected.concat(selectedVoters.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedVoters.slice(0, selectedIndex),
        selectedVoters.slice(selectedIndex + 1)
      );
    }

    props.votersSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    props.tablePageUpdated(newPage);
  };

  const handleEditPressed = (id: number) => {
    const voter = voters.filter((item) => item.id === id)[0];
    props.editPressed(voter);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.rowsPerPageUpdated(parseInt(event.target.value, 10));
    props.tablePageUpdated(0);
  };

  const isSelected = (id: number) => selectedVoters.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, voters.length - props.tablePage * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selectedVoters.length}
          deleteClicked={() => props.deleteVoters(selectedVoters)}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selectedVoters.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={voters.length}
            />
            <TableBody>
              {voters
                .slice(
                  props.tablePage * rowsPerPage,
                  props.tablePage * rowsPerPage + rowsPerPage
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.firstName}
                      </TableCell>
                      <TableCell align="left">{row.lastName}</TableCell>
                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">{row.city}</TableCell>
                      <TableCell align="left">{row.birthDate}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => {
                            handleEditPressed(row.id);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={voters.length}
          rowsPerPage={rowsPerPage}
          page={props.tablePage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
