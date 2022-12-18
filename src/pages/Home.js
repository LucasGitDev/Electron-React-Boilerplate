import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { TaskService } from "../services/TaskService";
import Task from "../components/Home/Task";
import { Button, Grid, Link } from "@mui/material";
import exportFromJSON from "export-from-json";

import * as Constants from "../utils/Constants";


export default function MaterialUIPickers() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let formated = new Date(selectedDate).toLocaleDateString("pt-BR");
    getTasks(formated);
  }, [selectedDate]);

  const handleAccept = (newValue) => {
    // let formated = new Date(newValue).toLocaleDateString("pt-BR");
    setSelectedDate(newValue);
  };

  const getTasks = async (date) => {
    const response = await TaskService.getByDate(date);
    setTasks(response);
  };

  const exportTasks = () => {
    const data = tasks;
    const fileName = "tasks";
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        <h1 style={{ padding: "20px" }}>{Constants.APP_NAME}</h1>
        <h2>{Constants.TASKS}</h2>
      </div>

      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack
            spacing={3}
            style={{
              width: "150px",
              margin: "0 auto",
            }}
          >
            <MobileDatePicker
              label="Selecione uma data"
              inputFormat="dd/MM/yyyy"
              value={selectedDate}
              onChange={(newValue) => {}}
              onAccept={handleAccept}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          <Button
            style={{
              maxWidth: "150px",
              maxHeight: "50px",
              margin: "15px",
            }}
            variant="outlined"
            color="warning"
            onClick={() => {
              window.location.href = "/task/-1";
            }}
          >
            {Constants.NEW_TASK_BUTTON_TITLE}
          </Button>

          <Button
            style={{
              maxWidth: "150px",
              maxHeight: "50px",
              margin: "15px",
            }}
            variant="outlined"
            color="warning"
            onClick={exportTasks}
          >
            {Constants.EXPORT_BUTTON_TITLE}
          </Button>
        </div>

        {tasks.length > 0 ? (
          <Grid
            container
            spacing={3}
            style={{
              margin: "40 0",
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: "50px",
              paddingRight: "50px",
            }}
          >
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
                <Link href={`/task/${task.id}`} underline="none">
                  <Task task={task} />
                </Link>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>{Constants.NO_TASKS_MESSAGE}</p>
        )}
      </div>
    </div>
  );
}
