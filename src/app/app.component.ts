import { Component, HostBinding, OnInit } from '@angular/core';
import { SettingsService } from './core/settings/settings.service';
declare var $: any;

@Component({
  selector: 'ft-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dashboards-fetch';

  @HostBinding('class.layout-fixed') get isFixed() {
    return this.settings.getLayoutSetting('isFixed');
  }
  @HostBinding('class.aside-collapsed') get isCollapsed() {
    return this.settings.getLayoutSetting('isCollapsed');
  }
  @HostBinding('class.layout-boxed') get isBoxed() {
    return this.settings.getLayoutSetting('isBoxed');
  }
  @HostBinding('class.layout-fs') get useFullLayout() {
    return this.settings.getLayoutSetting('useFullLayout');
  }
  @HostBinding('class.hidden-footer') get hiddenFooter() {
    return this.settings.getLayoutSetting('hiddenFooter');
  }
  @HostBinding('class.layout-h') get horizontal() {
    return this.settings.getLayoutSetting('horizontal');
  }
  @HostBinding('class.aside-float') get isFloat() {
    return this.settings.getLayoutSetting('isFloat');
  }
  @HostBinding('class.offsidebar-open') get offsidebarOpen() {
    return this.settings.getLayoutSetting('offsidebarOpen');
  }
  @HostBinding('class.aside-toggled') get asideToggled() {
    return this.settings.getLayoutSetting('asideToggled');
  }
  @HostBinding('class.aside-collapsed-text') get isCollapsedText() {
    return this.settings.getLayoutSetting('isCollapsedText');
  }

  constructor(public settings: SettingsService) {}

  ngOnInit() {
    $(document).on('click', '[href="#"]', (e) => e.preventDefault());
  }
}
