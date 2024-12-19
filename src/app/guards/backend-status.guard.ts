import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConnectionService } from '../services/connection.service';
import { map } from 'rxjs';

export const backendStatusGuard: CanActivateFn = () => {
  const connectionService = inject(ConnectionService);
  const router = inject(Router);

  return connectionService.checkBackendConnection().pipe(
    map(isConnected => {
      if (!isConnected) {
        if (router.url != '/') {
          router.navigate(['/']);
        }
        return false;
      }
      return true;
    })
  );
};
