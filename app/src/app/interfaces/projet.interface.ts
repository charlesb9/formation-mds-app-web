import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface Project {
    id: string;
    title: string;
    tasks: Task[];
    status: string[];
};

export interface ProjectForm {
    id: FormControl<string>;
    title: FormControl<string>;
    tasks: FormArray<FormGroup<TaskForm>>;
    status: FormArray<FormControl<string>>;
};

export interface Task {
    title: string;
    description: string;
    status: string;
    start: string;
    end: string;
}


export interface TaskForm {
    title: FormControl<string>;
    description: FormControl<string>;
    status: FormControl<string>;
    start: FormControl<string>;
    end: FormControl<string>; 
}