import { CdtRepositoryService } from './cdtRepository.service';
import { ZzaRepositoryService } from './zzarepository.service';
import { CanActivateChild, CanActivate } from "@angular/router/src/interfaces";
import { Injectable } from "@angular/core";

@Injectable()
export class InitGuard implements CanActivate, CanActivateChild {

constructor(private _zzaRepository: ZzaRepositoryService, private _cdtRepositoryService: CdtRepositoryService) {
}

  canActivate(): Promise<boolean>{
    return this._zzaRepository.initialize() && this._cdtRepositoryService.initialize();

  }
  canActivateChild(): Promise<boolean>{
    return this.canActivate();
  }
}
