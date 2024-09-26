// import { FormsModule } from '@angular/forms';

// @NgModule({
//   imports: [FormsModule]
// })
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Add this import

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule],// Add RouterModule to imports
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

