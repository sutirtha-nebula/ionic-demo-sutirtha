import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  firstName: any;
  email: any;
  profilePhoto: any;
  username: any;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.apiService.get('auth/me').subscribe(profile => {
      console.log('User Profile:', profile);
      this.firstName = profile['firstName'];
      this.email = profile['email'];
      this.profilePhoto = profile['image'];
      this.username = profile['username'];
    });
  }

  logout(){
    this.authService.logout();
  }

}
