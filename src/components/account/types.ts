export interface LogForm {
    type: string;
    amount: number;
    createdAt: string; // Assume the timestamp is in string format
    to: string;
    from: string;
    totalAmount: number;
}

export interface AccountInfo {
    credit: number;
    originLogs: LogForm[];
    destLogs: LogForm[];
    allLogs: LogForm[];
}