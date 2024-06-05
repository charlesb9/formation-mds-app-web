import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Status } from "../../../../common/project.interface";

export interface Project {
    _id?: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    tasks: Task[];
    status: {title: string, color: string}[];
};

export interface StatusForm {
    title: FormControl<string>;
    color:  FormControl<string>;
};

export interface ProjectForm {
    title: FormControl<string>;
    description: FormControl<string>;
    tasks: FormArray<FormGroup<TaskForm>>;
    status: FormArray<FormControl<Status>>;
    startDate: FormControl<Date>;
    endDate: FormControl<Date>;
};

export interface Task {
    title: string;
    description: string;
    status: string;
    start: string;
    end: string;
};

export interface TaskForm {
    title: FormControl<string>;
    description: FormControl<string>;
    status: FormControl<string>;
    start: FormControl<string>;
    end: FormControl<string>; 
};