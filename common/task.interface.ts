import { Project } from "./project.interface";
import { User } from "./user.interface";

export interface Task {
	id: string;
	title: string;
	users: User[];
	description: string;
	createdAt: Date;
	updatedAt: Date;
	endTask: Date;
	status: Status;
	project: Project;
	priority: "low" | "medium" | "high";
}

export interface Status {
	title: string;
	color: string;
}