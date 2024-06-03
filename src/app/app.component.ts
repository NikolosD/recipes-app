import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, HeaderComponent,   FormsModule]
})
export class AppComponent {


}
