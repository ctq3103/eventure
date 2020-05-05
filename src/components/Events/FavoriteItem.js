import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import FavIcon from './FavoriteIcon.FavPage';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
	},
	image: {
		width: 128,
		height: 128,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
}));

const FavoriteItem = ({ favItem }) => {
	const classes = useStyles();
	const { title, date, creator, imageUrl } = favItem;
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container spacing={4}>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img className={classes.img} alt="complex" src={imageUrl} />
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid
							item
							xs
							container
							direction="column"
							spacing={2}
							alignItems="center"
							justify="center"
						>
							<Grid item xs>
								<Typography gutterBottom variant="subtitle2">
									{date}
								</Typography>
								<Typography variant="body2" gutterBottom>
									{title}
								</Typography>
								<Typography variant="body2" color="textSecondary">
									by {creator}
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body2" style={{ cursor: 'pointer' }}>
									View details
								</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<FavIcon favItem={favItem} />
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default FavoriteItem;
