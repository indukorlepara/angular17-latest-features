

// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserManagementComponent } from '../app/user-management/user-management.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserManagementComponent,CommonModule,HttpClientModule], // Import the standalone component here
  template: '<app-user-management></app-user-management>',
})
export class AppComponent {}

