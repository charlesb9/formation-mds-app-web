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
	status: "pending" | "in-progress" | "completed" | "canceled" | "archived";
	project: Project;
	priority: "low" | "medium" | "high";
}