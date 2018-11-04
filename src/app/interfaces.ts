export interface Exam {
    name: string,
    unit: string,
    min: number,
    max: number
}

export interface ExamResult {
    result: number,
    date: {
        seconds: number,
        nanoseconds: number
    }
}

export interface ExamDetail {
    min: number,
    max: number,
    unit: string
}
