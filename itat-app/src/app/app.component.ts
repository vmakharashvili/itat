import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './core/models/users';
import { ApiService } from './core/services/api.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'itat-app';
  user: User | undefined;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.$loggedIn.subscribe(user => {
      this.user = user;
      if (!user && !this.auth.isLoggedIn) {
        this.router.navigate(['login']);
      }
    });
    this.auth.loggedIn().subscribe();
  }

  logOut(): void {
    this.auth.logOut();
  }
}
