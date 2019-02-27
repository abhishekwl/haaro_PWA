import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TabContent from '../TabContent';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  tabs: {
    backgroundColor: "#8e24aa",
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={this.handleChange} className={classes.tabs}>
            <Tab label="Critical" />
            <Tab label="Take Off" />
            <Tab label="Runway" />
            <Tab label="Weather" />
            <Tab label="General" />
            <Tab label="Passengers" />
            <Tab label="Flights" />
            <Tab label="Landing" />
            <Tab label="Political" />
            <Tab label="A.I" />
            <Tab label="Miscellaneous" />
        </Tabs>
        {value === 0 && <TabContent search_phrase={this.props.search_phrase} />}
        {value === 1 && <TabContent search_phrase={this.props.search_phrase} />}
        {value === 2 && <TabContent search_phrase={this.props.search_phrase} />}
        {value === 3 && <TabContent search_phrase={this.props.search_phrase} />}
      </div>
    );
  }
}

export default withStyles(styles)(SimpleTabs);