export const ERRORS = {
  // Plan Action
  PLAN_TASK: {
    CREATE_TASK: "CREATE_TASK",
    INVALID_TASK_ID: "INVALID_TASK_ID",
    MISSING_TASK_ID: "MISSING_TASK_ID",
  },
} as const;

export class ValidationError extends Error {
  constructor(public field: string, public message: string) {
    super(message);
  }
}

export class GenericError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
