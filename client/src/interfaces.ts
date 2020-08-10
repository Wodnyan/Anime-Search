export interface User {
    username: string;
    profilePicture: string;
    provider: string;
    userId: string;
}
export interface UserMessage {
    id: number;
    message: string;
    type?: "error" | "warning";
}
export interface Anime {
    mal_id: number;
    url: string;
    image_url: string;
    title: string;
    type: string;
    episodes: number;
    airing: boolean;
    score: number;
    members: number;
    synopsis: string;
    start_date: string;
    end_date: string;
}
