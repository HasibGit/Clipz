import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(
    private _modalService: ModalService,
    public _authService: AuthService
  ) {}

  ngOnInit(): void {}

  openModal(event: Event) {
    event.preventDefault();
    this._modalService.toggleModalVisibility('auth');
  }
}
