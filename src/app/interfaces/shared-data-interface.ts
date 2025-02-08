import { backendResponseInterface } from './backend-status-interface';
import { UserInterface } from './user-interface';
export interface sharedDataInterface {
    backendResponse: backendResponseInterface;
    user: {
        isAuthenticated: boolean;
        userData?: UserInterface;
    }
}