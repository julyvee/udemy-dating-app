import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserForRegister } from 'src/models/userForRegister';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: UserForRegister = new UserForRegister();

  @Output()
  cancelRegister = new EventEmitter();

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('Registration successful');
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
