import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskService } from "../services/TaskService";
import * as Constants from "../utils/Constants";

export default function Task(props) {
  const { id } = useParams();
  const [task, setTask] = useState({});

  const getTask = async () => {
    if (id === Constants.INVALID_TASK_ID) {
      setTodaysDate();
      return;
    }
    const response = await TaskService.getById(id);
    response.date =
      response.date.split("/")[2] +
      "-" +
      response.date.split("/")[1] +
      "-" +
      response.date.split("/")[0];
    setTask(response);
  };

  // function to set the date to today's date when creating a new task
  const setTodaysDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    setTask({
      title: "",
      time: "",
      date: yyyy + "-" + mm + "-" + dd,
      id_redmine: "",
    });
  };

  useEffect(() => {
    getTask();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setTask({
      ...task,
      [event.target.name]: value,
    });
  };

  const formatDate = (date) => {
    if (date) {
      date = date.split("-");
      date = date[2] + "/" + date[1] + "/" + date[0];
      return date;
    }
  };

  return (
    <div>
      <div align="center" style={{
        marginTop: "35px",
      }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="outlined-helperText"
              label={Constants.TITLE_LABEL}
              value={task.title || ""}
              name="title"
              onChange={handleChange}
              helperText={Constants.TITLE_LABEL_PLACEHOLDER}
              style={{ width: "25%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-helperText"
              type={"time"}
              value={task.time || ""}
              name="time"
              onChange={handleChange}
              helperText={Constants.TIME_LABEL_PLACEHOLDER}
              style={{ width: "25%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-helperText"
              type={"date"}
              format={"dd/MM/yyyy"}
              value={task.date || ""}
              name="date"
              onChange={handleChange}
              helperText={Constants.DATE_LABEL_PLACEHOLDER}
              style={{ width: "25%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-helperText"
              label={Constants.REDMINE_LABEL}
              type={"number"}
              value={task.id_redmine || ""}
              name="id_redmine"
              onChange={handleChange}
              helperText={Constants.ID_REDMINE_LABEL_PLACEHOLDER}
              style={{ width: "25%" }}
            />
          </Grid>
        </Grid>
      </div>
      <Button
        style={{
          marginTop: "20px",
          margin: "200 20",
          padding: "10",
          // centraliza o botão
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "20%",
        }}
        variant="outlined"
        color="success"
        onClick={() => {
          // check if all fields are filled
          if (task.title && task.time && task.date && task.id_redmine) {
            task.date = formatDate(task.date);
            if (id === "-1") {
              TaskService.create(task);
            } else {
              TaskService.update(task);
            }
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          }
        }}
      >
        {Constants.SAVE_BUTTON_TITLE}
      </Button>
      <Button
        style={{
          maxWidth: "150px",
          maxHeight: "50px",
          margin: "15px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "20%",
        }}
        variant="outlined"
        color="primary"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        {Constants.HOME_PAGE_TITLE}
      </Button>
    </div>
  );
}
