import React from "react";
import { InputAdornment, InputBase, makeStyles } from "@material-ui/core";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  scoutibleTextField: {
    background: "rgba(255,255,255,0.4)",
    height: 52,
    width: "100%",
    borderRadius: 16,
    cursor: "text",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div": {
      width: "100%",
      height: "inherit",
      borderRadius: 16,
      padding: "7px 16px",

      "&>input": {
        fontSize: 18,
        width: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        "&::placeholder": {
          color: "#000000",
          opacity: 1,
          fontSize: 18,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          width: "100%",
        },
      },
    },
    "&>.Mui-focused": {
      borderRadius: 16,
    },
  },
  scoutibleDisabledInputBase: {
    "&>div>input": {
      color: "#808080",
    },
    "&>div>input::placeholder": {
      color: "#808080",
      opacity: 1,
    },
  },
  scoutibleTextareaField: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    cursor: "text",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 100,
    width: "100%",
    "&>div": {
      width: "100%",
      height: "inherit",
      maxHeight: "inherit",
      border: "2px solid #F5F5F5",
      padding: "15.5px 16px",
      borderRadius: 16,
      "&>textarea": {
        fontSize: 16,
        lineHeight: "16px",
        width: "100%",
        padding: 0,
        maxHeight: 65,
        overflow: "auto !important",
        "&::placeholder": {
          color: "red",
          opacity: 1,
          fontSize: 18,
          width: "100%",
        },
      },
    },
    "&>.Mui-focused": {
      borderRadius: 16,
      border: "2px solid #6D30EF",
    },
  },
  scoutibleEndIcon: {
    marginTop: "auto",
    height: "100%",
  },
}));

export default function TextField({
  startIcon,
  endIcon,
  multiline = false,
  disabled = false,
  className,
  ...other
}) {
  const classes = useStyles();
  return (
    <div
      className={classnames(
        multiline === false
          ? classes.scoutibleTextField
          : classes.scoutibleTextareaField,
        disabled && classes.scoutibleDisabledInputBase,
        className
      )}
    >
      <InputBase
        multiline={multiline}
        disabled={disabled}
        inputProps={{
          "aria-label": "naked",
        }}
        startAdornment={
          startIcon && (
            <InputAdornment className={classes.scoutibleIcon} position="start">
              {startIcon}
            </InputAdornment>
          )
        }
        endAdornment={
          endIcon && (
            <InputAdornment className={classes.scoutibleEndIcon} position="end">
              {endIcon}
            </InputAdornment>
          )
        }
        {...other}
      />
    </div>
  );
}
