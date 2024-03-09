import { Component } from '@angular/core';
import { HeaderComponent } from '../core/components/block/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../core/components/block/sidebar/sidebar.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {

}
