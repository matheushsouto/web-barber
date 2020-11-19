import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuardPermission } from './authpermission.guard';

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [AuthGuardPermission]
        });
    });

    it('should ...', inject([AuthGuardPermission], (guard: AuthGuardPermission) => {
        expect(guard).toBeTruthy();
    }));
});
