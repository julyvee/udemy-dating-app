import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserForRegister } from 'src/models/userForRegister';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: UserForRegister = new UserForRegister();

  @Output()
  cancelRegister = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log('Registration successful');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
