
export interface CourseFilter {
    search?: string;
    tags?: string[];
    format?: string[];
    minDuration?: number;
    maxDuration?: number;
    level?: string[];
}