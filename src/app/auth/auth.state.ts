import { EntityState } from "@ngrx/entity";
import { User } from "./user.model";


export interface AuthState extends EntityState<User> {
    token: string | null;
    error: string | null;
    isAuthenticated: boolean;
}