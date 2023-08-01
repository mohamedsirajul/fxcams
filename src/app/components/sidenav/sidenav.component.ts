import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatDrawer;
  @ViewChild('reportsDrawer') reportsDrawer!: MatDrawer;



  reportsExpanded = false;
  reportsExpandeds = false;
  showFiller = false;

  selectedMenuItem: string = '';
  isMenuSelected: boolean = false;

  toggleReportsSubmenu() {
    this.reportsExpandeds = true;
  }

  goBackToMainNav() {
    this.reportsExpandeds = false;
    this.sidenav.open();
  }

  toggleMenu() {
    this.sidenav.toggle();
  }

  // Function to handle the click event on the menu items
  // Update the selectedMenuItem and set isMenuSelected to true
  onMenuItemClick(menuItem: string) {
    this.selectedMenuItem = menuItem;
    this.isMenuSelected = true;
  }

  constructor() {}

  ngOnInit(): void {}
}
