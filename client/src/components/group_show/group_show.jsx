import React from 'react';
import GroupUserIndexContainer from './group_user_index_container';

class GroupShow extends React.Component {
  componentDidMount() {
    const { groupId, fetchGroup } = this.props;
    fetchGroup(groupId).then(console.warn);
  }

  render() {
    const { groups, groupId, users } = this.props;
    let group = groups[groupId];
    return group && JSON.stringify(users) !== JSON.stringify([]) ? (
      <div className="group-show-page">
        <div className="group-header">
          <div className="group-title">
            <h1>{group.name}</h1>
          </div>
        </div>
        <GroupUserIndexContainer users={users}/>
      </div>
    ) : (
        <div className="group-show-page"></div>
    );
  }
}

export default GroupShow;
