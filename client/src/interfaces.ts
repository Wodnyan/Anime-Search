export interface User {
    username: string;
    profilePicture: string;
    provider: string;
}
export interface UserMessage {
    id: number;
    message: string;
    type?: "error" | "warning";
}
