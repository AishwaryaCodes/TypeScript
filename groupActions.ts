// Given - list of activities
// each activity - has user, action '
// TOdo  - Group all actions by User - Group by Key

class Activity {
  user: string;
  action: string;

  constructor(user: string, action: string) {
    this.user = user;
    this.action = action;
  }
}

class ActivityGrouper {
  static groupByUser(activities: Activity[]) : Record<string, string[]> {

    const result: Record<string, string[]> = {}; // key - string, val - actions

    for(const activity of activities) { // each activity
      const user = activity.user;
      const action = activity.action;

      if(!result[user]) {
        result[user] = []; // if user is not seem before - create empty array
      }

      result[user].push(action); // add action
    }

    return result;
  }
}

const activities: Activity[] = [ // array of objects 
  new Activity("A", "login"), 
  new Activity("A", "logout"),
  new Activity("B", "login"), 
  new Activity("B", "purchase"), 
  new Activity("B", "logout"),
  new Activity("A", "update-profile"),
];

const grouped = ActivityGrouper.groupByUser(activities);

console.log(grouped);

// TC - O(n) - single pass through array
// SC - O(n) - storing grpup result