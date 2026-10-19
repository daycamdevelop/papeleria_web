import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const AuthGuard: CanActivateFn = () => {
    const router = inject(Router);
    let validate = localStorage.getItem('Validate');
    if(validate == "true"){
        return true;
    } else {
        router.navigate(['auth']);
    }
    return false;
};