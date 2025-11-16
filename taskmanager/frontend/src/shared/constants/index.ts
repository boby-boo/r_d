export const API_URL = 'http://localhost:3000';

export const STATUS = {
  todo: 'Todo',
  in_progress: 'In progress',
  review: 'Review',
  done: 'Done',
}

export const PRIORITY = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const FILTER_OPTIONS = {
  status: {
    label: "Status",
    mainOption: "All statuses",
    options: {
      todo: "To Do",
      in_progress: "In Progress",
      review: "Review",
      done: "Done",
    },
  },
  priority: {
    label: "Priority",
    mainOption: "All priorities",
    options: {
      low: "Low",
      medium: "Medium",
      high: "High",
    },
  },
};
