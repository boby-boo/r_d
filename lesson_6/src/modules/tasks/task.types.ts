export const TaskStatus = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
} as const;

export const TaskPriority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
} as const;

export const BugSeverity = {
    LOW: 'low',
    MEDIUM: 'medium',
    CRITICAL: 'critical',
} as const;


export type TaskId = string | number;
export type Status = typeof TaskStatus[keyof typeof TaskStatus];
export type Priority = typeof TaskPriority[keyof typeof TaskPriority];
export type Severity = typeof BugSeverity[keyof typeof BugSeverity];

export type CreateTaskDto = Omit<Task, 'id' | 'createdAt' | 'getTaskInfo'>;

export class Task {
    id: TaskId;
    title: string;
    description: string;
    createdAt: Date;
    status?: Status;
    priority?: Priority;
    deadline: Date;

    constructor(data: Omit<Task, 'id' | 'createdAt' | 'getTaskInfo'>) {
        if (!data.title || data.title.trim() === '') {
            throw new Error('Title cannot be empty.');
        }
        if (!data.description) {
            throw new Error('Description cannot be empty.');
        }
        if (new Date(data.deadline) < new Date()) {
            console.warn('Warning: Task deadline is in the past.');
        }

        this.id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        this.title = data.title;
        this.description = data.description;
        this.createdAt = new Date();
        this.deadline = new Date(data.deadline);
        this.status = data.status ?? TaskStatus.TODO;
        this.priority = data.priority ?? TaskPriority.LOW;
    }

    public getTaskInfo(): string {
        return `
    ID: ${this.id}
    Title: ${this.title}
    Description: ${this.description}
    Status: ${this.status}
    Priority: ${this.priority}
    Created At: ${this.createdAt.toLocaleString()}
    Deadline: ${this.deadline.toLocaleString()}`;
    }
}

export class Subtask extends Task {
    parentTaskId: TaskId;

    constructor(data: Omit<Subtask, 'id' | 'createdAt' | 'getTaskInfo'>) {
        super(data);
        if (!data.parentTaskId) {
            throw new Error('Subtask must have a parentTaskId.');
        }
        this.parentTaskId = data.parentTaskId;
    }

    public override getTaskInfo(): string {
        const baseInfo = super.getTaskInfo();
        return `${baseInfo}
    Type: Subtask
    Parent Task ID: ${this.parentTaskId}`;
    }
}

export class Bug extends Task {
    severity: Severity;

    constructor(data: Omit<Bug, 'id' | 'createdAt' | 'getTaskInfo'>) {
        super(data);
        this.severity = data.severity ?? BugSeverity.LOW;
    }

    public override getTaskInfo(): string {
        const baseInfo = super.getTaskInfo();
        return `${baseInfo}
    Type: Bug
    Severity: ${this.severity}`;
    }
}

export class Story extends Task {
    storyPoints: number;

    constructor(data: Omit<Story, 'id' | 'createdAt' | 'getTaskInfo'>) {
        super(data);
        if (data.storyPoints < 0) {
            throw new Error('Story points cannot be negative.');
        }
        this.storyPoints = data.storyPoints ?? 1;
    }

    public override getTaskInfo(): string {
        const baseInfo = super.getTaskInfo();
        return `${baseInfo}
    Type: Story
    Story Points: ${this.storyPoints}`;
    }
}

export class Epic extends Task {
    subtasks: Subtask[] = [];

    constructor(data: Omit<Epic, 'id' | 'createdAt' | 'getTaskInfo' | 'subtasks'>) {
        super(data);
    }

    public override getTaskInfo(): string {
        const baseInfo = super.getTaskInfo();
        return `${baseInfo}
    Type: Epic
    Subtasks Count: ${this.subtasks.length}`;
    }
}

export type AnyTask = Task | Subtask | Bug | Story | Epic;