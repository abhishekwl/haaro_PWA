import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TabContent from '../TabContent';

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
    const subjectNames = this.props.subject_names;
    const subjects = this.props.subjects;

    return (
      <div>
        <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={this.handleChange} className={classes.tabs}>
            {
              subjectNames.map(subject =>{
                return <Tab key={subject} label={subject} />
              })
            }
        </Tabs>
        {
          subjectNames.map((subjectName,index) => {
            const notamsUnderSubject = subjects[subjectName];
            return value==index && <TabContent search_phrase={this.props.search_phrase} notams={notamsUnderSubject} />;
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(SimpleTabs);