import {Component} from '@angular/core';
import {ThemeSwitcherComponent} from '../../atoms/theme-switcher/theme-switcher.component';
import {HeaderMenuComponent} from '../../atoms/header-menu/header-menu.component';
import {CartComponent} from '../../atoms/cart/cart.component';

@Component({
  selector: 'app-header',
  imports: [
    ThemeSwitcherComponent,
      HeaderMenuComponent,
      CartComponent
  ],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

}
