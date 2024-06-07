import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { HttpRequestService } from '../shared/http-request.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected = new EventEmitter<string>();
  userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private httpReq: HttpRequestService,
    private authService: AuthService
  ) {}
  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.httpReq.fetchData().subscribe();
  }

  onClickSave() {
    this.httpReq.saveData();
  }

  onLogout() {
    this.authService.logout();
  }

  onClickFetch() {
    this.httpReq.fetchData().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
