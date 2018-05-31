import {Component, OnInit} from '@angular/core';
import {AuthService, UserService} from '../../security/service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }

    logout() {
        this.authService.logout().subscribe(res => {
            this.router.navigate(['/login']);
        });
    }

    hasSignedIn() {
        return !!this.userService.currentUser;
    }

    userName() {
        const user = this.userService.currentUser;
        return user.firstname + ' ' + user.lastname;
    }

    hasAdminRole() {
        return !!this.userService.currentUser && JSON.stringify(this.userService.currentUser.authorities).search('ROLE_ADMIN') !== -1;
    }

}
