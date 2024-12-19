import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ConnectionService } from '../services/connection.service';

export const backendStatusGuard: CanActivateFn = () => {
  const connectionService = inject(ConnectionService);

  if (connectionService.checkBackendConnection()) {
    return false;
  }

  return true
};
