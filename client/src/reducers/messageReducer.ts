import { UserMessage } from "../interfaces";
let messageIdCounter = 0;

type Action =
    | { type: "add"; message: UserMessage }
    | { type: "remove"; id: number };

export default function messageReducer(
    state: UserMessage[] | [],
    action: Action
) {
    switch (action.type) {
        case "add":
            action.message.id = messageIdCounter;
            messageIdCounter++;
            return [...state, action.message];
        case "remove":
            return state.filter(
                (message: UserMessage) => message.id !== action.id
            );
        default:
            throw new Error();
    }
}
