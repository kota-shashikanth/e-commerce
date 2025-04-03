import {Component} from '@angular/core';
import {ThemeSwitcherComponent} from '../../atoms/theme-switcher/theme-switcher.component';
import {HeaderMenuComponent} from '../../atoms/header-menu/header-menu.component';

@Component({
  selector: 'app-header',
  imports: [
    ThemeSwitcherComponent,
    HeaderMenuComponent
  ],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

}
