import {Component} from '@angular/core';
import {DAISY_THEMES} from '../../constants/themes.constants';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.component.html'
})
export class ThemeSwitcherComponent {
  protected readonly DAISY_THEMES = DAISY_THEMES;
  protected currentTheme = localStorage.getItem('daisyTheme') || 'forest';

  protected changeTheme(theme: string) {
    this.currentTheme = theme;
    localStorage.setItem('daisyTheme', theme);
  }
}
