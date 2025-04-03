import {Component} from '@angular/core';
import {MENU_ITEMS} from '../../constants/menu.constants';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './header-menu.component.html',
  styles: ``
})
export class HeaderMenuComponent {

  protected readonly MENU_ITEMS = MENU_ITEMS;
}
