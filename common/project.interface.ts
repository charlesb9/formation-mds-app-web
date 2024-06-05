import { Task } from "./task.interface";
import { User } from "./user.interface";

export interface Project {
	_id: string;
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	tasks: Task[];
	users: User[];
	managers: User[];
	status: Status[];
}


export interface Status {
	title: string;
	color: string;
}