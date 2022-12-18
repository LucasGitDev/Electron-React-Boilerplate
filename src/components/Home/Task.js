import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function Task(props) {

    const { task } = props;
    
    return (
        <Card sx={{ maxWidth: 300, height:160}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tempo: {task.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Id Redmine: {task.id_redmine}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
