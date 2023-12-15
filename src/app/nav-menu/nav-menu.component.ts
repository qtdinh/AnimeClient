import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private destroySubject = new Subject();

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authStatus.pipe(takeUntil(this.destroySubject))
    .subscribe(result => {
      this.isLoggedIn = result;
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
  // isExpanded = false;

  // collapse() {
  //   this.isExpanded = false;
  // }

  // toggle() {
  //   this.isExpanded = !this.isExpanded;
  // }
}
