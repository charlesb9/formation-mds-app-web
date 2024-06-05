import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface Project {
    _id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    tasks: Task[];
    status: {name: string, color: string}[];
};

export interface ProjectForm {
    _id: FormControl<string>;
    title: FormControl<string>;
    description: FormControl<string>;
    tasks: FormArray<FormGroup<TaskForm>>;
    status: FormArray<FormControl<{name: string, color: string}>>;
    startDate: FormControl<Date>;
    endDate: FormControl<Date>;
};

export interface StatusForm {
    name: FormControl<string>;
    color:  FormControl<string>;
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