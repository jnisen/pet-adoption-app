import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';


import { Link } from "react-router-dom";


export default function Pet({ pet }) {



    return (
        <Card sx={{ maxWidth: 250, backgroundColor: "#1E1E1E" }}>
            <CardMedia
                component="img"
                height="150"
                image={pet.picture}
                alt={pet.name}
                style={{ objectPosition:'center -10px' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="white" align="left">
                    {pet.name}
                </Typography>
                <Typography variant="body" color="#BCBCBC" sx={{ display: "flex" }}>
                    {pet.bio}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
                <Chip label={pet.status} variant="outlined" color="secondary" />
                <Link to={`/petdetail/pet/${pet._id}`}><Button size="small" color="secondary">See More</Button></Link>
            </CardActions>
        </Card>

    )
}
