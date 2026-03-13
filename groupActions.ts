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

    const result: Record<string, string[]> = {};

    for(const activity of activities) {
      const user = activity.user;
      const action = activity.action;

      if(!result[user]) {
        result[user] = [];
      }

      result[user].push(action);
    }

    return result;
  }
}

const activities: Activity[] = [
  new Activity("A", "login"), 
  new Activity("A", "logout"),
  new Activity("B", "login"), 
  new Activity("B", "purchase"), 
  new Activity("B", "logout"),
  new Activity("A", "update-profile"),
];

const grouped = ActivityGrouper.groupByUser(activities);

console.log(grouped);