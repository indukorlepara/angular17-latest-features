// src/app/user-management.component.ts
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, HttpClientModule],  // Import ReactiveFormsModule to use reactive forms
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent {
  users: User[] = [];
  userForm: FormGroup;
  currentUser: User | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const newUser: User = {
      id: this.currentUser ? this.currentUser.id : 0,
      ...this.userForm.value,
    };

    if (this.currentUser) {
      this.userService.updateUser(newUser).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    } else {
      this.userService.addUser(newUser).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  editUser(user: User) {
    this.currentUser = user;
    this.userForm.setValue({
      name: user.name,
      email: user.email,
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  resetForm() {
    this.userForm.reset();
    this.currentUser = null;
  }
}
