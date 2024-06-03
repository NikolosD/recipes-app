import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router,public authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn)
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
