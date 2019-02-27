import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import CardListItem from '../CardListItem';
import { Button, Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from "react-google-maps"
import Grid from '@material-ui/core/Grid';

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 12.8687849, lng: 77.5447453 }}
  >
    <Marker
      position={{ lat: 12.8687849, lng: 77.5447453 }}
    />
  </GoogleMap>
));

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {
  state = {
    chipData: [
      { key: 0, label: 'Filter' },
      { key: 1, label: 'Filter' },
      { key: 2, label: 'Filter' }
    ],
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleDelete = data => () => {
    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    const { classes } = this.props;
    const notamsUnderSubject = this.props.notams;

    return (
        <div style={{backgroundColor: "white", paddingLeft: 16, paddingRight: 16, paddingBottom: 128, paddingTop: 8, maxHeight: window.innerHeight, overflow: 'auto'}}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{'aria-describedby': 'message-id',}}
                message={<span id="message-id">Bakery poit vera</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                        No, Kushal will come
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                        >
                    <CloseIcon />
                    </IconButton>,
                ]}
            />

            <Grid container>
                <Grid item md={7}>
                {
                  notamsUnderSubject.map(notam => {
                    let subject = notam["Subject"];
                    let decoded = notam["decoded"];
                    let qStatus = notam["q_status"];
                    let status = notam["status_category"];
                    let encoded = notam["message"];
                    let startDate = notam["startdate"];
                    let endDate = notam["enddate"];
                    return (
                    <CardListItem
                        search_phrase={this.props.search_phrase}
                        onFavouritePress={this.handleClick}
                        subject={subject}
                        decoded={decoded}
                        q_status={qStatus}
                        status={status}
                        encoded={encoded}
                        startdate={startDate}
                        enddate={endDate}
                      />
                    );
                  })
                }
                </Grid>
                <Grid item md={4} style={ {justifyContent: 'center', alignItems: 'center'} }>
                  <MapWithAMarker
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCbKE0pHJ1cv2l7wPQT0uwKQ26lZNJb6f4&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: 100 }} />}
                    containerElement={<div style={{ height: 500 }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                  />
                </Grid>
            </Grid>

        </div>
    );
  }
}

export default withStyles(styles)(ChipsArray);